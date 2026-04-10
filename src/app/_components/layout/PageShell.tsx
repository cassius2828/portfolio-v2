interface PageShellProps {
  children: React.ReactNode;
  /** Optional background decoration elements (orbs, etc.) */
  bgSlot?: React.ReactNode;
}

export function PageShell({ children, bgSlot }: PageShellProps) {
  return (
    <div className="min-h-screen pt-28">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[var(--color-bg-primary)]" />
        {bgSlot}
      </div>
      {children}
    </div>
  );
}
