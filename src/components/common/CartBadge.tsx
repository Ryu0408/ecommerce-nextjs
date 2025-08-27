"use client";
import { useEffect, useState } from "react";
import { getCart } from "@/lib/api/cart.api";

export default function CartBadge() {
  const [count, setCount] = useState(0);
  useEffect(() => { getCart().then(c => setCount(c.totalQuantity)).catch(() => {}); }, []);
  return <span className="ml-2 text-sm">Cart {count}</span>;
}
