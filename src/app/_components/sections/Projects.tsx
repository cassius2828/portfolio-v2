"use client";

import { motion } from "framer-motion";
import { ProjectCard, type SerializedProject } from "../shared/ProjectCard";

interface ProjectsProps {
  projects: SerializedProject[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section className="relative py-24">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 h-full w-full bg-[var(--color-bg-secondary)]" />
        <div className="absolute top-1/2 right-0 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[var(--color-accent)] opacity-[0.02] blur-[150px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">More Projects</h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-[var(--gradient-primary)]" />
          <p className="mx-auto mt-6 max-w-2xl text-[var(--color-text-secondary)]">
            A collection of projects showcasing my skills in full-stack
            development, from web applications to APIs and more.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
