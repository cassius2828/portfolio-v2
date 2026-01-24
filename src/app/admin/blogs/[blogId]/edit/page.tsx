import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import { BlogEditor } from "../../../../_components/admin/BlogEditor";

interface EditBlogPageProps {
  params: Promise<{ blogId: string }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { blogId } = await params;
  const blog = await api.blog.getById({ id: blogId });

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Edit Blog</h1>
      <BlogEditor blog={blog} />
    </div>
  );
}

