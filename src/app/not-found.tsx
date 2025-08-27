import Link from "next/link";

export default function NotFound() {
  return (
    <section className="h-[60vh] grid place-items-center text-center p-6">
      <div>
        <h1 className="text-3xl font-bold">페이지를 찾을 수 없습니다</h1>
        <p className="text-gray-500 mt-2">URL을 확인하세요.</p>
        <div className="mt-4 flex gap-3 justify-center">
          <Link href="/" className="px-4 py-2 border rounded">홈으로</Link>
          <Link href="/products" className="px-4 py-2 border rounded">상품 목록</Link>
        </div>
      </div>
    </section>
  );
}
