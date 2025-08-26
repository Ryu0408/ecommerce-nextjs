"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api/products.api";
import type { Product } from "@/types/product.types";
import type { PagedResponse } from "@/types/common.types";

export default function ProductsPage() {
    const [data, setData] = useState<PagedResponse<Product>>();
    const [category, setCategory] = useState("");
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(0);

    useEffect(() => {
        getProducts({ category, keyword, page, size: 12 }).then(setData);
    }, [category, keyword, page]);

    if (!data) return <div>Loading...</div>;

    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-bold">상품 목록</h2>

            {/* 검색조건 */}
            <div className="flex items-center gap-3">
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border rounded-lg px-3 py-2"
                >
                    <option value="">전체</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Home Appliances">Home Appliances</option>
                    <option value="Gaming">Gaming</option>
                </select>
                <input
                    type="text"
                    placeholder="상품명 검색"
                    value={keyword}
                    onChange={(e) => { setKeyword(e.target.value); setPage(0); }}
                    className="border rounded-lg px-3 py-2 flex-1"
                />
            </div>

            {/* 상품 목록 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {data.content.map((p) => (
                    <div key={p.id} className="border rounded-2xl p-4">
                        <div className="aspect-square w-full rounded-xl bg-muted grid place-items-center mb-3">
                            이미지
                        </div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-sm text-muted-foreground">{p.price.toLocaleString()}원</div>
                        <div className="text-xs text-gray-500 mt-1">카테고리: {p.categoryName ?? "없음"}</div>
                    </div>
                ))}
            </div>

            {/* 페이지네이션 */}
            <div className="flex justify-center items-center gap-2 mt-4">
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 0))}
                    disabled={page === 0}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    이전
                </button>
                <span>
                    {page + 1} / {data.totalPages}
                </span>
                <button
                    onClick={() => setPage((p) => Math.min(p + 1, data.totalPages - 1))}
                    disabled={page + 1 >= data.totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    다음
                </button>
            </div>
        </section>
    );
}
