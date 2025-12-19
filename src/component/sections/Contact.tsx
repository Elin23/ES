import Container from "../layout/Container";
import Button from "../ui/Button";
import { profile } from "../../data/profile";
import { useMemo, useState } from "react";
import { Mail, MessageCircle, Linkedin, ArrowUpRight, Sparkles } from "lucide-react";
import SectionTitle from "../ui/SectionTiltle";

type Status = "idle" | "sending" | "ok" | "error";


function buildWhatsAppLink() {
    // profile.links.whatsapp يفضّل يكون: https://wa.me/9639xxxxxxx
    // مهم: wa.me لا يقبل 00 أو +
    const raw = profile.links.whatsapp.replace("https://wa.me/00963959902149", "").replace(/\D/g, "");
    const phone = raw.startsWith("00") ? raw.slice(2) : raw; // احتياط لو حاطة 00
    const text = encodeURIComponent("Hi Ellin, I found your portfolio and would love to connect.");
    return `https://wa.me/${phone}?text=${text}`;
}

function InfoLink({
    href,
    label,
    value,
    icon,
    external,
}: {
    href: string;
    label: string;
    value: string;
    icon: React.ReactNode;
    external?: boolean;
}) {
    return (
        <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-zinc-200/60 bg-white/60 p-4 backdrop-blur
                 transition hover:-translate-y-[2px] hover:shadow-lg hover:shadow-indigo-500/10
                 dark:border-white/10 dark:bg-white/5"
        >
            <div className="flex items-center gap-3 min-w-0">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-cyan-500 text-white">
                    {icon}
                </div>
                <div className="min-w-0">
                    <div className="text-xs text-zinc-600 dark:text-zinc-400">{label}</div>
                    <div className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">{value}</div>
                </div>
            </div>

            <ArrowUpRight className="h-4 w-4 text-zinc-500 transition group-hover:translate-x-[2px] group-hover:-translate-y-[2px] dark:text-zinc-400" />
        </a>
    );
}

