import "~/styles/globals.css";

import { type Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { Header } from "./_components/layout/Header";
import { Footer } from "./_components/layout/Footer";
import { personalInfo, skills, socialLinks } from "~/lib/content";

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

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cassiusreynolds.dev";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${personalInfo.name} | ${personalInfo.title}`,
    template: `%s | ${personalInfo.name}`,
  },
  description: `${personalInfo.footerDescription} Building scalable web applications with modern technologies.`,
  keywords: [
    personalInfo.title,
    "React Developer",
    "Next.js",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "Software Engineer",
    "Web Developer",
    personalInfo.name,
  ],
  authors: [{ name: personalInfo.name }],
  creator: personalInfo.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: `${personalInfo.name} Portfolio`,
    title: `${personalInfo.name} | ${personalInfo.title}`,
    description: personalInfo.footerDescription,
    images: [
      {
        url: "/images/headshot.webp",
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} - ${personalInfo.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} | ${personalInfo.title}`,
    description: personalInfo.footerDescription,
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
  alternates: {
    canonical: baseUrl,
  },
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  jobTitle: personalInfo.title,
  url: baseUrl,
  sameAs: [
    socialLinks.github.url,
    socialLinks.linkedin.url,
    socialLinks.credly.url,
  ],
  knowsAbout: skills,
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
