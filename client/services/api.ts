import { getAccessToken, removeAccessToken } from './token';

const BASE_URL = 'http://10.200.16.170:3000';  //change this later! to .env
const AUTH_URL = 'http://10.200.16.170:3002';

export async function api<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!res.ok) {
    try {
      const errorData = await res.json();
      const message = errorData.message || errorData.error || 'Unknown error';
      throw new Error(message);
    } catch (e) {
      const error = await res.text();
      throw new Error(error || `HTTP ${res.status}`);
    }
  }

  return res.json();
}
export async function apiAuth<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const token = await getAccessToken();

  const res = await fetch(`${AUTH_URL}${url}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  // Auto logout on 401
  if (res.status === 401) {
    await removeAccessToken();
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'API error');
  }

  return res.json();
}
