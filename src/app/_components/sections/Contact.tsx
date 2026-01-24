"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { api } from "~/trpc/react";

const connectionOptions = [
  { value: "recruiter", label: "Recruiter" },
  { value: "freelance client", label: "Freelance Client" },
  { value: "collaborative developer", label: "Collaborative Developer" },
  { value: "other", label: "Other" },
] as const;

type ConnectionType = (typeof connectionOptions)[number]["value"];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    affiliation: "",
    connection: "recruiter" as ConnectionType,
  });
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const submitMutation = api.contact.submit.useMutation({
    onSuccess: () => {
      setStatus({
        type: "success",
        message: "Message sent successfully! I'll get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        affiliation: "",
        connection: "recruiter",
      });
      setTimeout(() => setStatus({ type: null, message: "" }), 5000);
    },
    onError: (error) => {
      setStatus({
        type: "error",
        message: error.message || "Failed to send message. Please try again.",
      });
      setTimeout(() => setStatus({ type: null, message: "" }), 5000);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative py-24">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[var(--color-bg-secondary)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[var(--color-accent)] opacity-[0.03] blur-[150px]" />
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
            Get in Touch
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-[var(--gradient-primary)]" />
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card p-8"
          >
            <h3 className="mb-6 text-2xl font-bold">Contact Information</h3>
            <div className="space-y-6">
              <div>
                <p className="mb-1 text-sm text-[var(--color-text-muted)]">
                  Phone
                </p>
                <p className="text-lg">(707) 724-1815</p>
              </div>
              <div>
                <p className="mb-1 text-sm text-[var(--color-text-muted)]">
                  Email
                </p>
                <a
                  href="mailto:cassius.reynolds.dev@gmail.com"
                  className="text-lg text-[var(--color-accent)] hover:underline"
                >
                  cassius.reynolds.dev@gmail.com
                </a>
              </div>
              <div>
                <p className="mb-1 text-sm text-[var(--color-text-muted)]">
                  LinkedIn
                </p>
                <a
                  href="https://www.linkedin.com/in/cassius-reynolds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-[var(--color-accent)] hover:underline"
                >
                  Cassius Reynolds
                </a>
              </div>
              <div>
                <p className="mb-1 text-sm text-[var(--color-text-muted)]">
                  GitHub
                </p>
                <a
                  href="https://github.com/cassius2828"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-[var(--color-accent)] hover:underline"
                >
                  github.com/cassius2828
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="card space-y-6 p-8"
          >
            {status.type && (
              <div
                className={`rounded-lg p-4 ${
                  status.type === "success"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {status.message}
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] px-4 py-3 text-[var(--color-text-primary)] transition-colors focus:border-[var(--color-accent)] focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] px-4 py-3 text-[var(--color-text-primary)] transition-colors focus:border-[var(--color-accent)] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium"
              >
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] px-4 py-3 text-[var(--color-text-primary)] transition-colors focus:border-[var(--color-accent)] focus:outline-none"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="affiliation"
                  className="mb-2 block text-sm font-medium"
                >
                  Company / Affiliation
                </label>
                <input
                  type="text"
                  id="affiliation"
                  name="affiliation"
                  value={formData.affiliation}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] px-4 py-3 text-[var(--color-text-primary)] transition-colors focus:border-[var(--color-accent)] focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="connection"
                  className="mb-2 block text-sm font-medium"
                >
                  Your Role
                </label>
                <select
                  id="connection"
                  name="connection"
                  value={formData.connection}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] px-4 py-3 text-[var(--color-text-primary)] transition-colors focus:border-[var(--color-accent)] focus:outline-none"
                >
                  {connectionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] px-4 py-3 text-[var(--color-text-primary)] transition-colors focus:border-[var(--color-accent)] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitMutation.isPending}
              className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitMutation.isPending ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

