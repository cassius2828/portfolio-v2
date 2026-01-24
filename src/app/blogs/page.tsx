import { type Metadata } from "next";
import { api } from "~/trpc/server";
import { BlogList } from "../_components/blogs/BlogList";

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
    <div className="min-h-screen pt-28">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[var(--color-bg-primary)]" />
        <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-[var(--color-accent)] opacity-[0.03] blur-[150px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">My Blog</h1>
          <div className="mx-auto h-1 w-24 rounded-full bg-[var(--gradient-primary)]" />
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-text-secondary)]">
            Thoughts, tutorials, and insights on web development, software
            engineering, and technology.
          </p>
        </div>

        <BlogList blogs={blogs} />
      </div>
    </div>
  );
}

