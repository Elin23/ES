import Container from "../layout/Container";
import SectionTitle from "../ui/SectionTiltle";
import {
  Code2,
  Braces,
  FileCode2,
  Layout,
  Monitor,
  Palette,
  Figma,
  Sparkles,
} from "lucide-react";

type Skill = {
  label: string;
  icon: React.ReactNode;
};

type Category = {
  title: string;
  description: string;
  accent: string; // tailwind text/bg classes
  headerIcon: React.ReactNode;
  skills: Skill[];
};

function SkillPill({ icon, label }: Skill) {
  return (
    <div
      className="group flex items-center gap-2 rounded-xl border border-zinc-200/60 bg-white/70 px-3 py-2
                 text-sm backdrop-blur transition
                 hover:-translate-y-0.5 hover:border-indigo-400/60 hover:bg-white
                 hover:shadow-lg hover:shadow-indigo-500/10
                 dark:border-white/10 dark:bg-white/5 dark:hover:border-indigo-400/50 dark:hover:bg-white/10"
    >
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-zinc-100 text-zinc-700 transition group-hover:scale-110
                       dark:bg-white/10 dark:text-zinc-200">
        {icon}
      </span>
      <span className="font-medium text-zinc-800 dark:text-zinc-100">{label}</span>
    </div>
  );
}

function CategoryCard({ c }: { c: Category }) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-zinc-200/60 bg-white/60 p-6 backdrop-blur
                 shadow-sm transition
                 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10
                 dark:border-white/10 dark:bg-white/5"
    >
      {/* top accent */}
      <div className={`absolute inset-x-0 top-0 h-1 ${c.accent}`} />

      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h4 className="flex items-center gap-2 text-base font-semibold text-zinc-900 dark:text-white">
            <span className="text-zinc-700 dark:text-zinc-200">{c.headerIcon}</span>
            {c.title}
          </h4>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            {c.description}
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-zinc-200/60 bg-white/70 px-3 py-1 text-xs text-zinc-700
                        dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
          <Sparkles className="h-3.5 w-3.5" />
          {c.skills.length} skills
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {c.skills.map((s) => (
          <SkillPill key={s.label} {...s} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const categories: Category[] = [
    {
      title: "Languages",
      description: "Core languages I use for web, scripting, and apps.",
      accent: "bg-fuchsia-500",
      headerIcon: <Code2 className="h-4 w-4 text-fuchsia-500" />,
      skills: [
        { label: "HTML", icon: <FileCode2 className="h-4 w-4" /> },
        { label: "CSS", icon: <Braces className="h-4 w-4" /> },
        { label: "JavaScript", icon: <FileCode2 className="h-4 w-4" /> },
        { label: "TypeScript", icon: <FileCode2 className="h-4 w-4" /> },
        { label: "Python", icon: <FileCode2 className="h-4 w-4" /> },
        { label: "C#", icon: <FileCode2 className="h-4 w-4" /> },
      ],
    },
    {
      title: "Front-End",
      description: "Frameworks and tools for building modern interfaces.",
      accent: "bg-indigo-500",
      headerIcon: <Monitor className="h-4 w-4 text-indigo-500" />,
      skills: [
        { label: "React", icon: <Layout className="h-4 w-4" /> },
        { label: "Next.js", icon: <Layout className="h-4 w-4" /> },
        { label: "Electron.js", icon: <Monitor className="h-4 w-4" /> },
        { label: "Tailwind", icon: <Palette className="h-4 w-4" /> },
        { label: "Bootstrap", icon: <Palette className="h-4 w-4" /> },
      ],
    },
    {
      title: "UI / UX",
      description: "Design thinking, systems, and UI craftsmanship.",
      accent: "bg-cyan-500",
      headerIcon: <Palette className="h-4 w-4 text-cyan-500" />,
      skills: [
        { label: "Figma", icon: <Figma className="h-4 w-4" /> },
        { label: "Design Systems", icon: <Layout className="h-4 w-4" /> },
        { label: "UX Thinking", icon: <Palette className="h-4 w-4" /> },
      ],
    },
  ];

  return (
    <section id="skills" className="py-16">
      <Container>
        <SectionTitle
          eyebrow="Skills"
          title="My technical toolkit"
          subtitle="Technologies I use to design, build, and ship modern interfaces."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <CategoryCard key={c.title} c={c} />
          ))}
        </div>
      </Container>
    </section>
  );
}
