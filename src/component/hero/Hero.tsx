import { profile } from "../../data/profile";
import { motion } from "motion/react";
import Button from "../ui/Button";
import Hero3D from "./Hero3D";
import { Github, Linkedin } from "lucide-react";

export default function Hero() {
  return (
    <section id="top" className="relative">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200/60 bg-white/70 px-3 py-1 text-xs text-zinc-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
          >
            Creative • Front-End • UI/UX
          </motion.p>

          {/* ❌ بدون أي Animation */}
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="text-gradient">{profile.name}</span>
          </h1>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="mt-2 text-lg text-zinc-600 dark:text-zinc-300"
          >
            {profile.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mt-5 max-w-xl text-zinc-700 dark:text-zinc-300"
          >
            {profile.tagline}
          </motion.p>

          {/* Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href={profile.links.cv} download>
              <Button>Download CV</Button>
            </a>

            <a
              href={buildWhatsAppLink(profile.name)}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="soft">WhatsApp</Button>
            </a>

            <a href={buildMailto(profile.name)}>
              <Button variant="soft">Email</Button>
            </a>
          </div>

          {/* Social icons */}
          <div className="mt-6 flex items-center gap-4">
            {/* GitHub */}
            <a
              href="https://github.com/elin23"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="group flex h-10 w-10 items-center justify-center rounded-xl
              border border-zinc-200/60 bg-white/60 backdrop-blur
              transition hover:-translate-y-1 hover:border-zinc-300
              hover:shadow-lg hover:shadow-zinc-500/10
              dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20"
            >
              <Github className="h-5 w-5 text-zinc-700 transition group-hover:text-zinc-900 dark:text-zinc-300 dark:group-hover:text-white" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/ellinshaia"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="group flex h-10 w-10 items-center justify-center rounded-xl
              border border-zinc-200/60 bg-white/60 backdrop-blur
              transition hover:-translate-y-1 hover:border-indigo-400
              hover:shadow-lg hover:shadow-indigo-500/20
              dark:border-white/10 dark:bg-white/5 dark:hover:border-indigo-400/60"
            >
              <Linkedin className="h-5 w-5 text-zinc-700 transition group-hover:text-indigo-600 dark:text-zinc-300 dark:group-hover:text-indigo-400" />
            </a>
          </div>
        </div>

        <Hero3D />
      </div>
    </section>
  );
}

/* ================= Helpers ================= */

function buildWhatsAppLink(name: string) {
  const base = "https://wa.me/00963959902149";
  const text = encodeURIComponent(
    `Hi, I’m contacting you from ${name}'s portfolio.`
  );
  return `${base}?text=${text}`;
}

function buildMailto(name: string) {
  const to = "elinshaia23@gmail.com";
  const subject = encodeURIComponent(`Portfolio inquiry — ${name}`);
  const body = encodeURIComponent(
    `Hi ${name},\n\nI’d like to get in touch with you.\n\n—`
  );
  return `mailto:${to}?subject=${subject}&body=${body}`;
}
