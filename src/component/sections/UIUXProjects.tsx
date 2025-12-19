import Container from "../layout/Container";
import { profile } from "../../data/profile";
import ProjectCard from "../projects/ProjectCard";
import SectionTitle from "../ui/SectionTiltle";

export default function UIUXProjects() {
  return (
    <section id="projects-uiux" className="py-16">
      <Container>
        <SectionTitle eyebrow="UI/UX" title="UI/UX Projects" subtitle="Design work showcased with a clean system & hierarchy." />
        <div className="grid gap-6 md:grid-cols-2">
          {profile.uiuxProjects.map((p) => (
            <ProjectCard
              key={p.title}
              image={p.image}
              title={p.title}
              desc={p.desc}
              tags={p.tags}
              primaryLabel="View on Dribbble"
              primaryHref={p.dribbble}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
