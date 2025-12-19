export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <div className="mb-2 inline-flex rounded-full border border-zinc-200/60 bg-white/60 px-3 py-1 text-xs text-zinc-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
          {eyebrow}
        </div>
      )}
      <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h3>
      {subtitle && <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">{subtitle}</p>}
    </div>
  );
}
