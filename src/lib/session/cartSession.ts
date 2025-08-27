export function getCartSessionId(): string {
  if (typeof window === "undefined") return "";
  const KEY = "cart_session";
  let sid = localStorage.getItem(KEY);
  if (!sid) {
    sid = globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
    localStorage.setItem(KEY, sid);
  }
  return sid;
}

export function cartHeaders() {
  const sid = getCartSessionId();
  return { "X-Session-Id": sid, "Content-Type": "application/json" };
}
