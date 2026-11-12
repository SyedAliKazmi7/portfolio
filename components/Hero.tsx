"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import ProfilePhoto from "./ProfilePhoto";
import { EASE, Magnetic, TextReveal, rise, stagger } from "./Motion";
import { profile, rotatingWords } from "../lib/data";

// The giant words behind the photo. Change them if you like.
const BIG = ["FULL-STACK", "DEVELOPER"];

function BigLine({ text, outline = false, delay = 0 }: { text: string; outline?: boolean; delay?: number }) {
  return (
    <span className="block overflow-hidden whitespace-nowrap pb-[0.06em] leading-[0.92]">
      <motion.span
        className={`block ${outline ? "text-outline" : "text-gradient"}`}
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textX = useTransform(smx, [-0.5, 0.5], [26, -26]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % rotatingWords.length), 2600);
    return () => clearInterval(t);
  }, []);

  function onMove(e: React.PointerEvent<HTMLElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
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

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="relative grid lg:min-h-[calc(100svh-72px)] lg:grid-cols-[1fr_minmax(380px,540px)_1fr] lg:items-end lg:gap-4">
          {/* Giant text behind the person */}
          <motion.div
            aria-hidden="true"
            style={{ x: textX, y: textY, opacity: fadeOut }}
            className="pointer-events-none absolute inset-x-0 top-[1%] z-0 select-none text-center font-display text-[clamp(2.9rem,13vw,10.5rem)] font-bold tracking-tighter lg:top-[3%]"
          >
            <BigLine text={BIG[0]} delay={0.2} />
            <BigLine text={BIG[1]} outline delay={0.4} />
          </motion.div>

          {/* Photo (the person stands in front of the text) */}
          <div className="relative z-10 order-1 h-[440px] sm:h-[560px] lg:order-2 lg:h-[calc(100svh-72px)] lg:max-h-[820px] lg:min-h-[560px]">
            <ProfilePhoto mx={mx} my={my} />
          </div>

          {/* Left: intro, at the bottom so it never touches the big words */}
          <motion.div
            variants={stagger(0.1, 0.5)}
            initial="hidden"
            animate="show"
            className="relative z-20 order-2 pb-12 pt-4 lg:order-1 lg:self-end lg:pb-16 lg:pt-0"
          >
            {profile.available && (
              <motion.span
                variants={rise}
                className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-4 py-2 text-sm text-muted backdrop-blur"
              >
                <span className="pulse-dot h-2.5 w-2.5 rounded-full bg-mint" />
                Available for new projects
              </motion.span>
            )}

            <h1 className="mt-4 font-display text-[1.9rem] font-bold leading-[1.12] tracking-tight sm:text-4xl xl:text-[2.2rem]">
              <TextReveal text="I build" delay={0.7} />
              <span className="relative block h-[1.3em] overflow-hidden whitespace-nowrap">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={i}
                    className="text-gradient absolute left-0 top-0 block leading-[1.25]"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    {rotatingWords[i]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <TextReveal text="that run real businesses." delay={0.9} />
            </h1>

            <motion.p variants={rise} className="mt-4 max-w-[400px] text-base leading-relaxed text-muted">
              {profile.intro}
            </motion.p>

            <motion.div variants={rise} className="mt-6 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Link
                  href="/#projects"
                  className="bg-brand inline-block rounded-full px-7 py-3.5 font-bold text-canvas transition hover:shadow-[0_14px_40px_-12px_rgba(62,224,176,0.7)]"
                >
                  View my work
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/#contact"
                  className="inline-block rounded-full border border-line px-7 py-3.5 font-bold transition hover:border-mint hover:text-mint"
                >
                  Let&apos;s talk
                </Link>
              </Magnetic>
              {profile.resume && (
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-u px-2 py-3.5 font-bold text-muted transition hover:text-ink"
                >
                  Download CV &darr;
                </a>
              )}
            </motion.div>

            <motion.ul variants={rise} className="mt-6 flex flex-wrap gap-x-7 gap-y-2 text-sm text-muted">
              <li>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-u transition hover:text-mint">GitHub</a>
              </li>
              {profile.linkedin && (
                <li>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="link-u transition hover:text-mint">LinkedIn</a>
                </li>
              )}
              <li>
                <a href={`mailto:${profile.email}`} className="link-u transition hover:text-mint">{profile.email}</a>
              </li>
            </motion.ul>
          </motion.div>

          {/* Right: floating cards (large screens) */}
          <div className="relative z-20 order-3 hidden flex-col items-end gap-4 pb-16 lg:flex lg:self-end" aria-hidden="true">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
              transition={{
                opacity: { duration: 0.8, delay: 1 },
                x: { duration: 0.8, delay: 1, ease: EASE },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.8 },
              }}
              className="w-[230px] rounded-2xl border border-line bg-surface/90 p-4 shadow-2xl backdrop-blur"
            >
              <p className="flex items-center gap-2 text-xs text-muted">
                <span className="pulse-dot h-2 w-2 rounded-full bg-mint" /> Latest
              </p>
              <p className="mt-1.5 font-display text-lg font-semibold">Karigar</p>
              <p className="text-xs text-muted">Live marketplace with real-time offers</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0, y: [0, 10, 0] }}
              transition={{
                opacity: { duration: 0.8, delay: 1.2 },
                x: { duration: 0.8, delay: 1.2, ease: EASE },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 },
              }}
              className="w-[230px] rounded-2xl border border-line bg-surface/90 p-4 shadow-2xl backdrop-blur"
            >
              <p className="text-xs uppercase tracking-wider text-muted">Stack</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {["Next.js", "TypeScript", "Supabase", "Tailwind"].map((t) => (
                  <span key={t} className="rounded-full border border-line px-2.5 py-1 text-[11px]">{t}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Soft edge at the bottom of the hero */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-canvas to-transparent" aria-hidden="true" />
    </section>
  );
}