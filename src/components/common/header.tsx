import Link from "next/link";

export function Header() {
  return (
    <div className="flex items-center justify-between py-4">
      <Link href="/" className="text-xl font-semibold">
        클라우드 네이티브 이커머스
      </Link>
      <nav className="space-x-4 text-sm">
        <Link href="/products" className="hover:underline">상품</Link>
        <Link href="/cart" className="hover:underline">장바구니</Link>
        <Link href="/checkout" className="hover:underline">결제</Link>
      </nav>
    </div>
  );
}
