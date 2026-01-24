import Link from "next/link";
import { api } from "~/trpc/server";
import { AdminBlogList } from "../../_components/admin/AdminBlogList";

export default async function AdminBlogsPage() {
  const blogs = await api.blog.getAll();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Blogs</h1>
        <Link href="/admin/blogs/new" className="btn-primary">
          Create New Blog
        </Link>
      </div>

      <AdminBlogList blogs={blogs} />
    </div>
  );
}

