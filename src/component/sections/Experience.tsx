import Container from "../layout/Container";
import { profile } from "../../data/profile";
import SectionTitle from "../ui/SectionTiltle";

function Item({
  place,
  position,
  from,
  to,
  desc,
}: {
  place: string;
  position: string;
  from: string;
  to: string;
  desc?: string;
}) {
  return (
    <div className="relative pl-6">
      <div className="absolute -left-1.5 top-2 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-500" />
      <div className="rounded-3xl border border-zinc-200/60 bg-white/60 p-5 backdrop-blur dark:border-white/10 dark:bg-white/5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="font-semibold">{position}</div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">{place}</div>
          </div>
          <div className="text-xs text-zinc-600 dark:text-zinc-400">
            {from} — {to}
          </div>
        </div>
        {desc && <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">{desc}</p>}
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-16">
      <Container>
        <SectionTitle
          eyebrow="Experience"
          title="Experience & Internships"
          subtitle="Add your roles, durations, and what you delivered."
        />

        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h4 className="mb-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Work</h4>
            <div className="relative space-y-5 border-l border-zinc-200/60 dark:border-white/10">
              
              {profile.experience.map((e) => (
                <Item key={`${e.place}-${e.position}-${e.from}`} {...e} />
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Internships</h4>
            <div className="relative space-y-5 border-l border-zinc-200/60 dark:border-white/10">
              
              {profile.internships.map((i) => (
                <Item key={`${i.place}-${i.position}-${i.from}`} {...i} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
