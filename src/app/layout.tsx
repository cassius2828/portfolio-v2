import "~/styles/globals.css";

import { type Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { Header } from "./_components/layout/Header";
import { Footer } from "./_components/layout/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Cassius Reynolds | Full Stack Developer",
    template: "%s | Cassius Reynolds",
  },
  description:
    "Full Stack Developer specializing in React, Next.js, TypeScript, and Node.js. Building scalable web applications with modern technologies.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "Software Engineer",
    "Web Developer",
    "Cassius Reynolds",
  ],
  authors: [{ name: "Cassius Reynolds" }],
  creator: "Cassius Reynolds",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Cassius Reynolds Portfolio",
    title: "Cassius Reynolds | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, TypeScript, and Node.js.",
    images: [
      {
        url: "/images/headshot.webp",
        width: 1200,
        height: 630,
        alt: "Cassius Reynolds - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cassius Reynolds | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, TypeScript, and Node.js.",
    images: ["/images/headshot.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Cassius Reynolds",
  jobTitle: "Full Stack Developer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  sameAs: [
    "https://github.com/cassius2828",
    "https://www.linkedin.com/in/cassius-reynolds",
    "https://www.credly.com/users/cassius-reynolds",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "AWS",
    "Python",
    "Django",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[var(--color-bg-primary)] font-sans antialiased">
        <TRPCReactProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
