import type { StudentSession } from "../types";

const SESSION_KEY = "murshid_student_session";

export function saveSession(session: StudentSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession(): StudentSession | null {
  const raw = localStorage.getItem(SESSION_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as StudentSession;
  } catch {
    clearSession();
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function isLoggedIn() {
  return getSession() !== null;
}