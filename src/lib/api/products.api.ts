// src/lib/api/products.api.ts
import type { Product } from "@/types/product.types";

export async function getProducts(): Promise<Product[]> {
    const base = process.env.NEXT_PUBLIC_API_GATEWAY || "";
    const res = await fetch(`${base}/api/products`, { cache: "no-store" });
    if (!res.ok) {
        throw new Error(`GET /api/products failed: ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as Product[];
}