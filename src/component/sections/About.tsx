import Container from "../layout/Container";
import { profile } from "../../data/profile";
import { motion } from "motion/react";
import { GraduationCap, Sparkles, Timer, Workflow } from "lucide-react";
import About3DComputer from "./About3DComputer";
import SectionTitle from "../ui/SectionTiltle";

function Chip({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-zinc-200/60 bg-white/60 px-3 py-1 text-xs text-zinc-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
      {children}
    </span>
  );
}

function StatRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-zinc-200/60 bg-white/50 p-4 backdrop-blur transition hover:-translate-y-[2px] hover:shadow-lg hover:shadow-indigo-500/10 dark:border-white/10 dark:bg-white/5">
      <div className="mt-0.5">{icon}</div>
      <div>
        <div className="text-xs text-zinc-600 dark:text-zinc-400">{label}</div>
        <div className="mt-0.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {value}
        </div>
      </div>
    </div>
  );
}

function Step({ n, text }: { n: string; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-zinc-200/60 bg-white/50 p-4 backdrop-blur transition hover:bg-white/70 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
      <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-cyan-500 text-xs font-semibold text-white">
        {n}
      </div>
      <div className="text-sm text-zinc-700 dark:text-zinc-200">{text}</div>
    </div>
  );
}

const cardAnim = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.45 },
};

export default function About() {
  return (
    <section id="about" className="py-16">
      <Container>
        <SectionTitle
          eyebrow="About"
          title="Strategy-first UI. Clean code. Reliable delivery."
          subtitle="A compact snapshot—organized like a dashboard."
        />

        {/* ✅ 2 columns × 2 rows (4 cards) — no blanks */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Card 1: About */}
          <motion.div {...cardAnim} className="min-w-0">
            <div className="group relative h-full overflow-hidden rounded-3xl border border-zinc-200/60 bg-white/60 p-7 backdrop-blur dark:border-white/10 dark:bg-white/5">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div className="absolute -inset-24 bg-[radial-gradient(circle_at_20%_20%,rgba(217,70,239,0.18),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(99,102,241,0.14),transparent_55%)]" />
              </div>

              <div className="relative">
                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  <Sparkles className="h-4 w-4 text-fuchsia-500" />
                  About me
                </div>

                <p className="mt-4 line-clamp-6 leading-relaxed text-zinc-700 dark:text-zinc-200">
                  {profile.about}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Chip>Fast learner</Chip>
                  <Chip>Analytical</Chip>
                  <Chip>Leadership</Chip>
                  <Chip>UI/UX</Chip>
                  <Chip>React</Chip>
                  <Chip>Consistency</Chip>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: 3D */}
          <motion.div {...cardAnim} transition={{ duration: 0.45, delay: 0.05 }} className="min-w-0">
            <div className="h-full">
              <About3DComputer />
            </div>
          </motion.div>

          {/* Card 3: Quick facts */}
          <motion.div {...cardAnim} transition={{ duration: 0.45, delay: 0.1 }} className="min-w-0">
            <div className="h-full rounded-3xl border border-zinc-200/60 bg-white/60 p-6 backdrop-blur dark:border-white/10 dark:bg-white/5">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <GraduationCap className="h-4 w-4 text-indigo-500" />
                Quick facts
              </div>

              <div className="space-y-3">
                <StatRow
                  icon={<GraduationCap className="h-4 w-4 text-zinc-700 dark:text-zinc-200" />}
                  label="Education"
                  value="Informatics Engineering (Software Development) — SVU"
                />
                <StatRow
                  icon={<Timer className="h-4 w-4 text-zinc-700 dark:text-zinc-200" />}
                  label="Strength"
                  value="On-time delivery & consistent execution"
                />
                <StatRow
                  icon={<Workflow className="h-4 w-4 text-zinc-700 dark:text-zinc-200" />}
                  label="Focus"
                  value="UI systems, responsive design, interactions"
                />
              </div>
            </div>
          </motion.div>

          {/* Card 4: Workflow */}
          <motion.div {...cardAnim} transition={{ duration: 0.45, delay: 0.15 }} className="min-w-0">
            <div className="h-full rounded-3xl border border-zinc-200/60 bg-white/60 p-6 backdrop-blur dark:border-white/10 dark:bg-white/5">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <Workflow className="h-4 w-4 text-cyan-500" />
                How I work
              </div>

              <div className="space-y-3">
                <Step n="1" text="Analyze goals & constraints" />
                <Step n="2" text="Plan structure & timeline" />
                <Step n="3" text="Design flows & UI system" />
                <Step n="4" text="Build, test, polish" />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
