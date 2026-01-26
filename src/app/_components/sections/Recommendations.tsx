"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { recommendations } from "~/lib/content";

export function Recommendations() {
    // Don't render section if there are no recommendations
    if (recommendations.length === 0) {
        return null;
    }

    return (
        <section id="recommendations" className="relative py-24">
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[var(--color-bg-secondary)]" />
                <div className="absolute right-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[var(--color-accent)] opacity-[0.03] blur-[120px]" />
            </div>

            <div className="mx-auto max-w-7xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                        Recommendations
                    </h2>
                    <div className="mx-auto h-1 w-24 rounded-full bg-[var(--gradient-primary)]" />
                    <p className="mx-auto mt-6 max-w-2xl text-[var(--color-text-secondary)]">
                        What colleagues and collaborators have to say about working with me
                    </p>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {recommendations.map((rec, i) => (
                        <motion.div
                            key={`${rec.name}-${i}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="card group relative flex flex-col p-6"
                        >
                            {/* Quote icon */}
                            <div className="absolute top-20 left-6 text-4xl text-[var(--color-accent)] opacity-30">
                                &ldquo;
                            </div>

                            {/* Author image */}
                            <div className="flex items-center justify-center mb-4">
                                <Image src={rec.img} alt={rec.name} width={64} height={64} className="w-16 h-16 rounded-full object-cover" />
                            </div>

                            {/* Recommendation text */}
                            <p className="mb-6 flex-1 pt-4 text-[var(--color-text-secondary)]">
                                {rec.text}
                            </p>

                            {/* Author info */}
                            <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-4">
                                <div>
                                    <p className="font-semibold text-[var(--color-text-primary)]">
                                        {rec.name}
                                    </p>
                                    <p className="text-sm text-[var(--color-text-muted)]">
                                        {rec.role}
                                    </p>
                                </div>

                                {/* LinkedIn link */}
                                <a
                                    href={rec.linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                                    aria-label={`View ${rec.name}'s recommendation on LinkedIn`}
                                >
                                    <svg
                                        className="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

