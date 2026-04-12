interface PageShellProps {
  children: React.ReactNode;
  /** Optional background decoration elements (orbs, etc.) */
  bgSlot?: React.ReactNode;
}

export function PageShell({ children, bgSlot }: PageShellProps) {
  return (
    <div className="min-h-screen pt-28 print:min-h-0 print:pt-0">
      <div className="fixed inset-0 -z-10 print:hidden">
        <div className="absolute inset-0 bg-[var(--color-bg-primary)]" />
        {bgSlot}
      </div>
      {children}
    </div>
  );
}
