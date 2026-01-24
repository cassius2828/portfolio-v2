import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import { BlogContent } from "../../_components/blogs/BlogContent";

interface BlogPageProps {
  params: Promise<{ blogId: string }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { blogId } = await params;
  const blog = await api.blog.getById({ id: blogId });

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  // Strip HTML tags for description
  const plainTextContent = blog.content
    .replace(/<[^>]*>/g, "")
    .slice(0, 160)
    .trim();

  return {
    title: blog.title,
    description: plainTextContent,
    openGraph: {
      title: `${blog.title} | Cassius Reynolds`,
      description: plainTextContent,
      type: "article",
      publishedTime: blog.createdAt.toISOString(),
      modifiedTime: blog.updatedAt.toISOString(),
      authors: [blog.owner?.name ?? "Cassius Reynolds"],
      images: blog.img ? [{ url: blog.img }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: plainTextContent,
      images: blog.img ? [blog.img] : undefined,
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { blogId } = await params;
  const [blog, adjacent] = await Promise.all([
    api.blog.getById({ id: blogId }),
    api.blog.getAdjacent({ id: blogId }),
  ]);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-28">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[var(--color-bg-primary)]" />
      </div>

      <BlogContent blog={blog} adjacent={adjacent} />
    </div>
  );
}

