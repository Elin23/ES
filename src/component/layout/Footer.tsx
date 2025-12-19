import Container from "./Container";
import { profile } from "../../data/profile";
import { Github, Linkedin, Dribbble, ArrowUpRight } from "lucide-react";

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="group inline-flex h-10 w-10 items-center justify-center rounded-2xl
                 border border-zinc-200/60 bg-white/60 backdrop-blur
                 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/15
                 dark:border-white/10 dark:bg-white/5"
    >
      <span className="text-zinc-700 transition group-hover:text-zinc-900 dark:text-zinc-300 dark:group-hover:text-white">
        {children}
      </span>
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-200/60 py-10 dark:border-white/10">
      <Container>
        <div className="grid gap-6 md:grid-cols-3 md:items-center">
          {/* left */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-cyan-500 p-[1px]">
                <div className="grid h-full w-full place-items-center rounded-2xl bg-white/70 text-xs font-semibold text-zinc-900 backdrop-blur dark:bg-[#070712] dark:text-zinc-100">
                  {profile.name
                    .split(" ")
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((w) => w[0]?.toUpperCase())
                    .join("")}
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {profile.name}
                </div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">
                  {profile.title}
                </div>
              </div>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
          </div>

          {/* center */}
          <div className="flex flex-wrap items-center gap-3 md:justify-center">
            <SocialIcon href={profile.links.github} label="GitHub">
              <Github className="h-5 w-5" />
            </SocialIcon>

            <SocialIcon href={profile.links.linkedin} label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </SocialIcon>

            <SocialIcon href={profile.links.dribbble} label="Dribbble">
              <Dribbble className="h-5 w-5" />
            </SocialIcon>
          </div>

          {/* right */}
          <div className="flex items-center justify-between md:justify-end gap-3">
            <a
              href={profile.links.email}
              className="group inline-flex items-center gap-2 rounded-2xl
                         border border-zinc-200/60 bg-white/60 px-4 py-2 text-sm
                         text-zinc-700 backdrop-blur transition
                         hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/15
                         dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
            >
              Contact
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
            </a>

            
          </div>
        </div>

        {/* subtle bottom glow line */}
        <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-zinc-300/60 to-transparent dark:via-white/10" />
      </Container>
    </footer>
  );
}
