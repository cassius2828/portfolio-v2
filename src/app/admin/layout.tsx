import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { PageShell } from "../_components/layout/PageShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Redirect if not authenticated or not an admin
  if (!session?.user?.isAdmin) {
    redirect("/");
  }

  return (
    <PageShell
      bgSlot={
        <div className="absolute top-1/4 left-0 h-[400px] w-[400px] rounded-full bg-purple-500 opacity-[0.03] blur-[150px]" />
      }
    >
      <div className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-8 flex items-center gap-4">
          <span className="rounded-full bg-[var(--color-accent-muted)] px-4 py-1 text-sm font-medium text-[var(--color-accent)]">
            Admin
          </span>
          <span className="text-[var(--color-text-muted)]">
            Logged in as {session.user.name}
          </span>
        </div>

        {children}
      </div>
    </PageShell>
  );
}
