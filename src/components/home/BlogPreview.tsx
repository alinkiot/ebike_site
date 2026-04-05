"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage?: string | null;
  publishedAt?: Date | null;
}

function BlogCard({ post }: { post: BlogPost }) {
  const [imageError, setImageError] = useState(false);
  const hasValidImage = post.coverImage && !imageError;

  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
        {hasValidImage ? (
          <Image
            src={post.coverImage!}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
            loading="eager"
          />
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
        <h3 className="text-base font-semibold text-black group-hover:opacity-70 transition-opacity leading-snug">
          {post.title}
        </h3>
        {post.excerpt && <p className="mt-2 text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>}
        <span className="mt-3 inline-block text-xs font-semibold tracking-widest uppercase border-b border-black pb-0.5 group-hover:opacity-60 transition-opacity">
          Read more
        </span>
      </div>
    </Link>
  );
}

export default function BlogPreview({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-2">Latest news</p>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-black">From the journal</h2>
        </div>
        <Link href="/blog" className="hidden sm:inline-block text-xs font-semibold tracking-widest uppercase border-b border-black pb-0.5 hover:opacity-60 transition-opacity">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
