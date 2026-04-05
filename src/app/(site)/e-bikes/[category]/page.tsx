import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/products/ProductCard";
import CategoryTabs from "@/components/products/CategoryTabs";
import SortSelector from "@/components/products/SortSelector";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = await prisma.category.findUnique({ where: { slug: category } });
  if (!cat) return {};
  return {
    title: `${cat.name} E-Bikes | Deruiz`,
    description: cat.description || `Browse our ${cat.name} electric bikes collection.`,
  };
}

function getOrderBy(sort?: string) {
  if (sort === "price-asc") return { price: "asc" as const };
  if (sort === "price-desc") return { price: "desc" as const };
  return { createdAt: "desc" as const };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string; sort?: string }>;
}) {
  const { category } = await params;
  const { page, sort } = await searchParams;
  const currentPage = Number(page) || 1;
  const pageSize = 12;

  const [categories, categoryData, products, total] = await Promise.all([
    prisma.category.findMany({ where: { type: "bike" }, orderBy: { order: "asc" } }),
    prisma.category.findUnique({ where: { slug: category } }),
    prisma.product.findMany({
      where: { published: true, category: { slug: category, type: "bike" } },
      include: { images: { orderBy: { order: "asc" }, take: 1 }, category: true },
      orderBy: getOrderBy(sort),
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    }),
    prisma.product.count({ where: { published: true, category: { slug: category, type: "bike" } } }),
  ]);

  const totalPages = Math.ceil(total / pageSize);
  const isSelect = category === "select";

  return (
    <div className="pt-20">
      {/* Select hero */}
      {isSelect && (
        <div className="relative bg-black text-white overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/products/sycxly-1500-917-mica-pro-ML-Bronze-Matt.webp"
              alt="Select Series"
              fill
              sizes="100vw"
              className="object-cover opacity-30"
              priority
              loading="eager"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-yellow-400 mb-4">
              Deruiz Select
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold max-w-2xl leading-tight mb-6">
              SELECT is far more than just Deruiz&apos;s top-of-the-line.
            </h1>
            <p className="text-gray-300 max-w-xl leading-relaxed mb-8">
              Every component is conceived, developed, and selected from the ground up. The frame geometry, the motor integration, the battery placement — each detail is the result of hundreds of hours of real-world testing. This is not an upgrade. It&apos;s a reinvention.
            </p>
            <Link
              href="#products"
              className="inline-block bg-yellow-400 text-black text-xs font-semibold tracking-widest uppercase px-8 py-3 hover:bg-yellow-300 transition-colors"
            >
              Explore Select
            </Link>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="products">
        {!isSelect && (
          <div className="mb-10">
            {categoryData ? (
              <>
                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-2">
                  {categoryData.name}
                </p>
                <h1 className="text-4xl font-bold text-black">{categoryData.name}</h1>
                {categoryData.description && (
                  <p className="mt-4 text-gray-600 max-w-2xl">{categoryData.description}</p>
                )}
              </>
            ) : (
              <>
                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-2">
                  Category
                </p>
                <h1 className="text-4xl font-bold text-black">{category}</h1>
              </>
            )}
          </div>
        )}

        {isSelect && (() => {
          const galleryImages = [
            "/images/products/dh-dolomit-1.webp",
            "/images/products/dh-mica-pro-1.webp",
            "/images/products/mica-pro-2026-1200x800.webp",
            "/images/products/quartz-2026-1200x800.webp",
            "/images/products/quartz-suv-9-1200x800.webp",
            "/images/products/santa-maria-e-gravel-1200x800.webp",
            "/images/products/santa-maria-e-road-1200x800.webp",
            "/images/products/sycxly-1500-917-dolomit-ML-Black-Mirage.webp",
            "/images/products/sycxly-1500-917-mica-pro-ML-Bronze-Matt.webp",
            "/images/products/marble-suv-2-3.png",
          ];
          return (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-black mb-8">DRIVING TOGETHER WITH DERUIZ</h2>
              <div className="overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="flex animate-marquee gap-4 w-max">
                  {[...galleryImages, ...galleryImages].map((src, i) => (
                    <div key={i} className="relative flex-none w-72 h-48 overflow-hidden bg-gray-100">
                      <Image src={src} alt="" fill sizes="(max-width: 640px) 288px, (max-width: 1024px) 288px, 288px" className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {!isSelect && (
          <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
            <CategoryTabs categories={categories} activeSlug={category} />
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">{total} bikes</span>
              <Suspense>
                <SortSelector currentSort={sort} />
              </Suspense>
            </div>
          </div>
        )}

        {products.length === 0 && !isSelect ? (
          <div className="text-center py-20">
            <p className="text-gray-400 mb-6">No products found in this category.</p>
            <a
              href="/e-bikes"
              className="inline-block bg-yellow-400 text-black px-6 py-2 text-sm font-semibold tracking-wider uppercase hover:bg-yellow-300 transition-colors"
            >
              View All E-Bikes
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                name={p.name}
                tagline={p.tagline}
                price={p.price}
                salePrice={p.salePrice}
                image={p.images[0]?.url}
                href={`/e-bikes/${p.category.slug}/${p.slug}`}
                featured={p.featured}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <a
                key={p}
                href={`/e-bikes/${category}?page=${p}${sort ? `&sort=${sort}` : ""}`}
                className={`w-10 h-10 flex items-center justify-center text-sm border transition-colors ${
                  p === currentPage
                    ? "bg-yellow-400 border-yellow-400 text-black font-semibold"
                    : "border-gray-300 text-gray-600 hover:border-black"
                }`}
              >
                {p}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Select — editorial strip */}
      {isSelect && (
        <div className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-3">
                  The Select Philosophy
                </p>
                <h2 className="text-3xl font-bold text-black mb-6">
                  Driving Together with Deruiz
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The Select series represents our highest expression of e-bike engineering. Each model is built around the ZentriDrive mid-motor delivering 110 Nm of torque — smooth, powerful, and precisely tuned for real-world riding.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  From the continuously variable Enviolo transmission on the Mica Pro to the 120 mm suspension fork on the Dolomit, every component is chosen to elevate your ride — not just on paper, but on every road, trail, and commute.
                </p>
                <Link
                  href="/e-bikes/select/mica-pro"
                  className="inline-block bg-black text-white text-xs font-semibold tracking-widest uppercase px-8 py-3 hover:bg-gray-800 transition-colors"
                >
                  Discover Mica Pro
                </Link>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                <Image
                  src="/images/products/sycxly-1500-917-dolomit-ML-Black-Mirage.webp"
                  alt="Dolomit Select"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
