import Link from "next/link";
import { personalInfo, socialLinks, footerNavLinks } from "~/lib/content";

const socialLinksArray = [
  {
    href: socialLinks.github.url,
    label: socialLinks.github.label,
  },
  {
    href: socialLinks.linkedin.url,
    label: socialLinks.linkedin.label,
  },
  {
    href: socialLinks.credly.url,
    label: socialLinks.credly.label,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-bold">
              <span className="gradient-text">{personalInfo.name}</span>
            </Link>
            <p className="mt-4 text-[var(--color-text-secondary)]">
              {personalInfo.footerDescription}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Navigation
            </h3>
            <ul className="space-y-2">
              {footerNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Connect
            </h3>
            <ul className="space-y-2">
              {socialLinksArray.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="section-divider mt-12" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-center text-sm text-[var(--color-text-muted)] md:flex-row">
          <p>&copy; {currentYear} {personalInfo.name}. All rights reserved.</p>
          <p>
            Built with{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent)] hover:underline"
            >
              Next.js
            </a>
            {" & "}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent)] hover:underline"
            >
              Tailwind CSS
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
