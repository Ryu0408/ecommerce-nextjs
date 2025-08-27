// src/app/cart/page.tsx
"use client";
import { Header } from "@/components/common/header";
import { useEffect, useMemo, useState } from "react";
import { getCart, setQuantity, removeItem, clearCart } from "@/lib/api/cart.api";
import Link from "next/link";

type CartItem = { productId: string; quantity: number };
type CartView = { items: CartItem[]; totalQuantity: number };

const short = (id: string) => (id.length > 8 ? id.slice(0, 8) + "…" : id);

export default function CartPage() {
  const [data, setData] = useState<CartView>();
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try { setData(await getCart()); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const onInc = async (id: string, q: number) => {
    setBusy(id);
    try { await setQuantity(id, q + 1); await load(); } finally { setBusy(null); }
  };
  const onDec = async (id: string, q: number) => {
    setBusy(id);
    try { await setQuantity(id, Math.max(q - 1, 0)); await load(); } finally { setBusy(null); }
  };
  const onRemove = async (id: string) => {
    setBusy(id);
    try { await removeItem(id); await load(); } finally { setBusy(null); }
  };
  const onClear = async () => {
    setBusy("*");
    try { await clearCart(); await load(); } finally { setBusy(null); }
  };

  const items = data?.items ?? [];
  const totalQty = data?.totalQuantity ?? 0;
  const subtotal = useMemo(() => 0, []); // 가격 연동 전이므로 0

  if (loading) return <div className="p-6">Loading...</div>;

  if (!items.length)
    return (
      <section className="p-6 space-y-4">
        <h2 className="text-2xl font-bold">장바구니</h2>
        <p>담긴 상품이 없습니다.</p>
        <Link className="underline" href="/products">상품 보러가기</Link>
      </section>
    );

  return (
    <>
      <Header />
      <section className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">장바구니</h2>
          <button onClick={onClear} disabled={busy !== null} className="px-3 py-2 border rounded disabled:opacity-50">
            전체 비우기
          </button>
        </div>

        <ul className="space-y-3">
          {items.map(it => (
            <li key={it.productId} className="border rounded-xl p-4 flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="font-medium">{short(it.productId)}</div>
                <div className="text-xs text-gray-500">상품 ID</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-2 py-1 border rounded"
                  onClick={() => onDec(it.productId, it.quantity)}
                  disabled={busy === it.productId}
                >-</button>
                <span className="w-8 text-center">{it.quantity}</span>
                <button
                  className="px-2 py-1 border rounded"
                  onClick={() => onInc(it.productId, it.quantity)}
                  disabled={busy === it.productId}
                >+</button>
              </div>
              <button
                className="px-3 py-1 border rounded"
                onClick={() => onRemove(it.productId)}
                disabled={busy === it.productId}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between border-t pt-4">
          <div className="text-sm text-gray-500">총 수량: {totalQty}</div>
          <div className="text-lg font-semibold">소계: {subtotal.toLocaleString()}원</div>
        </div>

        <div className="flex gap-3">
          <Link href="/products" className="px-4 py-2 border rounded">계속 쇼핑</Link>
          <button className="px-4 py-2 rounded bg-black text-white">결제하기</button>
        </div>
      </section>
    </>
  );
}
