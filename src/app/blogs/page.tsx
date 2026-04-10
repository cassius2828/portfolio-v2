import { type Metadata } from "next";
import { api } from "~/trpc/server";
import { BlogList } from "../_components/blogs/BlogList";
import { serializeBlog } from "~/lib/serialize";
import { PageShell } from "../_components/layout/PageShell";
import { SectionHeading } from "../_components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read my latest thoughts on web development, software engineering, and technology. Tips, tutorials, and insights from a full stack developer.",
  openGraph: {
    title: "Blog | Cassius Reynolds",
    description:
      "Read my latest thoughts on web development, software engineering, and technology.",
  },
};

export default async function BlogsPage() {
  const blogs = await api.blog.getAll();

  return (
    <PageShell
      bgSlot={
        <div className="absolute top-1/4 right-0 h-[400px] w-[400px] rounded-full bg-[var(--color-accent)] opacity-[0.03] blur-[150px]" />
      }
    >
      <div className="mx-auto max-w-7xl px-6 py-12">
        <SectionHeading
          as="h1"
          title="My Blog"
          subtitle="Thoughts, tutorials, and insights on web development, software engineering, and technology."
        />

        <BlogList blogs={blogs.map(serializeBlog)} />
      </div>
    </PageShell>
  );
}
