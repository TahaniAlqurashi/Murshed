import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import type { StudentProfile } from "../types";

export async function getStudentById(studentId: string): Promise<StudentProfile | null> {
  const cleanId = studentId.trim();

  if (!cleanId) {
    return null;
  }

  const studentRef = doc(db, "students", cleanId);
  const snapshot = await getDoc(studentRef);

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  return {
    student_id: Number(data.student_id ?? cleanId),
    name_ar: data.name_ar ?? "",
    program_id: data.program_id,
    level: data.level,
    completed_credits: data.completed_credits,
    cumulative_gpa_4: data.cumulative_gpa_4,
    cumulative_gpa_100: data.cumulative_gpa_100,
    current_semester: data.current_semester,
  };
}