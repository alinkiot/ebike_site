import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "../products/DeleteButton";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
        <Link href="/admin/blog/new" className="bg-yellow-400 text-black px-5 py-2.5 text-sm font-semibold tracking-widest uppercase hover:bg-yellow-300 transition-colors">
          + New Post
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold tracking-widest uppercase text-gray-400">Title</th>
              <th className="text-left px-6 py-3 text-xs font-semibold tracking-widest uppercase text-gray-400">Status</th>
              <th className="text-left px-6 py-3 text-xs font-semibold tracking-widest uppercase text-gray-400">Date</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {posts.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{p.title}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${p.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {p.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500 text-xs">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/blog/${p.id}`} className="text-xs font-semibold text-gray-600 hover:text-black transition-colors">Edit</Link>
                    <DeleteButton id={p.id} type="blog" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && <p className="text-center text-gray-400 py-12">No posts yet.</p>}
      </div>
    </div>
  );
}
