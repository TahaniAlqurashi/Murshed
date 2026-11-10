export type Language = "ar" | "en";

export type StudentSession = {
  studentId: number;
  studentName: string;
};

export type StudentProfile = {
  student_id: number;
  name_ar?: string;
  program_id?: number;
  level?: number;
  completed_credits?: number;
  cumulative_gpa_4?: number;
  cumulative_gpa_100?: number;
  current_semester?: string;
};

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  createdAt: Date;
  agent?: string;
  intent?: string;
};

export type Conversation = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  lastMessage?: string;
};

export type ChatApiResponse = {
  status: string;
  data?: {
    agent?: string;
    intent?: string;
    reply_text?: string;
  };
};