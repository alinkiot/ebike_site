import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/products/ProductCard";
import CategoryTabs from "@/components/products/CategoryTabs";
import SortSelector from "@/components/products/SortSelector";
import RevealSection from "@/components/home/RevealSection";
import { Suspense } from "react";

function getOrderBy(sort?: string) {
  if (sort === "price-asc") return { price: "asc" as const };
  if (sort === "price-desc") return { price: "desc" as const };
  return { createdAt: "desc" as const };
}

export default async function AccessoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const { category, sort } = await searchParams;

  const [categories, products] = await Promise.all([
    prisma.category.findMany({
      where: { type: "accessory" },
      orderBy: { order: "asc" },
    }),
    prisma.product.findMany({
      where: {
        published: true,
        category: {
          type: "accessory",
          ...(category ? { slug: category } : {}),
        },
      },
      include: { images: { orderBy: { order: "asc" }, take: 1 }, category: true },
      orderBy: getOrderBy(sort),
    }),
  ]);

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <RevealSection delay={0}>
          <div className="mb-10">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-2">Gear up</p>
            <h1 className="text-4xl font-bold text-black">Accessories</h1>
          </div>
        </RevealSection>

        <RevealSection delay={100}>
          <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
            <CategoryTabs
              categories={categories}
              activeSlug={category}
              basePath="/accessories"
              pathRouting={false}
            />
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">{products.length} items</span>
              <Suspense>
                <SortSelector currentSort={sort} />
              </Suspense>
            </div>
          </div>
        </RevealSection>

        {products.length === 0 ? (
          <RevealSection delay={200}>
            <p className="text-gray-400 text-center py-20">No accessories found.</p>
          </RevealSection>
        ) : (
          <RevealSection delay={200}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  name={p.name}
                  tagline={p.tagline}
                  price={p.price}
                  salePrice={p.salePrice}
                  image={p.images[0]?.url}
                  href={`/accessories/${p.category.slug}/${p.slug}`}
                  featured={p.featured}
                />
              ))}
            </div>
          </RevealSection>
        )}
      </div>
    </div>
  );
}
