import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import { BlogContent } from "../../_components/blogs/BlogContent";
import { PageShell } from "../../_components/layout/PageShell";
import { db } from "~/server/db";
import { personalInfo, socialLinks } from "~/lib/content";
import { serializeBlog } from "~/lib/serialize";
import { sanitizeContent } from "~/lib/sanitize";
import { SITE_URL } from "~/lib/constants";
import { stripHtml } from "~/lib/format";

interface BlogPageProps {
  params: Promise<{ blogId: string }>;
}

export async function generateStaticParams() {
  if (process.env.SKIP_ENV_VALIDATION) return [];

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

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  const plainTextContent = stripHtml(blog.content).slice(0, 160).trim();

  return {
    title: blog.title,
    description: plainTextContent,
    alternates: {
      canonical: `${SITE_URL}/blogs/${blogId}`,
    },
    openGraph: {
      title: `${blog.title} | ${personalInfo.name}`,
      description: plainTextContent,
      type: "article",
      url: `${SITE_URL}/blogs/${blogId}`,
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
  const plainTextContent = stripHtml(blog.content).slice(0, 200);

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
      url: SITE_URL,
      sameAs: [socialLinks.github.url, socialLinks.linkedin.url],
    },
    publisher: {
      "@type": "Person",
      name: personalInfo.name,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blogs/${blog.id}`,
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
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replaceAll("</", "<\\/"),
        }}
      />

      <BlogContent
        blog={serializeBlog(blog)}
        sanitizedHtml={sanitizeContent(blog.content)}
        adjacent={adjacent}
      />
    </PageShell>
  );
}
