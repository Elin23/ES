import React from "react";
import clsx from "clsx";

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "group relative overflow-hidden rounded-3xl border border-zinc-200/60 bg-white/70 backdrop-blur",
        "dark:border-white/10 dark:bg-white/5",
        "transition will-change-transform",
        className
      )}
    >
      {/* glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -inset-24 bg-[radial-gradient(circle_at_30%_20%,rgba(217,70,239,0.25),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(99,102,241,0.22),transparent_55%)]" />
      </div>
      {children}
    </div>
  );
}
