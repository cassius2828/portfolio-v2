"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import { api } from "~/trpc/react";
import { FADE_UP, FADE_LEFT, FADE_RIGHT } from "~/lib/motion";
import {
  contactInfo,
  socialLinks,
  connectionOptions,
  type ConnectionType,
} from "~/lib/content";
import { SectionHeading } from "../shared/SectionHeading";
import { INPUT_CLASS, LABEL_CLASS } from "~/lib/form-styles";

const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 500;

/** Toasts from this section render here (below header) instead of the global top-of-page toaster. */
const CONTACT_TOASTER_ID = "contact-form";

const contactToastOpts = { toasterId: CONTACT_TOASTER_ID };

function getHumanErrorMessage(raw: string): string {
  const lower = raw.toLowerCase();
  /* Avoid substring checks on "email", "message", "name" — SES and other server errors contain those words. */
  if (lower.includes("unavailable"))
    return "The contact form is temporarily unavailable. Please try again later.";
  if (lower.includes("unable to send")) return raw;
  return "Something went wrong. Please try again.";
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    affiliation: "",
    connection: "recruiter" as ConnectionType,
    website: "",
  });
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const messageLength = formData.message.length;
  const showMessageError = hasAttemptedSubmit || messageLength > 0;
  const isMessageInvalid =
    showMessageError && messageLength < MIN_MESSAGE_LENGTH;

  const submitMutation = api.contact.submit.useMutation({
    onSuccess: () => {
      toast.success("Message sent successfully! I'll get back to you soon.", {
        ...contactToastOpts,
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        affiliation: "",
        connection: "recruiter",
        website: "",
      });
      setHasAttemptedSubmit(false);
    },
    onError: (error) => {
      const fieldErrors = error.data?.zodError?.fieldErrors as
        | Record<string, string[] | undefined>
        | undefined;
      if (fieldErrors?.email?.length) {
        toast.error("Please enter a valid email address.", contactToastOpts);
        return;
      }
      if (fieldErrors?.message?.length) {
        toast.error(
          fieldErrors.message[0] ?? "Please check your message.",
          contactToastOpts,
        );
        return;
      }
      if (fieldErrors?.name?.length) {
        toast.error("Please enter your name.", contactToastOpts);
        return;
      }
      if (fieldErrors?.subject?.length) {
        toast.error("Please enter a subject.", contactToastOpts);
        return;
      }
      toast.error(getHumanErrorMessage(error.message), contactToastOpts);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    if (messageLength < MIN_MESSAGE_LENGTH) {
      toast.error(
        "Your message must be at least 10 characters.",
        contactToastOpts,
      );
      return;
    }

    submitMutation.mutate(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInformationContent = (
    <div className="space-y-6">
      <div>
        <p className="mb-1 text-sm text-[var(--color-text-muted)]">Phone</p>
        <p className="text-lg">{contactInfo.phone}</p>
      </div>
      <div>
        <p className="mb-1 text-sm text-[var(--color-text-muted)]">Email</p>
        <a
          href={`mailto:${contactInfo.email}`}
          className="text-lg text-[var(--color-accent)] hover:underline"
        >
          {contactInfo.email}
        </a>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          (click to open email draft)
        </p>
      </div>
      <div>
        <p className="mb-1 text-sm text-[var(--color-text-muted)]">LinkedIn</p>
        <a
          href={socialLinks.linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg text-[var(--color-accent)] hover:underline"
        >
          {socialLinks.linkedin.displayName}
        </a>
      </div>
      <div>
        <p className="mb-1 text-sm text-[var(--color-text-muted)]">GitHub</p>
        <a
          href={socialLinks.github.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg text-[var(--color-accent)] hover:underline"
        >
          github.com/{socialLinks.github.username}
        </a>
      </div>
    </div>
  );

  return (
    <section id="contact" className="relative py-24">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[var(--color-bg-secondary)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:14px_24px]" />
        <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[var(--color-accent)] opacity-[0.03] blur-[150px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <motion.div {...FADE_UP} className="mb-12 text-center">
          <SectionHeading title="Get in Touch" className="mb-0 text-center" />
        </motion.div>

        {/* Toasts for this section: below the fixed header, above the form area */}
        <Toaster
          id={CONTACT_TOASTER_ID}
          position="top-center"
          offset={{ top: "6.5rem" }}
          toastOptions={{
            style: {
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-primary)",
            },
          }}
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div {...FADE_LEFT} className="card p-8">
            <h3 className="mb-6 text-2xl font-bold">Contact Information</h3>
            {contactInformationContent}
          </motion.div>

          <motion.form
            {...FADE_RIGHT}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="card space-y-6 p-8"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className={LABEL_CLASS}>
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label htmlFor="email" className={LABEL_CLASS}>
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={INPUT_CLASS}
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className={LABEL_CLASS}>
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className={INPUT_CLASS}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="affiliation" className={LABEL_CLASS}>
                  Company / Affiliation
                </label>
                <input
                  type="text"
                  id="affiliation"
                  name="affiliation"
                  value={formData.affiliation}
                  onChange={handleChange}
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label htmlFor="connection" className={LABEL_CLASS}>
                  Your Role
                </label>
                <select
                  id="connection"
                  name="connection"
                  value={formData.connection}
                  onChange={handleChange}
                  className={INPUT_CLASS}
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
              <label htmlFor="message" className={LABEL_CLASS}>
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                maxLength={MAX_MESSAGE_LENGTH}
                aria-invalid={isMessageInvalid}
                aria-describedby="message-hint"
                className={`w-full resize-none rounded-lg border bg-[var(--color-bg-tertiary)] px-4 py-3 text-[var(--color-text-primary)] transition-colors focus:outline-none ${
                  isMessageInvalid
                    ? "border-red-500 focus:border-red-500"
                    : "border-[var(--color-border)] focus:border-[var(--color-accent)]"
                }`}
              />
              <div className="mt-1.5 flex items-center justify-between">
                <p
                  id="message-hint"
                  role={isMessageInvalid ? "alert" : undefined}
                  className={`text-xs ${
                    isMessageInvalid ? "text-red-400" : "text-transparent"
                  }`}
                >
                  {`${MIN_MESSAGE_LENGTH - messageLength} more character${
                    MIN_MESSAGE_LENGTH - messageLength !== 1 ? "s" : ""
                  } needed`}
                </p>
                <p
                  className={`text-xs tabular-nums ${
                    showMessageError && messageLength < MIN_MESSAGE_LENGTH
                      ? "text-red-400"
                      : "text-[var(--color-text-muted)]"
                  }`}
                >
                  {messageLength}/{MAX_MESSAGE_LENGTH}
                </p>
              </div>
            </div>

            <div aria-hidden="true" className="absolute left-[-9999px]">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
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
