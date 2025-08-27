"use client";
import { useState } from "react";
import { addToCart } from "@/lib/api/cart.api";

type Props = {
  id: string;            // UUID
  name: string;
  price: number;
  description?: string;
};

export default function ProductCard({ id, name, price, description }: Props) {
  const [pending, setPending] = useState(false);

  const onAdd = async () => {
    try {
      setPending(true);
      await addToCart(id, 1);
      alert("장바구니에 담았습니다.");
    } catch {
      alert("담기 실패");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="border rounded-xl p-4">
      <div className="font-medium">{name}</div>
      {description && <div className="text-sm text-gray-500">{description}</div>}
      <div className="mt-2">{price.toLocaleString()}원</div>
      <button
        className="mt-3 px-3 py-2 rounded-lg bg-black text-white disabled:opacity-50"
        onClick={onAdd}
        disabled={pending}
      >
        {pending ? "추가 중" : "장바구니 담기"}
      </button>
    </div>
  );
}
