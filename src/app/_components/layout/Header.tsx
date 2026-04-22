"use client";

import Link from "next/link";
import { useState, type MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PORTFOLIO_SCROLL_TO_ID_KEY } from "../HomeAnchorScroll";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo, navItems, socialLinks } from "~/lib/content";
import { GithubIcon } from "../icons/GithubIcon";

const socialLinksWithIcons = [
  {
    href: socialLinks.github.url,
    label: socialLinks.github.label,
    icon: <GithubIcon />,
  },
  {
    href: socialLinks.linkedin.url,
    label: socialLinks.linkedin.label,
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  /** In-page sections on `/` — smooth scroll; from other routes go home then scroll via `HomeAnchorScroll`. */
  const handleHashNav = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("/#")) return;
    const id = href.replace("/#", "");
    e.preventDefault();
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", href);
      return;
    }
    sessionStorage.setItem(PORTFOLIO_SCROLL_TO_ID_KEY, id);
    router.push("/");
  };

  return (
    <header className="glass fixed top-0 right-0 left-0 z-50">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 text-xl font-bold"
        >
          <span className="gradient-text">{personalInfo.initials}</span>
          <span className="hidden text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-accent)] sm:inline">
            {personalInfo.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => {
                if (item.href.startsWith("/#")) {
                  handleHashNav(e, item.href);
                }
              }}
              className={`text-sm font-medium transition-colors hover:text-[var(--color-accent)] ${
                pathname === item.href
                  ? "text-[var(--color-accent)]"
                  : "text-[var(--color-text-secondary)]"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Social Links */}
          <div className="ml-4 flex items-center gap-4 border-l border-[var(--color-border)] pl-4">
            {socialLinksWithIcons.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <motion.span
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 6 : 0,
            }}
            className="h-0.5 w-6 bg-[var(--color-text-primary)]"
          />
          <motion.span
            animate={{ opacity: isOpen ? 0 : 1 }}
            className="h-0.5 w-6 bg-[var(--color-text-primary)]"
          />
          <motion.span
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? -6 : 0,
            }}
            className="h-0.5 w-6 bg-[var(--color-text-primary)]"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            id="mobile-menu"
            className="glass absolute top-20 right-0 left-0 border-t border-[var(--color-border)] md:hidden"
          >
            <nav className="flex flex-col p-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      setIsOpen(false);
                      if (item.href.startsWith("/#")) {
                        handleHashNav(e, item.href);
                      }
                    }}
                    className="block py-3 text-lg font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-6 flex items-center gap-4 border-t border-[var(--color-border)] pt-6">
                {socialLinksWithIcons.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
