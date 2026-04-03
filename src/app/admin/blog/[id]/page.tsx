import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import BlogForm from "../BlogForm";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Post</h1>
      <BlogForm post={post} />
    </div>
  );
}
