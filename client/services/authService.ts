import { apiAuth } from './api';
import { setAccessToken } from './token';

interface LoginResponse {
  access_token: string;
}

export async function login(
  student_code: string,
  password: string,
): Promise<void> {
  const res = await apiAuth<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ student_code, password }),
  });

  await setAccessToken(res.access_token);
}
