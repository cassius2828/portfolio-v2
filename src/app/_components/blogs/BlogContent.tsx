"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { SerializedBlog } from "~/lib/types";
import { SafeImage } from "../shared/SafeImage";
import { CopyLinkButton } from "../shared/CopyLinkButton";
import { FALLBACK_IMG } from "~/lib/constants";
import { formatDate } from "~/lib/format";

interface BlogContentProps {
  blog: SerializedBlog;
  sanitizedHtml: string;
  adjacent: {
    prev: { id: string; title: string } | null;
    next: { id: string; title: string } | null;
  };
}

export function BlogContent({
  blog,
  sanitizedHtml,
  adjacent,
}: BlogContentProps) {
  const formattedDate = formatDate(blog.createdAt);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-4xl px-6 pb-24"
    >
      {/* Header */}
      <header className="mb-12 text-center">
        <p className="mb-4 text-[var(--color-text-muted)]">{formattedDate}</p>
        <h1 className="mb-6 text-4xl font-bold md:text-5xl">{blog.title}</h1>

        {/* Author */}
        <div className="flex items-center justify-center gap-3">
          {blog.owner?.image && (
            <SafeImage
              src={blog.owner.image}
              alt={blog.owner.name ?? "Author"}
              fallbackSrc="/images/headshot.webp"
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <span className="text-[var(--color-text-secondary)]">
            {blog.owner?.name ?? "Cassius Reynolds"}
          </span>
        </div>
      </header>

      {/* Featured Image */}
      {blog.img && (
        <div className="relative mb-12 aspect-video overflow-hidden rounded-2xl">
          <SafeImage
            src={blog.img}
            alt={blog.title}
            fallbackSrc={FALLBACK_IMG}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div
        className="prose-custom mb-12"
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />

      {/* Share Section */}
      <div className="mb-12 flex justify-center">
        <CopyLinkButton text={shareUrl} />
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between border-t border-[var(--color-border)] pt-8">
        {adjacent.prev ? (
          <Link
            href={`/blogs/${adjacent.prev.id}`}
            className="group flex max-w-[45%] flex-col text-left"
          >
            <span className="mb-1 text-sm text-[var(--color-text-muted)]">
              ← Previous
            </span>
            <span className="font-medium text-[var(--color-text-secondary)] transition-colors group-hover:text-[var(--color-accent)]">
              {adjacent.prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        <Link
          href="/blogs"
          className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          All Posts
        </Link>

        {adjacent.next ? (
          <Link
            href={`/blogs/${adjacent.next.id}`}
            className="group flex max-w-[45%] flex-col text-right"
          >
            <span className="mb-1 text-sm text-[var(--color-text-muted)]">
              Next →
            </span>
            <span className="font-medium text-[var(--color-text-secondary)] transition-colors group-hover:text-[var(--color-accent)]">
              {adjacent.next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </motion.article>
  );
}
