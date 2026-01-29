"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { WorkInProgress } from "../shared/WorkInProgress";

// Toggle to show/hide client sections when ready
const SHOW_CLIENT_SECTIONS = false;

const services = [
  {
    title: "CMS Development",
    description:
      "Custom content management solutions that empower you to manage your website with ease. WordPress, Sanity, Contentful, or headless architectures tailored to your workflow.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
    ),
  },
  {
    title: "Shopify & E-commerce",
    description:
      "Launch and scale your online store with custom Shopify themes, Hydrogen storefronts, and seamless integrations that drive conversions and delight customers.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
    ),
  },
  {
    title: "Custom Applications",
    description:
      "Bespoke web applications built from the ground up. From internal tools to customer-facing platforms, I create solutions that solve your unique business challenges.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
        />
      </svg>
    ),
  },
  {
    title: "AI-Driven Development",
    description:
      "Leverage the power of AI in your applications. From intelligent chatbots to automated workflows, I integrate cutting-edge AI capabilities that give you a competitive edge.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
        />
      </svg>
    ),
  },
  {
    title: "Any Tech Stack",
    description:
      "React, Next.js, Vue, Angular, Node.js, Python, and beyond. I have the foundation and technical knowledge to deliver stellar solutions in whatever technology fits your needs.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
        />
      </svg>
    ),
  },
  {
    title: "SEO Optimization",
    description:
      "Build visibility from day one. I implement SEO best practices, performance optimization, and technical foundations that help your site rank and stand out in search results.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
    ),
  },
];

const valuePropositions = [
  {
    title: "Technical Foundation",
    description:
      "With a strong foundation in computer science and hands-on experience across the full stack, I deliver solutions that are not just functional but architecturally sound and scalable.",
  },
  {
    title: "Maintenance & Support",
    description:
      "I don't just build and disappear. I debug, maintain, and evolve custom solutions over time, ensuring your investment continues to deliver value long after launch.",
  },
  {
    title: "Design Vision",
    description:
      "Great development starts with great design thinking. I bring your ideas to life with modern, intuitive interfaces that engage users and reflect your brand.",
  },
  {
    title: "SEO Knowledge",
    description:
      "Technical SEO is baked into every project. From semantic HTML to performance optimization, I build sites that search engines love and users find easily.",
  },
];

export function ClientsContent() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20 text-center"
      >
        <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
          Web Development That{" "}
          <span className="gradient-text">Delivers Results</span>
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-[var(--color-text-secondary)] md:text-xl">
          From concept to deployment, I build digital solutions that solve real
          problems. Whether you need a content-rich website, an e-commerce
          platform, or a custom application, I bring the technical expertise
          and creative vision to make it happen.
        </p>
      </motion.div>

      {/* Services Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-24"
      >
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Services I Offer
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-[var(--gradient-primary)]" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="card p-6"
            >
              <div className="mb-4 inline-flex rounded-lg bg-[var(--color-accent-muted)] p-3 text-[var(--color-accent)]">
                {service.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
              <p className="text-[var(--color-text-secondary)]">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Value Propositions */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-24"
      >
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Why Work With Me
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-[var(--gradient-primary)]" />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {valuePropositions.map((prop, i) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent-muted)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[var(--color-accent)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold">{prop.title}</h3>
                <p className="text-[var(--color-text-secondary)]">
                  {prop.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Client Sections - Hidden until ready */}
      {SHOW_CLIENT_SECTIONS ? (
        <>
          {/* Past Clients Section */}
          <section className="mb-24">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Past Clients
              </h2>
              <div className="mx-auto h-1 w-24 rounded-full bg-[var(--gradient-primary)]" />
            </div>
            {/* Client logos/cards will go here */}
          </section>

          {/* Testimonials Section */}
          <section className="mb-24">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                What Clients Say
              </h2>
              <div className="mx-auto h-1 w-24 rounded-full bg-[var(--gradient-primary)]" />
            </div>
            {/* Testimonial cards will go here */}
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <div className="glass mx-auto max-w-3xl rounded-2xl p-12">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Ready to Start Your Project?
              </h2>
              <p className="mb-8 text-lg text-[var(--color-text-secondary)]">
                Let&apos;s discuss how I can help bring your vision to life.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/#contact" className="btn-primary">
                  Get a Quote
                </Link>
                <Link href="/#contact" className="btn-outline">
                  Contact Me
                </Link>
              </div>
            </div>
          </section>
        </>
      ) : (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <WorkInProgress
            title="Client Showcase Coming Soon"
            description="Past clients, testimonials, and project case studies are on the way. In the meantime, feel free to reach out to discuss your project!"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 text-center"
          >
            <Link href="/#contact" className="btn-primary">
              Let&apos;s Talk About Your Project
            </Link>
          </motion.div>
        </motion.section>
      )}
    </div>
  );
}
