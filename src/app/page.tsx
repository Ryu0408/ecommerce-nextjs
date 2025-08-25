import { Header } from "@/components/common/header";

export default function HomePage() {
  return (
    <>
      <Header />
      <section className="py-14 space-y-3">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          환영합니다 👋
        </h1>
        <div className="mt-4">
          <a href="/products" className="px-4 py-2 rounded-lg border hover:bg-accent">
            상품 보러가기
          </a>
        </div>
      </section>
    </>
  );
}
