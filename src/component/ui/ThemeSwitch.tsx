import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../app/providers/ThemeProvider";

export default function ThemeSwitch() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl
                 border border-zinc-200/60 bg-white/70 backdrop-blur
                 transition hover:scale-105
                 dark:border-white/10 dark:bg-white/5"
    >
      {isDark ? (
        <Moon className="h-4 w-4 text-indigo-400" />
      ) : (
        <Sun className="h-4 w-4 text-fuchsia-500" />
      )}
    </button>
  );
}
