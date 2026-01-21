import { AnimatePresence, motion } from "motion/react";

type Props = {
  show: boolean;
  name?: string;
  caption?: string;
};

export default function ClassicLoader({
  show,
  name = "Eng.Ellin Shaia",
  caption = "Loading…",
}: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="classic-pro-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="
            fixed inset-0 z-[9999] grid place-items-center
            bg-zinc-50/80 text-zinc-900 backdrop-blur-md
            dark:bg-zinc-950 dark:text-white
          "
          role="status"
          aria-label="Loading"
        >
          {/* Background subtle accents (light/dark) */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-fuchsia-500/10 blur-[90px] dark:bg-fuchsia-500/18" />
            <div className="absolute -right-52 top-10 h-[620px] w-[620px] rounded-full bg-cyan-500/10 blur-[100px] dark:bg-cyan-500/16" />
            <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/8 blur-[120px] dark:bg-indigo-500/12" />
          </div>

          <div className="relative flex flex-col items-center">
            {/* Card wrapper so light theme looks premium */}
            <div
              className="
                rounded-3xl border border-zinc-200/70 bg-white/70 p-8 shadow-xl backdrop-blur
                dark:border-white/10 dark:bg-white/5
              "
            >
              {/* Spinner stack */}
              <div className="relative grid h-28 w-28 place-items-center mx-auto">
                {/* outer ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-zinc-900/10 dark:border-white/10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                />

                {/* middle ring (dashed) */}
                <motion.div
                  className="absolute inset-[10px] rounded-full border border-zinc-900/15 [border-style:dashed] dark:border-white/15"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 1.7, repeat: Infinity, ease: "linear" }}
                />

                {/* inner arc (classic spinner feel) */}
                <motion.div
                  className="
                    absolute inset-[20px] rounded-full border-4
                    border-zinc-900/10 border-t-zinc-900/70
                    dark:border-white/10 dark:border-t-white/90
                  "
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                />

                {/* orbit dots */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i / 12) * Math.PI * 2;
                  const r = 56;
                  const x = Math.cos(angle) * r;
                  const y = Math.sin(angle) * r;
                  const delay = i * 0.03;

                  return (
                    <motion.span
                      key={i}
                      className="absolute h-2 w-2 rounded-full bg-zinc-900/55 dark:bg-white/70"
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                      animate={{
                        opacity: [0.25, 1, 0.25],
                        scale: [0.9, 1.25, 0.9],
                      }}
                      transition={{
                        duration: 1.05,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay,
                      }}
                    />
                  );
                })}

                {/* center */}
                <div className="absolute inset-[30px] rounded-full bg-gradient-to-br from-fuchsia-500/10 via-indigo-500/10 to-cyan-500/10 blur-[10px] dark:from-fuchsia-500/20 dark:via-indigo-500/15 dark:to-cyan-500/20" />
                <div className="absolute inset-[34px] rounded-full border border-zinc-900/10 bg-white/55 backdrop-blur dark:border-white/10 dark:bg-white/5" />
                <div className="absolute text-xs font-semibold text-zinc-900/80 dark:text-white/85">
                  E
                </div>
              </div>

              {/* Name */}
              <div className="mt-6 text-center">
                <div className="text-xl font-semibold tracking-tight">
                  <span className="bg-gradient-to-r from-fuchsia-500 via-indigo-600 to-cyan-600 bg-clip-text text-transparent dark:from-fuchsia-300 dark:via-white dark:to-cyan-300">
                    {name}
                  </span>
                </div>
                <div className="mt-1 text-sm text-zinc-600 dark:text-white/60">
                  {caption}
                </div>
              </div>

              {/* mini progress */}
              <div className="mt-5 h-2 w-72 overflow-hidden rounded-full bg-zinc-900/10 dark:bg-white/10">
                <motion.div
                  className="h-full w-1/3 rounded-full bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-500"
                  animate={{ x: ["-120%", "220%"] }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
