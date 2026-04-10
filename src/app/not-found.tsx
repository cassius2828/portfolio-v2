import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-2 text-6xl font-bold">404</h1>
      <p className="mb-8 text-lg text-[var(--color-text-secondary)]">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="btn-primary">
        Go Home
      </Link>
    </div>
  );
}
