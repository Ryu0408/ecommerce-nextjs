import type { Product } from "@/types/product.types";
import type { PagedResponse } from "@/types/common.types";
const BASE = process.env.NEXT_PUBLIC_API_GATEWAY!;

export async function getProducts(params?: {
    category?: string;
    keyword?: string;
    page?: number;
    size?: number;
}): Promise<PagedResponse<Product>> {

    const query = new URLSearchParams();
    if (params?.category) query.append("category", params.category);
    if (params?.keyword) query.append("keyword", params.keyword);
    query.append("page", String(params?.page ?? 0));
    query.append("size", String(params?.size ?? 12));

    const url = `${BASE}/api/products?${query.toString()}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
        throw new Error(`GET /api/products failed: ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as PagedResponse<Product>;
}
