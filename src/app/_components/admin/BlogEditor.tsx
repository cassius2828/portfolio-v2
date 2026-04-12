"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import type { SerializedBlog } from "~/lib/types";
import { INPUT_CLASS, LABEL_CLASS } from "~/lib/form-styles";

interface BlogEditorProps {
  blog?: SerializedBlog;
}

export function BlogEditor({ blog }: BlogEditorProps) {
  const router = useRouter();
  const isEditing = !!blog;

  const [formData, setFormData] = useState({
    title: blog?.title ?? "",
    content: blog?.content ?? "",
    img: blog?.img ?? "",
  });
  const [error, setError] = useState("");

  const createMutation = api.blog.create.useMutation({
    onSuccess: (data) => {
      router.push(`/blogs/${data.id}`);
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const updateMutation = api.blog.update.useMutation({
    onSuccess: (data) => {
      router.push(`/blogs/${data.id}`);
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Title and content are required");
      return;
    }

    if (isEditing) {
      updateMutation.mutate({
        id: blog.id,
        ...formData,
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit} className="card space-y-6 p-8">
      {error && (
        <div className="rounded-lg bg-red-500/10 p-4 text-red-400">{error}</div>
      )}

      <div>
        <label htmlFor="title" className={LABEL_CLASS}>
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className={INPUT_CLASS}
          placeholder="Enter blog title..."
        />
      </div>

      <div>
        <label htmlFor="img" className={LABEL_CLASS}>
          Cover Image URL
        </label>
        <input
          type="url"
          id="img"
          name="img"
          value={formData.img}
          onChange={handleChange}
          className={INPUT_CLASS}
          placeholder="https://example.com/image.jpg"
        />
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Leave empty to skip cover image
        </p>
      </div>

      <div>
        <label htmlFor="content" className={LABEL_CLASS}>
          Content * (HTML supported)
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={20}
          className={`${INPUT_CLASS} resize-none font-mono text-sm`}
          placeholder="Write your blog content here... HTML is supported."
        />
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          You can use HTML tags for formatting. Content will be sanitized before
          display.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Saving..." : isEditing ? "Update Blog" : "Create Blog"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-[var(--color-border)] px-6 py-3 font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-border-hover)]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
