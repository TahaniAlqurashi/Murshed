import json
import time
import pandas as pd
import requests
import matplotlib.pyplot as plt
from pathlib import Path

BASE_URL = "http://127.0.0.1:5000"
TIMEOUT = 120

ROOT = Path(__file__).resolve().parents[1]
EVAL_DIR = ROOT / "tests" / "evaluation"
OUTPUT_DIR = ROOT / "tests" / "evaluation_results"
KB_DATASET = ROOT / "knowledge_base" / "data" / "knowledge_base_dataset_ready.xlsx"

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def percent(correct, total):
    return round((correct / total) * 100, 2) if total else 0


def get_by_path(data, path):
    value = data
    for key in path:
        value = value[key]
    return value


def compare_values(actual, case):
    if case.get("expected_exists"):
        return actual is not None

    if case.get("expected_type") == "list_non_empty":
        return isinstance(actual, list) and len(actual) > 0

    expected = case.get("expected_value")
    tolerance = case.get("tolerance")

    if isinstance(expected, float):
        tolerance = tolerance if tolerance is not None else 0.01
        return abs(float(actual) - expected) <= tolerance

    return actual == expected


def load_json(filename):
    with open(EVAL_DIR / filename, "r", encoding="utf-8") as f:
        return json.load(f)


def evaluate_study_plan_agent():
    cases = load_json("study_plan_gold.json")
    details = []
    correct = 0
    total = len(cases)

    print("\n=== Study Plan Agent Evaluation ===")

    for case in cases:
        try:
            start = time.time()
            url = BASE_URL + case["path"]

            if case["method"] == "GET":
                response = requests.get(url, timeout=TIMEOUT)
            else:
                response = requests.post(url, json=case.get("body", {}), timeout=TIMEOUT)

            elapsed = round(time.time() - start, 2)
            data = response.json()
            actual = get_by_path(data, case["expected_path"])
            passed = compare_values(actual, case)

            if passed:
                correct += 1

            item = {
                "name": case["name"],
                "passed": passed,
                "expected": case.get("expected_value", case.get("expected_type", "exists")),
                "actual": actual,
                "time_seconds": elapsed
            }
            details.append(item)

            print(f"{case['name']}: {'PASS' if passed else 'FAIL'} | actual={actual} | time={elapsed}s")

        except Exception as e:
            details.append({
                "name": case["name"],
                "passed": False,
                "error": str(e),
                "time_seconds": None
            })
            print(f"{case['name']}: FAIL | error={e}")

    score = percent(correct, total)

    return {
        "agent": "Study Plan Agent",
        "metric": "Accuracy",
        "score": score,
        "correct": correct,
        "total": total,
        "details": details
    }


def evaluate_knowledge_base_agent(top_k=3):
    df = pd.read_excel(KB_DATASET)
    df = df.dropna(subset=["id", "السؤال", "الإجابة"])

    details = []
    correct = 0
    total = len(df)

    print("\n=== Knowledge Base Agent Evaluation ===")
    print(f"Dataset rows used: {total}")
    print(f"Metric: Top-{top_k} Retrieval Accuracy")

    for _, row in df.iterrows():
        question = str(row["السؤال"]).strip()
        expected_id = str(row["id"]).strip()

        try:
            start = time.time()

            response = requests.post(
                f"{BASE_URL}/api/knowledge-base/retrieve",
                json={"query": question, "top_k": top_k},
                timeout=TIMEOUT
            )

            elapsed = round(time.time() - start, 2)
            data = response.json()
            results = data.get("data", {}).get("results", [])

            retrieved_ids = [
                str(item.get("metadata", {}).get("id", "")).strip()
                for item in results
            ]

            passed = expected_id in retrieved_ids

            if passed:
                correct += 1

            details.append({
                "question_id": expected_id,
                "question": question,
                "passed": passed,
                "retrieved_ids": retrieved_ids,
                "time_seconds": elapsed
            })

            print(f"QID={expected_id}: {'PASS' if passed else 'FAIL'} | retrieved={retrieved_ids} | time={elapsed}s")

        except Exception as e:
            details.append({
                "question_id": expected_id,
                "question": question,
                "passed": False,
                "error": str(e),
                "time_seconds": None
            })
            print(f"QID={expected_id}: FAIL | error={e}")

    score = percent(correct, total)

    return {
        "agent": "Knowledge Base Agent",
        "metric": f"Top-{top_k} Retrieval Accuracy",
        "score": score,
        "correct": correct,
        "total": total,
        "details": details
    }


