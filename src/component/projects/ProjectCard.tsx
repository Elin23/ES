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
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -4 }}
      className="min-w-0 h-full"
    >
      <Card className="group relative w-full max-w-[340px] overflow-hidden rounded-3xl border border-zinc-200/70 bg-white shadow-sm transition hover:shadow-lg dark:border-white/10 dark:bg-zinc-950">
        {/* Cover */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-90" />

          {/* quick actions */}
          <div className="absolute right-3 top-3 flex gap-2">
            <a
              href={primaryHref}
              target="_blank"
              rel="noreferrer"
              aria-label={primaryLabel}
              className="grid h-9 w-9 place-items-center rounded-2xl border border-white/15 bg-black/35 backdrop-blur transition hover:bg-black/55"
            >
              <ExternalLink className="h-4 w-4 text-white" />
            </a>

            {secondaryHref && (
              <a
                href={secondaryHref}
                target="_blank"
                rel="noreferrer"
                aria-label={secondaryLabel || "GitHub"}
                className="grid h-9 w-9 place-items-center rounded-2xl border border-white/15 bg-black/35 backdrop-blur transition hover:bg-black/55"
              >
                <Github className="h-4 w-4 text-white" />
              </a>
            )}
          </div>

          {/* title */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center justify-between gap-2 rounded-2xl border border-white/10 bg-black/35 px-3 py-2 backdrop-blur">
              <h4 className="truncate text-sm font-semibold text-white">
                {title}
              </h4>
              <ArrowUpRight className="h-4 w-4 text-white/75 transition group-hover:-translate-y-[1px] group-hover:translate-x-[1px]" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-sm leading-relaxed text-zinc-700 line-clamp-2 dark:text-zinc-300">
            {desc}
          </p>

          {/* tags (single-line, scrollable) */}
          <div className="mt-3 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tags.slice(0, 8).map((t) => (
              <div key={t} className="shrink-0">
                <Tag>{t}</Tag>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Magnetic>
              <a href={primaryHref} target="_blank" rel="noreferrer">
                <Button className="h-10 px-4 text-sm">
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
                  <Button variant="soft" className="h-10 px-4 text-sm">
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

        {/* subtle hover ring */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent transition group-hover:ring-zinc-900/10 dark:group-hover:ring-white/10" />
      </Card>
    </motion.div>
  );
}
