import React from "react";

export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="
        inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold
        border border-zinc-200/70 bg-zinc-50 text-zinc-700
        shadow-sm shadow-zinc-900/5
        transition
        hover:-translate-y-[1px] hover:bg-white hover:shadow-md hover:shadow-indigo-500/10
        dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:shadow-none
      "
    >
      {children}
    </span>
  );
}
