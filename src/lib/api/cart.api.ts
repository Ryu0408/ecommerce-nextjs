import { cartHeaders } from "@/lib/session/cartSession";
const BASE = process.env.NEXT_PUBLIC_API_GATEWAY!;

export async function addToCart(productId: string, quantity = 1) {
  const res = await fetch(`${BASE}/api/cart/items`, {
    method: "POST",
    headers: cartHeaders(),
    body: JSON.stringify({ productId, quantity }),
  });
  if (!res.ok) throw new Error(`addToCart ${res.status}`);
}

export async function getCart() {
  const res = await fetch(`${BASE}/api/cart`, { headers: cartHeaders(), cache: "no-store" });
  if (!res.ok) throw new Error(`getCart ${res.status}`);
  return res.json() as Promise<{ items: { productId: string; quantity: number }[]; totalQuantity: number }>;
}

export async function setQuantity(productId: string, quantity: number) {
  const res = await fetch(`${BASE}/api/cart/items/${productId}`, {
    method: "PUT",
    headers: cartHeaders(),
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) throw new Error(`setQuantity ${res.status}`);
}

export async function removeItem(productId: string) {
  const res = await fetch(`${BASE}/api/cart/items/${productId}`, {
    method: "DELETE",
    headers: cartHeaders(),
  });
  if (!res.ok) throw new Error(`removeItem ${res.status}`);
}
