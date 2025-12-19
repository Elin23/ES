import Container from "../layout/Container";
import {
  Code2,
  Braces,
  FileCode2,
  Layout,
  Monitor,
  Palette,
  Figma,
} from "lucide-react";
import SectionTitle from "../ui/SectionTiltle";

function SkillIcon({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className="group flex flex-col items-center justify-center gap-2
                 rounded-2xl border border-zinc-200/60 bg-white/60 p-4
                 backdrop-blur transition
                 hover:-translate-y-1 hover:border-indigo-400
                 hover:shadow-lg hover:shadow-indigo-500/15
                 dark:border-white/10 dark:bg-white/5 dark:hover:border-indigo-400/60"
    >
      <div className="text-2xl transition group-hover:scale-110">
        {icon}
      </div>
      <span className="text-xs font-medium text-zinc-700 dark:text-zinc-200">
        {label}
      </span>
    </div>
  );
}


export default function Skills() {
  return (
    <section id="skills" className="py-16">
      <Container>
        <SectionTitle
          eyebrow="Skills"
          title="My technical toolkit"
          subtitle="Technologies I use to design, build, and ship modern interfaces."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {/* Languages */}
          <div className="rounded-3xl border border-zinc-200/60 bg-white/60 p-6 backdrop-blur dark:border-white/10 dark:bg-white/5">
            <h4 className="mb-4 flex items-center gap-2 font-semibold">
              <Code2 className="h-4 w-4 text-fuchsia-500" />
              Languages
            </h4>

            <div className="grid grid-cols-3 gap-3">
              <SkillIcon icon={<FileCode2 />} label="HTML" />
              <SkillIcon icon={<Braces />} label="CSS" />
              <SkillIcon icon={<FileCode2 />} label="JavaScript" />
              <SkillIcon icon={<FileCode2 />} label="TypeScript" />
              <SkillIcon icon={<FileCode2 />} label="Python" />
              <SkillIcon icon={<FileCode2 />} label="C#" />
            </div>
          </div>

          {/* Front-End */}
          <div className="rounded-3xl border border-zinc-200/60 bg-white/60 p-6 backdrop-blur dark:border-white/10 dark:bg-white/5">
            <h4 className="mb-4 flex items-center gap-2 font-semibold">
              <Monitor className="h-4 w-4 text-indigo-500" />
              Front-End
            </h4>

            <div className="grid grid-cols-3 gap-3">
              <SkillIcon icon={<Layout />} label="React" />
              <SkillIcon icon={<Layout />} label="Next.js" />
              <SkillIcon icon={<Monitor />} label="Electron.js" />
              <SkillIcon icon={<Palette />} label="Tailwind" />
              <SkillIcon icon={<Palette />} label="Bootstrap" />
            </div>
          </div>

          {/* UI / UX */}
          <div className="rounded-3xl border border-zinc-200/60 bg-white/60 p-6 backdrop-blur dark:border-white/10 dark:bg-white/5">
            <h4 className="mb-4 flex items-center gap-2 font-semibold">
              <Palette className="h-4 w-4 text-cyan-500" />
              UI / UX
            </h4>

            <div className="grid grid-cols-3 gap-3">
              <SkillIcon icon={<Figma />} label="Figma" />
              <SkillIcon icon={<Layout />} label="Design Systems" />
              <SkillIcon icon={<Palette />} label="UX Thinking" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
