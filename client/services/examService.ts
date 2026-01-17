import { api } from './api';
import { Exam } from '../types/exam';

const USER_ID = 1; // from auth backend later

export const examService = {
  getAll(): Promise<Exam[]> {
    return api<Exam[]>(`/exams?userId=${USER_ID}`);
  },

  create(data: {
    name: string;
    description?: string;
    examDateTime: string;
    remindBeforeMinutes: number;
  }): Promise<Exam> {
    return api<Exam>(`/exams?userId=${USER_ID}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update(
    id: number,
    data: {
      name?: string;
      description?: string;
      examDateTime?: string;
    }
  ): Promise<Exam> {
    return api<Exam>(`/exams/${id}?userId=${USER_ID}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  finish(id: number): Promise<Exam> {
    return api<Exam>(`/exams/${id}/finish?userId=${USER_ID}`, {
      method: 'PATCH',
    });
  },
};
