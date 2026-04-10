"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-gray-950 px-6 text-center text-white">
        <h1 className="mb-4 text-4xl font-bold">Something went wrong</h1>
        <p className="mb-8 max-w-md text-lg text-gray-400">
          A critical error occurred. Please try refreshing the page.
        </p>
        <button
          onClick={reset}
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
