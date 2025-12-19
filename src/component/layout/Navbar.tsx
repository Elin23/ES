import { useState } from "react";
import { profile } from "../../data/profile";
import { motion, AnimatePresence } from "motion/react";
import Button from "../ui/Button";
import { Menu, X, Download } from "lucide-react";
import ThemeSwitch from "../ui/ThemeSwitch";

const links = [
    { href: "#projects-web", label: "Web" },
    { href: "#projects-uiux", label: "UI/UX" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
];

// ✅ Smooth scroll with offset for sticky navbar
function scrollToId(href: string) {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;

    const offset = 90;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top: y, behavior: "smooth" });
}

// ✅ Initials placeholder (clean & professional)
function InitialsBadge({ name }: { name: string }) {
    const initials = name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase())
        .join("");

    return (
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-cyan-500 p-[1px] transition group-hover:scale-[1.05]">
            <div className="grid h-full w-full place-items-center rounded-xl bg-white/80 text-xs font-semibold text-zinc-900 backdrop-blur dark:bg-[#070712] dark:text-zinc-100">
                {initials}
            </div>
        </div>
    );
}

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/60 backdrop-blur dark:border-white/10 dark:bg-black/20">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                {/* Logo */}
                <a
                    href="#top"
                    className="group flex items-center gap-2 transition hover:opacity-95"
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                >
                    <InitialsBadge name={profile.name} />
                    <div>
                        <div className="text-sm font-semibold leading-4">{profile.name}</div>
                        <div className="text-xs text-zinc-600 dark:text-zinc-400">
                            {profile.title}
                        </div>
                    </div>
                </a>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-6 md:flex">
                    {links.map((l) => (
                        <button
                            key={l.href}
                            onClick={() => scrollToId(l.href)}
                            className="group relative text-sm text-zinc-700 transition hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                        >
                            <span className="relative z-10">{l.label}</span>
                            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-500 transition-all duration-300 group-hover:w-full" />
                        </button>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <div className="hidden md:block">
                        <ThemeSwitch />
                    </div>

                    <a className="hidden md:inline-flex" download href={profile.links.cv}>
                        <Button>
                            <span className="mr-2 inline-flex">
                                <Download className="h-4 w-4" />
                            </span>
                            Download CV
                        </Button>
                    </a>

                    {/* Mobile menu button */}
                    <Button
                        variant="soft"
                        className="md:hidden"
                        onClick={() => setOpen(true)}
                        ariaLabel="Open menu"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Mobile drawer */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
                        onClick={() => setOpen(false)}
                    >
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 30, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 24 }}
                            className="absolute left-3 right-3 top-3 rounded-3xl border border-white/10 bg-[#0b0b16]/95 p-4 text-zinc-100"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between">
                                <div className="text-sm font-semibold">Navigation</div>
                                <Button
                                    variant="ghost"
                                    onClick={() => setOpen(false)}
                                    ariaLabel="Close menu"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>

                            <div className="mt-3 grid gap-2">
                                {links.map((l) => (
                                    <button
                                        key={l.href}
                                        onClick={() => {
                                            setOpen(false);
                                            setTimeout(() => scrollToId(l.href), 80);
                                        }}
                                        className="text-left rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:bg-white/10 hover:-translate-y-[1px]"
                                    >
                                        {l.label}
                                    </button>
                                ))}

                                <a
                                    href={profile.links.cv}
                                    download
                                    className="mt-1"
                                >
                                    <Button className="w-full">
                                        <span className="mr-2 inline-flex">
                                            <Download className="h-4 w-4" />
                                        </span>
                                        Download CV
                                    </Button>
                                </a>

                                <div className="mt-1 rounded-2xl border border-white/10 bg-white/5 p-3 flex justify-center">
                                    <ThemeSwitch />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
