import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return {};
  return {
    title: `${post.title} | Deruiz Blog`,
    description: post.excerpt || undefined,
    openGraph: {
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post || !post.published) notFound();

  const related = await prisma.blogPost.findMany({
    where: { published: true, NOT: { id: post.id } },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  return (
    <div className="pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {post.publishedAt && (
          <p className="text-xs text-gray-400 mb-4">
            {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        )}
        <h1 className="text-4xl font-bold text-black mb-6">{post.title}</h1>
        {post.excerpt && <p className="text-lg text-gray-500 mb-10 leading-relaxed">{post.excerpt}</p>}
        {post.coverImage && (
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg mb-10 bg-gray-100">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="100vw"
              loading="eager"
              className="object-cover"
            />
          </div>
        )}
        <div
          className="prose prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      {related.length > 0 && (
        <div className="border-t border-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-2">Continue reading</p>
            <h2 className="text-2xl font-bold text-black mb-10">More from the journal</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {related.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="group">
                  <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 mb-4">
                    {p.coverImage ? (
                      <Image
                        src={p.coverImage}
                        alt={p.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="eager"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-200" />
                    )}
                  </div>
                  {p.publishedAt && (
                    <p className="text-xs text-gray-400 mb-1">
                      {new Date(p.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  )}
                  <h3 className="text-sm font-semibold text-black group-hover:opacity-70 transition-opacity leading-snug">{p.title}</h3>
                  <span className="mt-2 inline-block text-xs font-semibold tracking-widest uppercase border-b border-black pb-0.5 group-hover:opacity-60 transition-opacity">
                    Read more
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
