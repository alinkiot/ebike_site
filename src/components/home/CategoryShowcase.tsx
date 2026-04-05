import Link from "next/link";
import Image from "next/image";

const categories = [
  { name: "Urban", slug: "urban", description: "Built for the city commute", image: "/images/products/sycxly-1500-917-mica-pro-ML-Bronze-Matt.webp" },
  { name: "City", slug: "city", description: "Elegant everyday riding", image: "/images/products/1500-917-turmali-s-Cream-White.webp" },
  { name: "Mountain", slug: "mountain", description: "Conquer any terrain", image: "/images/products/sycxly-1500-917-dolomit-ML-Black-Mirage.webp" },
  { name: "Folding", slug: "folding", description: "Compact and portable", image: "/images/products/1500-917-lapis.webp" },
];

export default function CategoryShowcase() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-2">Browse by type</p>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-black">Find your ride</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/e-bikes/${cat.slug}`} className="group relative overflow-hidden aspect-[3/4] bg-gray-200">
              {cat.image && (
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <h3 className="text-lg font-bold">{cat.name}</h3>
                <p className="text-xs text-gray-300 mt-1">{cat.description}</p>
                <span className="mt-3 inline-block text-xs font-semibold tracking-widest uppercase border-b border-white pb-0.5">
                  Shop now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
