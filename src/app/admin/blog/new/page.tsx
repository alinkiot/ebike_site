import BlogForm from "../BlogForm";

export default function NewBlogPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">New Blog Post</h1>
      <BlogForm />
    </div>
  );
}
