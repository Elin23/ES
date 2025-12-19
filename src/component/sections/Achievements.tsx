import Container from "../layout/Container";
import { profile } from "../../data/profile";
import SectionTitle from "../ui/SectionTiltle";
import { Award, Trophy, Rocket, Star } from "lucide-react";

function classify(title: string) {
  const t = title.toLowerCase();

  if (t.includes("1st") || t.includes("first") || t.includes("rank")) {
    return {
      Icon: Trophy,
      label: "Winner",
      accent: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
      bar: "bg-amber-500/60",
    };
  }
  if (t.includes("highest") || t.includes("top") || t.includes("award")) {
    return {
      Icon: Award,
      label: "Award",
      accent: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
      bar: "bg-indigo-500/60",
    };
  }
  if (t.includes("launched") || t.includes("launch") || t.includes("shipped")) {
    return {
      Icon: Rocket,
      label: "Launch",
      accent: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
      bar: "bg-emerald-500/60",
    };
  }
  return {
    Icon: Star,
    label: "Milestone",
    accent: "bg-zinc-500/10 text-zinc-700 dark:text-zinc-200",
    bar: "bg-zinc-400/60 dark:bg-white/10",
  };
}

function AchievementCard({ a }: { a: (typeof profile.achievements)[number] }) {
  const meta = classify(a.title);
  const Icon = meta.Icon;

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 p-6 shadow-sm backdrop-blur
                 transition hover:-translate-y-1 hover:shadow-lg
                 dark:border-white/10 dark:bg-white/5"
    >
      {/* subtle left accent */}
      <div className={`absolute left-0 top-0 h-full w-1 ${meta.bar}`} />

      {/* very light hover glow (much calmer than before) */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -inset-24 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.10),transparent_55%)]" />
      </div>

      <div className="relative">
        <header className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${meta.accent}`}>
              <Icon className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 break-words">
                  {a.title}
                </span>

                {/* <span className="inline-flex items-center rounded-full border border-zinc-200/70 bg-white/60 px-2 py-0.5 text-[11px] font-medium text-zinc-600
                                 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
                  {meta.label}
                </span> */}
              </div>

              {a.desc ? (
                <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {a.desc}
                </p>
              ) : null}
            </div>
          </div>

          <time
            className="shrink-0 rounded-full border border-zinc-200/70 bg-white/60 px-3 py-1 text-xs font-semibold text-zinc-700
                       dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
          >
            {a.year}
          </time>
        </header>
      </div>
    </article>
  );
}

export default function Achievements() {
  const items = profile.achievements;

  return (
    <section id="achievements" className="py-16">
      <Container>
        <SectionTitle
          eyebrow="Achievements"
          title="Milestones & wins"
          subtitle="Awards, rankings, top projects, and product launches — showcased as achievement cards."
        />

        {items.length === 0 ? (
          <div className="text-sm text-zinc-500 dark:text-zinc-500">
            Add your achievements in <span className="font-mono">data/profile.ts</span>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {items.map((a) => (
              <AchievementCard key={`${a.year}-${a.title}`} a={a} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