def evaluate_chatbot_layer():
    cases = load_json("chatbot_gold.json")
    details = []
    correct = 0
    total = len(cases)

    print("\n=== Chatbot Layer Evaluation ===")

    for case in cases:
        try:
            start = time.time()

            response = requests.post(
                f"{BASE_URL}/api/chat/message",
                json={
                    "student_id": 1001,
                    "language": "ar",
                    "message": case["message"]
                },
                timeout=TIMEOUT
            )

            elapsed = round(time.time() - start, 2)
            data = response.json().get("data", {})

            actual_agent = data.get("agent")
            actual_intent = data.get("intent")

            passed = (
                actual_agent == case["expected_agent"]
                and actual_intent == case["expected_intent"]
            )

            if passed:
                correct += 1

            details.append({
                "message": case["message"],
                "passed": passed,
                "expected_agent": case["expected_agent"],
                "expected_intent": case["expected_intent"],
                "actual_agent": actual_agent,
                "actual_intent": actual_intent,
                "time_seconds": elapsed
            })

            print(
                f"{case['message']}: {'PASS' if passed else 'FAIL'} | "
                f"actual=({actual_agent}, {actual_intent}) | time={elapsed}s"
            )

        except Exception as e:
            details.append({
                "message": case["message"],
                "passed": False,
                "error": str(e),
                "time_seconds": None
            })
            print(f"{case['message']}: FAIL | error={e}")

    score = percent(correct, total)

    return {
        "agent": "Chatbot Layer",
        "metric": "Intent Routing Accuracy",
        "score": score,
        "correct": correct,
        "total": total,
        "details": details
    }


def save_results(results):
    output_file = OUTPUT_DIR / "evaluation_results.json"

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    print(f"\nSaved evaluation results to: {output_file}")


def save_single_agent_plot(agent_result):
    agent_name = agent_result["agent"]
    metric = agent_result["metric"]
    score = agent_result["score"]
    correct = agent_result["correct"]
    total = agent_result["total"]
    failed = total - correct

    labels = ["Passed", "Failed"]
    values = [correct, failed]

    plt.figure(figsize=(7, 5))
    bars = plt.bar(labels, values)

    plt.title(f"{agent_name}\n{metric}: {score}%")
    plt.ylabel("Number of Test Cases")
    plt.ylim(0, max(total, 1) + 2)

    for bar, value in zip(bars, values):
        plt.text(
            bar.get_x() + bar.get_width() / 2,
            bar.get_height() + 0.2,
            str(value),
            ha="center",
            va="bottom",
            fontsize=12
        )

    plt.text(
        0.5,
        max(total, 1) + 1,
        f"Correct: {correct} / Total: {total}",
        ha="center",
        va="center",
        fontsize=11
    )

    plt.tight_layout()

    safe_name = agent_name.lower().replace(" ", "_")
    output_file = OUTPUT_DIR / f"{safe_name}_evaluation.png"
    plt.savefig(output_file, dpi=200)
    plt.close()

    print(f"Saved {agent_name} plot to: {output_file}")



def save_all_agent_plots(results):
    for item in results["summary"]:
        save_single_agent_plot(item)

def main():
    study = evaluate_study_plan_agent()
    kb = evaluate_knowledge_base_agent(top_k=3)
    chatbot = evaluate_chatbot_layer()

    results = {
        "summary": [
            {
                "agent": study["agent"],
                "metric": study["metric"],
                "score": study["score"],
                "correct": study["correct"],
                "total": study["total"]
            },
            {
                "agent": kb["agent"],
                "metric": kb["metric"],
                "score": kb["score"],
                "correct": kb["correct"],
                "total": kb["total"]
            },
            {
                "agent": chatbot["agent"],
                "metric": chatbot["metric"],
                "score": chatbot["score"],
                "correct": chatbot["correct"],
                "total": chatbot["total"]
            }
        ],
        "details": {
            "study_plan_agent": study["details"],
            "knowledge_base_agent": kb["details"],
            "chatbot_layer": chatbot["details"]
        }
    }

    save_results(results)
    save_all_agent_plots(results)

    print("\n=== Final Evaluation Summary ===")
    for item in results["summary"]:
        print(f"{item['agent']} - {item['metric']}: {item['score']}% ({item['correct']}/{item['total']})")


if __name__ == "__main__":
    main()