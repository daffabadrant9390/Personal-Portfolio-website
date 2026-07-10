"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Mail, MapPin, Send, ExternalLink, CheckCircle, AlertCircle,
} from "lucide-react";
import { WhatsappIcon } from "@/components/shared/BrandIcons";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Container } from "@/components/shared/Container";
import { ErrorFeedback } from "@/components/shared/ErrorFeedback";
import { useContactStore } from "@/lib/store/useContactStore";

/* ─────────────────────────────────────────────────────────
   CONSTANTS — update these with your real details
───────────────────────────────────────────────────────── */
const MY_EMAIL     = "daffabadrant@gmail.com";
const MY_WA_NUMBER = "6281271363702"; // country code, no +

const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/Jakarta,+Indonesia";

/* ─────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────── */

function FormField({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest
                   text-muted-foreground font-mono"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-[10px] text-red-500 dark:text-red-400">
          <AlertCircle size={10} /> {error}
        </p>
      )}
    </div>
  );
}

const inputBase =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground " +
  "placeholder:text-muted-foreground/60 outline-none transition-all " +
  "focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 " +
  "focus:ring-blue-500/15 dark:focus:ring-blue-500/20";

/* ─────────────────────────────────────────────────────────
   Main page
───────────────────────────────────────────────────────── */
export default function ContactPage() {
  const {
    name, email, subject, message, status, errors,
    setField, setStatus, validate, reset,
  } = useContactStore();

  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  const [showErrors, setShowErrors] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const handleWhatsApp = () => {
    const text = [
      "Hi Daffa, I found you on your portfolio!",
      "",
      `Name: ${name || ""}`,
      `Email: ${email || ""}`,
      `Message: ${message || ""}`,
    ].join("\n");
    window.open(`https://wa.me/${MY_WA_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setShowErrors(true);
      return;
    }

    setStatus("submitting");

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject || "(no subject)"}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const mailto =
      `mailto:${MY_EMAIL}` +
      `?subject=${encodeURIComponent(subject || `Portfolio contact from ${name}`)}` +
      `&body=${encodeURIComponent(body)}`;

    window.open(mailto, "_blank");
    setTimeout(() => { setStatus("success"); }, 600);
  };

  return (
    <main className="min-h-screen bg-background">

      {/* ── Hero Banner ─────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-background overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

        {/* Subtle ambient glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                        h-[400px] w-[600px] rounded-full
                        bg-blue-100/40 dark:bg-blue-900/8 blur-[120px] pointer-events-none" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest
                             text-blue-600 dark:text-blue-400 mb-4 block font-mono">
              {/* // Contact */}
            </span>
            <h1 className="font-heading font-bold leading-[1.1] tracking-tight text-foreground
                           text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              Let&apos;s build something
              <br />
              <span className="gradient-text">great together.</span>
            </h1>
            <p className="mt-4 md:mt-6 max-w-lg text-sm sm:text-base md:text-lg
                          leading-relaxed text-muted-foreground">
              Open to freelance projects, collaborations, or just a technical conversation.
              I respond within 24 hours.
            </p>
          </motion.div>
        </Container>

        <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
      </section>

      {/* ── Contact Method Cards ─────────────────────────── */}
      <section className="pt-16 pb-8 md:pt-20 md:pb-10 bg-background">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* Email */}
            <AnimatedSection delay={0}>
              <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 flex flex-col gap-4
                              hover:border-blue-300 dark:hover:border-blue-700
                              hover:shadow-sm transition-all h-full">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center
                                bg-blue-100 dark:bg-blue-950/50
                                text-blue-600 dark:text-blue-400 shrink-0">
                  <Mail size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-widest font-semibold
                                text-muted-foreground mb-1">Email</p>
                  <p className="text-sm font-medium text-foreground break-all">{MY_EMAIL}</p>
                  <p className="text-xs text-muted-foreground mt-1">Best for detailed inquiries</p>
                </div>
                <a
                  href={`mailto:${MY_EMAIL}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold
                             text-blue-600 dark:text-blue-400
                             hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                >
                  Send Email <ExternalLink size={11} />
                </a>
              </div>
            </AnimatedSection>

            {/* WhatsApp */}
            <AnimatedSection delay={0.07}>
              <div
                role="button"
                tabIndex={0}
                onClick={handleWhatsApp}
                onKeyDown={(e) => e.key === "Enter" && handleWhatsApp()}
                className="rounded-2xl border border-border bg-card p-5 sm:p-6 flex flex-col gap-4
                           hover:border-emerald-300 dark:hover:border-emerald-700/50
                           hover:shadow-sm transition-all cursor-pointer h-full"
              >
                <div className="h-10 w-10 rounded-xl flex items-center justify-center
                                bg-emerald-100 dark:bg-emerald-950/50
                                text-emerald-600 dark:text-emerald-400 shrink-0">
                  <WhatsappIcon size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-widest font-semibold
                                text-muted-foreground mb-1">WhatsApp</p>
                  <p className="text-sm font-medium text-foreground">+62 812-XXXX-XXXX</p>
                  <p className="text-xs text-muted-foreground mt-1">Quick replies · usually &lt; 1 hour</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold
                                 text-emerald-600 dark:text-emerald-400
                                 hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors">
                  Chat Now <ExternalLink size={11} />
                </span>
              </div>
            </AnimatedSection>

            {/* Location + Map */}
            <AnimatedSection delay={0.14}>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col
                           hover:border-slate-300 dark:hover:border-slate-600
                           hover:shadow-sm transition-all group h-full"
              >
                {/* Mini map preview */}
                <div className="relative h-28 bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0">
                  {mounted && (
                    <Image
                      src={theme === "dark" ? "/jakarta-map-dark.png" : "/jakarta-map-light.png"}
                      alt="Jakarta, Indonesia map"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center
                                  bg-black/0 group-hover:bg-black/25 transition-all duration-300">
                    <span className="flex items-center gap-1.5 rounded-full px-2.5 py-1
                                     bg-white dark:bg-background text-foreground
                                     text-[10px] font-medium shadow-md
                                     translate-y-1 opacity-0 group-hover:translate-y-0
                                     group-hover:opacity-100 transition-all duration-300">
                      <ExternalLink size={10} />
                      Open in Maps
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex flex-col gap-1 flex-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-blue-600 dark:text-blue-400 shrink-0" />
                    <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">
                      Location
                    </p>
                  </div>
                  <p className="text-sm font-medium text-foreground">Jakarta, Indonesia</p>
                  <p className="text-xs text-muted-foreground mt-0.5">GMT+7 · WIB timezone</p>
                </div>
              </a>
            </AnimatedSection>

          </div>
        </Container>
      </section>

      {/* ── Contact Form (full-width) ────────────────────── */}
      <section className="pb-24 bg-background">
        <Container>
          <AnimatedSection delay={0.1}>
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 md:p-10">

              {/* Form header */}
              <div className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-widest
                                 text-blue-600 dark:text-blue-400 font-mono mb-2 block">
                  {/* // Initialize Connection */}
                </span>
                <h2 className="font-heading font-bold text-foreground
                               text-xl sm:text-2xl md:text-3xl">
                  Send a Message
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground max-w-xl">
                  Fill in the form and I&apos;ll get back to you within 24 hours.
                  Prefer faster? Use the WhatsApp button below.
                </p>
              </div>

              <div className="h-px bg-border mb-8" />

              {/* Success state */}
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-20 text-center"
                >
                  <div className="h-16 w-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40
                                  border border-emerald-200 dark:border-emerald-800/40
                                  flex items-center justify-center">
                    <CheckCircle size={32} className="text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-foreground">
                      Message Sent!
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Your email client should have opened. I&apos;ll reply soon.
                    </p>
                  </div>
                  <button
                    onClick={reset}
                    className="text-sm text-blue-600 dark:text-blue-400
                               hover:text-blue-500 dark:hover:text-blue-300
                               transition-colors font-medium"
                  >
                    Send another message →
                  </button>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate>

                  {/* Two-column layout: fields | message */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

                    {/* Left: Name / Email / Subject */}
                    <div className="space-y-5">
                      <FormField label="Name" id="name" error={errors.name}>
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setField("name", e.target.value)}
                          placeholder="Your full name"
                          className={inputBase}
                          autoComplete="name"
                        />
                      </FormField>

                      <FormField label="Email" id="email" error={errors.email}>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setField("email", e.target.value)}
                          placeholder="your@email.com"
                          className={inputBase}
                          autoComplete="email"
                        />
                      </FormField>

                      <FormField label="Subject" id="subject" error={errors.subject}>
                        <input
                          id="subject"
                          type="text"
                          value={subject}
                          onChange={(e) => setField("subject", e.target.value)}
                          placeholder="What's this about?"
                          className={inputBase}
                        />
                      </FormField>
                    </div>

                    {/* Right: Message */}
                    <FormField label="Message" id="message" error={errors.message}>
                      <textarea
                        id="message"
                        rows={9}
                        value={message}
                        onChange={(e) => setField("message", e.target.value)}
                        placeholder="Describe your project, idea, or question..."
                        className={`${inputBase} resize-none`}
                      />
                    </FormField>

                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center gap-3
                                  mt-8 pt-6 border-t border-border">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2
                                 rounded-xl bg-blue-700 hover:bg-blue-600
                                 px-8 py-3 text-sm font-semibold text-white
                                 shadow-md shadow-blue-700/20
                                 disabled:opacity-60 disabled:cursor-not-allowed
                                 transition-all"
                    >
                      {status === "submitting" ? (
                        <>
                          <span className="h-4 w-4 rounded-full border-2 border-white/30
                                           border-t-white animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          Send Message
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2
                                 rounded-xl px-8 py-3 text-sm font-semibold
                                 border border-emerald-400/40 dark:border-emerald-600/30
                                 bg-emerald-50/60 dark:bg-emerald-950/20
                                 text-emerald-700 dark:text-emerald-400
                                 hover:bg-emerald-100 dark:hover:bg-emerald-950/40
                                 hover:border-emerald-400 dark:hover:border-emerald-600/50
                                 transition-all"
                    >
                      <WhatsappIcon size={15} />
                      WhatsApp Instead
                    </button>

                    <p className="sm:ml-auto text-[10px] text-muted-foreground/50 text-center sm:text-right">
                      &quot;Send Message&quot; opens your email client with the form pre-filled.
                    </p>
                  </div>

                </form>
              )}
            </div>
          </AnimatedSection>
        </Container>
      </section>

      <ErrorFeedback
        open={showErrors}
        errors={Object.values(errors).filter((e): e is string => !!e)}
        onClose={() => setShowErrors(false)}
      />

    </main>
  );
}
