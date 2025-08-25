import { Header } from "@/components/common/header";

export default function HomePage() {
  return (
    <>
      <Header />
      <section className="py-14 space-y-3">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          환영합니다 👋
        </h1>
        <p className="text-muted-foreground">
          대기업 포트폴리오용 이커머스 MSA — 프론트부터 천천히 쌓아가요.
        </p>
        <div className="mt-4">
          <a href="/products" className="px-4 py-2 rounded-lg border hover:bg-accent">
            상품 보러가기
          </a>
        </div>
      </section>
    </>
  );
}
