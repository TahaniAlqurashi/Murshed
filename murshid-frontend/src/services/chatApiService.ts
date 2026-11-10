import { apiEndpoints } from "../config/api";
import type { Language } from "../types";

export async function sendChatMessage(params: {
  studentId: number;
  language: Language;
  message: string;
}) {
  const response = await fetch(apiEndpoints.chat, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      student_id: params.studentId,
      language: params.language,
      message: params.message,
    }),
  });

  if (!response.ok) {
    throw new Error("Backend request failed");
  }

  const result = await response.json();

  const replyText =
    result?.data?.reply_text ||
    result?.reply_text ||
    "لم أتمكن من جلب الرد الآن.";

  return {
    replyText,
    agent: result?.data?.agent || "",
    intent: result?.data?.intent || "",
    raw: result,
  };
}