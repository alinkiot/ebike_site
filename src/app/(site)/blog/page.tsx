import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-2">Journal</p>
          <h1 className="text-4xl font-bold text-black">Latest News</h1>
        </div>
        {posts.length === 0 ? (
          <p className="text-gray-400 text-center py-20">No posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                  {post.coverImage ? (
                    <Image src={post.coverImage} alt={post.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 bg-gray-200" />
                  )}
                </div>
                <div className="mt-4">
                  {post.publishedAt && (
                    <p className="text-xs text-gray-400 mb-2">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  )}
                  <h3 className="text-base font-semibold text-black group-hover:opacity-70 transition-opacity leading-snug">{post.title}</h3>
                  {post.excerpt && <p className="mt-2 text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>}
                  <span className="mt-3 inline-block text-xs font-semibold tracking-widest uppercase border-b border-black pb-0.5 group-hover:opacity-60 transition-opacity">
                    Read more
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
