import clsx from "clsx";
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "soft";
  ariaLabel?: string;
};

export default function Button({ variant = "primary", className, ariaLabel, ...props }: Props) {
  return (
    <button
      aria-label={ariaLabel}
      className={clsx(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition will-change-transform",
        "focus:outline-none focus:ring-2 focus:ring-fuchsia-400/40 dark:focus:ring-fuchsia-400/30",
        variant === "primary" &&
          "bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/20 hover:translate-y-[-1px]",
        variant === "soft" &&
          "border border-zinc-200/60 bg-white/70 text-zinc-900 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10",
        variant === "ghost" &&
          "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-white/5",
        className
      )}
      {...props}
    />
  );
}