export default function Contact() {
    const [status, setStatus] = useState<Status>("idle");
    const [note, setNote] = useState<{ type: "success" | "error"; text: string } | null>(null);


    const emailTo = useMemo(
        () => profile.links.email.replace("mailto:", ""),
        []
    );

    const waLink = useMemo(() => buildWhatsAppLink(), []);

    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        message?: string;
    }>({});

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const data = new FormData(form);

        // ✅ عرّفي القيم أولاً
        const name = String(data.get("name") || "").trim();
        const email = String(data.get("email") || "").trim();
        const message = String(data.get("message") || "").trim();

        // ✅ Validation مخصص
        const newErrors: typeof errors = {};

        if (!name) newErrors.name = "Name is required";
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!message) newErrors.message = "Message can’t be empty";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setStatus("idle");
            return;
        }

        setErrors({});
        setStatus("sending");
        setNote(null);

        try {
            const res = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, message }),
            });

            const json = await res.json();

            if (!res.ok) {
                const msg =
                    json?.errors?.[0]?.message ||
                    json?.error ||
                    "Couldn’t send your message. Please try again.";
                throw new Error(msg);
            }

            setStatus("ok");
            setNote({
                type: "success",
                text: "Message sent successfully. I’ll get back to you soon ✨",
            });
            form.reset();

            window.setTimeout(() => setNote(null), 5000);
        } catch (err) {
            setStatus("error");
            setNote({
                type: "error",
                text: err instanceof Error ? err.message : "Something went wrong. Please try again.",
            });
            window.setTimeout(() => setNote(null), 6000);
        }
    }



    return (
        <section id="contact" className="py-16">
            <Container>
                <SectionTitle
                    eyebrow="Contact"
                    title="Let’s build something exceptional."
                    subtitle="Send an email from the form, or reach out instantly via WhatsApp."
                />

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Form */}
                    <div className="group relative overflow-hidden rounded-3xl border border-zinc-200/60 bg-white/60 p-6 backdrop-blur dark:border-white/10 dark:bg-white/5">
                        {/* glow */}
                        <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                            <div className="absolute -inset-24 bg-[radial-gradient(circle_at_20%_20%,rgba(217,70,239,0.18),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.14),transparent_55%)]" />
                        </div>

                        <div className="relative">
                            <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                <Sparkles className="h-4 w-4 text-fuchsia-500" />
                                Send a message
                            </div>

                            <form onSubmit={onSubmit} noValidate className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {/* Name */}
                                    <div>
                                        <label className="text-xs text-zinc-600 dark:text-zinc-400">Name</label>
                                        <input
                                            name="name"
                                            placeholder="Your name"
                                            aria-invalid={!!errors.name}
                                            onChange={() => setErrors((e) => ({ ...e, name: undefined }))}
                                            className={`mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none transition
          ${errors.name
                                                    ? "border-rose-400/60 bg-rose-50/60 focus:ring-2 focus:ring-rose-400/30 dark:bg-rose-500/10"
                                                    : "border-zinc-200/60 bg-white/70 focus:ring-2 focus:ring-fuchsia-400/30 dark:bg-white/5 dark:border-white/10"
                                                }`}
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="text-xs text-zinc-600 dark:text-zinc-400">Email</label>
                                        <input
                                            name="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            aria-invalid={!!errors.email}
                                            onChange={() => setErrors((e) => ({ ...e, email: undefined }))}
                                            className={`mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none transition
          ${errors.email
                                                    ? "border-rose-400/60 bg-rose-50/60 focus:ring-2 focus:ring-rose-400/30 dark:bg-rose-500/10"
                                                    : "border-zinc-200/60 bg-white/70 focus:ring-2 focus:ring-indigo-400/30 dark:bg-white/5 dark:border-white/10"
                                                }`}
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="text-xs text-zinc-600 dark:text-zinc-400">Message</label>
                                    <textarea
                                        name="message"
                                        rows={6}
                                        placeholder="Tell me briefly about your project..."
                                        aria-invalid={!!errors.message}
                                        onChange={() => setErrors((e) => ({ ...e, message: undefined }))}
                                        className={`mt-2 w-full resize-none rounded-2xl border px-4 py-3 text-sm outline-none transition
        ${errors.message
                                                ? "border-rose-400/60 bg-rose-50/60 focus:ring-2 focus:ring-rose-400/30 dark:bg-rose-500/10"
                                                : "border-zinc-200/60 bg-white/70 focus:ring-2 focus:ring-cyan-400/30 dark:bg-white/5 dark:border-white/10"
                                            }`}
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                {/* Success / Error message (Formspree response) */}
                                {note && (
                                    <div
                                        className={[
                                            "rounded-2xl border p-4 text-sm backdrop-blur transition",
                                            note.type === "success"
                                                ? "border-emerald-200/60 bg-emerald-50/60 text-emerald-900 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-100"
                                                : "border-rose-200/60 bg-rose-50/60 text-rose-900 dark:border-rose-400/20 dark:bg-rose-500/10 dark:text-rose-100",
                                        ].join(" ")}
                                    >
                                        <div className="flex items-start gap-3">
                                            <span
                                                className={[
                                                    "mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-2xl text-white",
                                                    note.type === "success"
                                                        ? "bg-gradient-to-br from-emerald-500 to-cyan-500"
                                                        : "bg-gradient-to-br from-rose-500 to-fuchsia-500",
                                                ].join(" ")}
                                            >
                                                {note.type === "success" ? "✓" : "!"}
                                            </span>

                                            <div className="min-w-0">
                                                <div className="font-semibold">
                                                    {note.type === "success" ? "Success" : "Couldn’t send"}
                                                </div>
                                                <div className="mt-1 text-xs opacity-90">{note.text}</div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => setNote(null)}
                                                className="ml-auto rounded-xl px-2 py-1 text-xs text-zinc-700 hover:bg-white/60
                     dark:text-zinc-200 dark:hover:bg-white/10"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex flex-wrap items-center gap-3 pt-1">
                                    <Button type="submit" disabled={status === "sending"}>
                                        {status === "sending" ? "Sending..." : "Send Message"}
                                    </Button>

                                    <a href={waLink} target="_blank" rel="noreferrer">
                                        <Button type="button" variant="soft">
                                            <span className="mr-2 inline-flex">
                                                <MessageCircle className="h-4 w-4" />
                                            </span>
                                            WhatsApp
                                        </Button>
                                    </a>

                                    {status === "ok" && (
                                        <span className="text-xs text-zinc-600 dark:text-zinc-400">
                                            Sent successfully ✅
                                        </span>
                                    )}
                                </div>
                            </form>

                        </div>
                    </div>

                    {/* Info */}
                    <div className="rounded-3xl border border-zinc-200/60 bg-white/60 p-6 backdrop-blur dark:border-white/10 dark:bg-white/5">
                        <div className="mb-5 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                            Direct contact
                        </div>

                        <div className="space-y-3">
                            <InfoLink
                                href={profile.links.email}
                                label="Email"
                                value={emailTo}
                                icon={<Mail className="h-5 w-5" />}
                            />

                            <InfoLink
                                href={waLink}
                                label="WhatsApp"
                                value="Start a chat"
                                icon={<MessageCircle className="h-5 w-5" />}
                                external
                            />

                            <InfoLink
                                href={profile.links.linkedin}
                                label="LinkedIn"
                                value="Connect with me"
                                icon={<Linkedin className="h-5 w-5" />}
                                external
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );


}
