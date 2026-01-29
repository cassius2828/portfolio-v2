"use client";

import { motion } from "framer-motion";

interface WorkInProgressProps {
  title?: string;
  description?: string;
}

export function WorkInProgress({
  title = "Coming Soon",
  description = "This section is currently under development. Check back soon for updates!",
}: WorkInProgressProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass mx-auto max-w-2xl rounded-2xl p-8 text-center"
    >
      <div className="mb-4 flex justify-center">
        <div className="animate-pulse-glow rounded-full bg-[var(--color-accent-muted)] p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-[var(--color-accent)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
        </div>
      </div>
      <h3 className="mb-2 text-xl font-bold text-[var(--color-text-primary)]">
        {title}
      </h3>
      <p className="text-[var(--color-text-secondary)]">{description}</p>
    </motion.div>
  );
}
