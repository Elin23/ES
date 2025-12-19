import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          onClick={scrollTop}
          aria-label="Scroll to top"
          className="
            fixed bottom-6 right-6 z-50
            grid h-12 w-12 place-items-center
            rounded-2xl
            border border-zinc-200/60
            bg-white/70 backdrop-blur
            shadow-lg shadow-indigo-500/15
            transition
            hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/25
            dark:border-white/10 dark:bg-white/5
          "
        >
          <ChevronUp className="h-5 w-5 text-zinc-800 dark:text-zinc-100" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
