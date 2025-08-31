const BASE = process.env.NEXT_PUBLIC_API_GATEWAY!;

type ApiError = { code?: string; message?: string };

async function parse(res: Response) {
  const text = await res.text();
  try { return text ? JSON.parse(text) : {}; } catch { return { message: text }; }
}

export async function login(email: string, password: string) {
  const res = await fetch(`${BASE}/api/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    cache: 'no-store',
    body: JSON.stringify({ email, password }),
  });
  const data = await parse(res);
  if (!res.ok) throw Object.assign(new Error((data as ApiError).message || '로그인 실패'), data);
  return data;
}

export async function me() {
  const res = await fetch(`${BASE}/api/user/me`, {
    credentials: 'include',
    cache: 'no-store',
  });
  if (res.status === 401) return null;
  const data = await parse(res);
  if (!res.ok) return null;
  return data as { id: string; name: string; email: string };
}

export async function logout() {
  await fetch(`${BASE}/api/user/logout`, {
    method: 'POST',
    credentials: 'include',
    cache: 'no-store',
  });
}
