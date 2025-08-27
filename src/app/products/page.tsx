"use client";
import { Header } from "@/components/common/header";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api/products.api";
import type { Product } from "@/types/product.types";
import type { PagedResponse } from "@/types/common.types";
import { addToCart } from "@/lib/api/cart.api";

export default function ProductsPage() {
  const [data, setData] = useState<PagedResponse<Product>>();
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [pendingId, setPendingId] = useState<string | null>(null);

  useEffect(() => {
    getProducts({ category, keyword, page, size: 12 }).then(setData);
  }, [category, keyword, page]);

  const handleAdd = async (productId: string) => {
    try {
      setPendingId(productId);
      await addToCart(productId, 1);
      // TODO: toast로 교체 가능
      alert("장바구니에 담았습니다.");
    } catch {
      alert("담기 실패");
    } finally {
      setPendingId(null);
    }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Header />
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
            <option value="Kitchen Appliances">Kitchen Appliances</option>
            <option value="Wearables">Wearables</option>
            <option value="Headphones & Earbuds">Headphones & Earbuds</option>
            <option value="Laptops">Laptops</option>
            <option value="Cameras">Cameras</option>
            <option value="Networking & Routers">Networking & Routers</option>
            <option value="TVs">TVs</option>
            <option value="Home Appliances">Home Appliances</option>
            <option value="Smartphones">Smartphones</option>
            <option value="Gaming Consoles & Handhelds">Gaming Consoles & Handhelds</option>
          </select>
          <input
            type="text"
            placeholder="상품명 검색"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setPage(0);
            }}
            className="border rounded-lg px-3 py-2 flex-1"
          />
        </div>

        {/* 상품 목록 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.content.map((p) => (
            <div key={p.id} className="border rounded-2xl p-4 relative">
              <div className="aspect-square w-full rounded-xl bg-muted grid place-items-center mb-3">
                이미지
              </div>

              <div className="font-medium pr-12">{p.name}</div>
              <div className="text-sm text-muted-foreground">{p.price.toLocaleString()}원</div>
              <div className="text-xs text-gray-500 mt-1">카테고리: {p.categoryName ?? "없음"}</div>

              {/* 카트 아이콘 버튼 */}
              <button
                onClick={() => handleAdd(String(p.id))}
                disabled={pendingId === String(p.id)}
                className="absolute top-4 right-4 h-9 w-9 rounded-full border grid place-items-center disabled:opacity-50"
                aria-label="장바구니 담기"
                title="장바구니 담기"
              >
                {/* 이모지 아이콘. 라이브러리 없이 동작 */}
                {pendingId === String(p.id) ? "…" : "🛒"}
              </button>
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
    </>
  );
}
