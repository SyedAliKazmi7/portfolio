"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ProfilePhoto from "./ProfilePhoto";
import { profile, rotatingWords } from "../lib/data";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % rotatingWords.length), 2400);
    return () => clearInterval(t);
  }, []);

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      style={{ "--mx": "50%", "--my": "30%" } as React.CSSProperties}
      className="relative overflow-hidden pt-[72px]"
    >
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div className="blob absolute -left-24 top-20 h-[380px] w-[380px] rounded-full bg-mint/20 blur-[110px]" aria-hidden="true" />
      <div className="blob absolute -right-24 top-40 h-[340px] w-[340px] rounded-full bg-amber/15 blur-[110px]" style={{ animationDelay: "-9s" }} aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(600px circle at var(--mx) var(--my), rgba(62,224,176,0.10), transparent 60%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-5 pb-24 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          {profile.available && (
            <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-4 py-2 text-sm text-muted backdrop-blur">
              <span className="pulse-dot h-2.5 w-2.5 rounded-full bg-mint" />
              Available for new projects
            </span>
          )}

          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            I build
            <span key={i} className="word-in text-gradient block">
              {rotatingWords[i]}
            </span>
            that run real businesses.
          </h1>

          <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-muted">{profile.intro}</p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/#projects"
              className="bg-brand rounded-full px-7 py-3.5 font-bold text-canvas transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(62,224,176,0.7)]"
            >
              View my work
            </Link>
            <Link
              href="/#contact"
              className="rounded-full border border-line px-7 py-3.5 font-bold transition hover:border-mint hover:text-mint"
            >
              Let&apos;s talk
            </Link>
            {profile.resume && (
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-5 py-3.5 font-bold text-muted transition hover:text-ink"
              >
                Download CV &darr;
              </a>
            )}
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-2 text-sm text-muted">
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="transition hover:text-mint">GitHub</a>
            </li>
            {profile.linkedin && (
              <li>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="transition hover:text-mint">LinkedIn</a>
              </li>
            )}
            <li>
              <a href={`mailto:${profile.email}`} className="transition hover:text-mint">{profile.email}</a>
            </li>
          </ul>
        </div>

        {/* Photo with floating cards */}
        <div className="relative mx-auto h-[400px] w-full max-w-[340px] lg:h-[470px] lg:max-w-none">
          <ProfilePhoto className="absolute left-1/2 top-0 h-[370px] w-[280px] -translate-x-1/2 lg:left-[14%] lg:h-[420px] lg:w-[300px] lg:translate-x-0" />

          <div className="float-a absolute -left-2 bottom-4 hidden w-[215px] rounded-2xl border border-line bg-surface/90 p-4 shadow-2xl backdrop-blur sm:block lg:-left-6" aria-hidden="true">
            <div className="flex items-center gap-2 text-xs text-muted">
              <span className="pulse-dot h-2 w-2 rounded-full bg-mint" /> Live
            </div>
            <p className="mt-1.5 font-display text-lg font-semibold">Karigar</p>
            <p className="text-xs text-muted">Marketplace with real-time offers</p>
          </div>

          <div className="float-b absolute -right-2 top-[44%] hidden w-[200px] rounded-2xl border border-line bg-surface/90 p-4 shadow-2xl backdrop-blur sm:block lg:-right-4" aria-hidden="true">
            <p className="text-xs uppercase tracking-wider text-muted">Stack</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {["Next.js", "TypeScript", "Supabase", "Tailwind"].map((t) => (
                <span key={t} className="rounded-full border border-line px-2.5 py-1 text-[11px]">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}