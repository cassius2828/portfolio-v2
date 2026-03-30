"use client";

import Link from "next/link";
import type { SerializedBlog } from "~/lib/serialize";
import { SafeImage } from "../shared/SafeImage";

interface BlogCardProps {
  blog: SerializedBlog;
  variant?: "grid" | "list";
}

const fallbackImg = "/images/api-programming.png";

export function BlogCard({ blog, variant = "grid" }: BlogCardProps) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(blog.createdAt));

  const plainText = blog.content.replace(/<[^>]*>/g, "");
  const preview = plainText.slice(0, 150) + (plainText.length > 150 ? "..." : "");

  if (variant === "list") {
    return (
      <Link href={`/blogs/${blog.id}`}>
        <article className="card group flex gap-6 p-6 transition-all hover:border-[var(--color-accent)]">
          {blog.img && (
            <div className="relative hidden h-32 w-48 flex-shrink-0 overflow-hidden rounded-lg md:block">
              <SafeImage
                src={blog.img}
                alt={blog.title}
                fallbackSrc={fallbackImg}
                fill
                sizes="192px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          )}
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <p className="mb-2 text-sm text-[var(--color-text-muted)]">
                {formattedDate}
              </p>
              <h2 className="mb-2 text-xl font-bold transition-colors group-hover:text-[var(--color-accent)]">
                {blog.title}
              </h2>
              <p className="text-[var(--color-text-secondary)]">{preview}</p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              {blog.owner?.image && (
                <SafeImage
                  src={blog.owner.image}
                  alt={blog.owner.name ?? "Author"}
                  fallbackSrc="/images/headshot.webp"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span className="text-sm text-[var(--color-text-muted)]">
                {blog.owner?.name ?? "Cassius Reynolds"}
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blogs/${blog.id}`}>
      <article className="card group h-full overflow-hidden transition-all hover:border-[var(--color-accent)]">
        {blog.img && (
          <div className="relative aspect-video overflow-hidden">
            <SafeImage
              src={blog.img}
              alt={blog.title}
              fallbackSrc={fallbackImg}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        )}
        <div className="p-6">
          <p className="mb-2 text-sm text-[var(--color-text-muted)]">
            {formattedDate}
          </p>
          <h2 className="mb-3 text-xl font-bold transition-colors group-hover:text-[var(--color-accent)]">
            {blog.title}
          </h2>
          <p className="line-clamp-3 text-sm text-[var(--color-text-secondary)]">
            {preview}
          </p>
          <div className="mt-4 flex items-center gap-2">
            {blog.owner?.image && (
              <SafeImage
                src={blog.owner.image}
                alt={blog.owner.name ?? "Author"}
                fallbackSrc="/images/headshot.webp"
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
            <span className="text-sm text-[var(--color-text-muted)]">
              {blog.owner?.name ?? "Cassius Reynolds"}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
