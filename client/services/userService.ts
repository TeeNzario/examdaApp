import { apiAuth } from './api';
import { getAccessToken } from './token';

export interface UserProfile {
  id: string;
  student_code: string;
  first_name: string;
  last_name: string;
  email?: string;
}

export function fetchCurrentUser(): Promise<UserProfile> {
  return apiAuth<UserProfile>('/students/me');
}

export async function updateUser(
  updates: Partial<UserProfile>,
): Promise<UserProfile> {
  return apiAuth<UserProfile>('/students/me', {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
}

