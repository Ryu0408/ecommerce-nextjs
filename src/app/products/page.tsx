import { getProducts } from "@/lib/api/products.api";

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-bold">상품 목록</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((p) => (
                    <div key={p.id} className="border rounded-2xl p-4">
                        <div className="aspect-square w-full rounded-xl bg-muted grid place-items-center mb-3">
                            이미지
                        </div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-sm text-muted-foreground">
                            {p.price.toLocaleString()}원
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
