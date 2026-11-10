export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

export const apiEndpoints = {
  chat: `${API_BASE_URL}/api/chat/message`,
};