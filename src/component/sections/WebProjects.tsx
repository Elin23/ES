import { useMemo, useState, useEffect } from "react";
import Container from "../layout/Container";
import { profile } from "../../data/profile";
import ProjectCard from "../projects/ProjectCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionTitle from "../ui/SectionTiltle";

const PAGE_SIZE = 6;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function WebProjects() {
  const projects = profile.webProjects;

  const totalPages = Math.max(1, Math.ceil(projects.length / PAGE_SIZE));
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage((p) => clamp(p, 1, totalPages));
  }, [totalPages]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return projects.slice(start, start + PAGE_SIZE);
  }, [projects, page]);

  function goTo(next: number) {
    const p = clamp(next, 1, totalPages);
    setPage(p);

    // scroll لطيف لنفس القسم
    requestAnimationFrame(() => {
      document.getElementById("projects-web")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  return (
    <section id="projects-web" className="py-16">
      <Container>
        <SectionTitle
          eyebrow="Projects"
          title="Web Projects"
          subtitle="Responsive web apps with polished interactions."
        />

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pageItems.map((p) => (
            <ProjectCard
              key={p.title}
              image={p.image}
              title={p.title}
              desc={p.desc}
              tags={p.tags}
              primaryLabel="Live"
              primaryHref={p.live}
              secondaryLabel="GitHub"
              secondaryHref={p.github}
            />
          ))}
        </div>

        {/* Pagination */}
        {projects.length > PAGE_SIZE && (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              Showing{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {(page - 1) * PAGE_SIZE + 1}
              </span>
              –
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {Math.min(page * PAGE_SIZE, projects.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {projects.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Prev */}
              <button
                onClick={() => goTo(page - 1)}
                disabled={page === 1}
                className="inline-flex h-10 items-center gap-2 rounded-2xl border border-zinc-200/60 bg-white/60 px-3 text-sm
                           backdrop-blur transition hover:-translate-y-[1px] hover:shadow-lg hover:shadow-indigo-500/10
                           disabled:cursor-not-allowed disabled:opacity-50
                           dark:border-white/10 dark:bg-white/5"
              >
                <ChevronLeft className="h-4 w-4" />
                Prev
              </button>

              {/* Page numbers */}
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const n = i + 1;
                  const active = n === page;
                  return (
                    <button
                      key={n}
                      onClick={() => goTo(n)}
                      className={[
                        "grid h-10 w-10 place-items-center rounded-2xl border text-sm transition",
                        "backdrop-blur hover:-translate-y-[1px] hover:shadow-lg hover:shadow-indigo-500/10",
                        "dark:border-white/10",
                        active
                          ? "border-transparent bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-cyan-500 text-white"
                          : "border-zinc-200/60 bg-white/60 text-zinc-800 dark:bg-white/5 dark:text-zinc-200",
                      ].join(" ")}
                      aria-current={active ? "page" : undefined}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>

              {/* Next */}
              <button
                onClick={() => goTo(page + 1)}
                disabled={page === totalPages}
                className="inline-flex h-10 items-center gap-2 rounded-2xl border border-zinc-200/60 bg-white/60 px-3 text-sm
                           backdrop-blur transition hover:-translate-y-[1px] hover:shadow-lg hover:shadow-indigo-500/10
                           disabled:cursor-not-allowed disabled:opacity-50
                           dark:border-white/10 dark:bg-white/5"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
