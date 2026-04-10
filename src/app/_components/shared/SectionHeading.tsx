interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  as?: "h1" | "h2";
  className?: string;
}

const sizeMap = {
  h1: "text-4xl md:text-5xl",
  h2: "text-3xl md:text-4xl",
} as const;

export function SectionHeading({
  title,
  subtitle,
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={className ?? "mb-12 text-center"}>
      <Tag className={`mb-4 font-bold ${sizeMap[Tag]}`}>{title}</Tag>
      <div className="mx-auto h-1 w-24 rounded-full bg-[var(--gradient-primary)]" />
      {subtitle && (
        <p className="mx-auto mt-6 max-w-2xl text-[var(--color-text-secondary)]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
