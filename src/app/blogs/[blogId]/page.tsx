import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import { BlogContent } from "../../_components/blogs/BlogContent";
import { db } from "~/server/db";
import { personalInfo, socialLinks } from "~/lib/content";

interface BlogPageProps {
  params: Promise<{ blogId: string }>;
}

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  const blogs = await db.blog.findMany({
    select: { id: true },
  });

  return blogs.map((blog) => ({
    blogId: blog.id,
  }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { blogId } = await params;
  const blog = await api.blog.getById({ id: blogId });
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://cassiusreynolds.dev";

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
    alternates: {
      canonical: `${baseUrl}/blogs/${blogId}`,
    },
    openGraph: {
      title: `${blog.title} | ${personalInfo.name}`,
      description: plainTextContent,
      type: "article",
      url: `${baseUrl}/blogs/${blogId}`,
      publishedTime: blog.createdAt.toISOString(),
      modifiedTime: blog.updatedAt.toISOString(),
      authors: [blog.owner?.name ?? personalInfo.name],
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

// Article JSON-LD structured data
function generateArticleJsonLd(blog: {
  id: string;
  title: string;
  content: string;
  img: string | null;
  createdAt: Date;
  updatedAt: Date;
  owner: { name: string | null } | null;
}) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://cassiusreynolds.dev";
  const plainTextContent = blog.content.replace(/<[^>]*>/g, "").slice(0, 200);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: plainTextContent,
    image: blog.img ?? undefined,
    datePublished: blog.createdAt.toISOString(),
    dateModified: blog.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: blog.owner?.name ?? personalInfo.name,
      url: baseUrl,
      sameAs: [socialLinks.github.url, socialLinks.linkedin.url],
    },
    publisher: {
      "@type": "Person",
      name: personalInfo.name,
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blogs/${blog.id}`,
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

  const articleJsonLd = generateArticleJsonLd(blog);

  return (
    <div className="min-h-screen pt-28">
      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[var(--color-bg-primary)]" />
      </div>

      <BlogContent blog={blog} adjacent={adjacent} />
    </div>
  );
}
