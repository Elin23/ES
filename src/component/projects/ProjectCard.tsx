import Card from "../ui/Card";
import Tag from "../ui/Tag";
import Button from "../ui/Button";
import Magnetic from "../ui/Magnetic";
import { motion } from "motion/react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

type Props = {
  image: string;
  title: string;
  desc: string;
  tags: string[];
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function ProjectCard({
  image,
  title,
  desc,
  tags,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="min-w-0"
    >
      <Card className="group relative overflow-hidden shadow-glow">
        {/* decorative gradient border */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
          <div className="absolute -inset-24 bg-[radial-gradient(circle_at_20%_20%,rgba(217,70,239,0.22),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.16),transparent_55%),radial-gradient(circle_at_50%_90%,rgba(34,211,238,0.12),transparent_55%)]" />
        </div>

        <div className="relative">
          {/* media */}
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.08]"
            />

            {/* cinematic overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent opacity-70 transition group-hover:opacity-85" />

            {/* shine sweep */}
            <div className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/2 rotate-12 bg-white/10 blur-xl opacity-0 transition duration-700 group-hover:opacity-100 group-hover:left-[120%]" />

            {/* top-right actions (reveal on hover) */}
            <div className="absolute right-3 top-3 flex gap-2 opacity-0 translate-y-1 transition group-hover:opacity-100 group-hover:translate-y-0">
              <a
                href={primaryHref}
                target="_blank"
                rel="noreferrer"
                aria-label={primaryLabel}
                className="grid h-10 w-10 place-items-center rounded-2xl border border-white/15 bg-black/35 backdrop-blur
                           transition hover:bg-black/55"
              >
                <ExternalLink className="h-5 w-5 text-white" />
              </a>

              {secondaryHref && (
                <a
                  href={secondaryHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={secondaryLabel || "Secondary link"}
                  className="grid h-10 w-10 place-items-center rounded-2xl border border-white/15 bg-black/35 backdrop-blur
                           transition hover:bg-black/55"
                >
                  <Github className="h-5 w-5 text-white" />
                </a>
              )}
            </div>

            {/* bottom title strip */}
            <div className="absolute bottom-3 left-3 right-3">
              <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="truncate text-base font-semibold text-white">{title}</h4>
                  <ArrowUpRight className="h-4 w-4 text-white/70 transition group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
                </div>
              </div>
            </div>
          </div>

          {/* content */}
          <div className="p-6">
            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {desc}
            </p>

            {/* tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.slice(0, 6).map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Magnetic>
                <a href={primaryHref} target="_blank" rel="noreferrer">
                  <Button>
                    <span className="mr-2 inline-flex">
                      <ExternalLink className="h-4 w-4" />
                    </span>
                    {primaryLabel}
                  </Button>
                </a>
              </Magnetic>

              {secondaryLabel && secondaryHref && (
                <Magnetic>
                  <a href={secondaryHref} target="_blank" rel="noreferrer">
                    <Button variant="soft">
                      <span className="mr-2 inline-flex">
                        <Github className="h-4 w-4" />
                      </span>
                      {secondaryLabel}
                    </Button>
                  </a>
                </Magnetic>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
