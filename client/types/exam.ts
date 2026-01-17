export interface ExamReminder {
  id: number;
  remindBeforeMinutes: number;
  isSent: boolean;
}

export interface Exam {
  id: number;
  name: string;
  description?: string;
  examDateTime: string;
  isDone: boolean;
  reminders: ExamReminder[];
}
