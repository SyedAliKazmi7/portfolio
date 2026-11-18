"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { EASE, FadeUp, TextReveal, spotMove } from "./Motion";
import { pricing } from "../lib/data";

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => Math.round(v).toLocaleString("en-US"));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration: 1.5, ease: EASE });
    return () => controls.stop();
  }, [inView, mv, value]);

  return <motion.span ref={ref}>{text}</motion.span>;
}

function pick(name: string) {
  window.dispatchEvent(new CustomEvent("select-package", { detail: name }));
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <FadeUp>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">Pricing</p>
        </FadeUp>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
          <TextReveal text="Simple packages, clear prices." inView />
        </h2>
        <FadeUp delay={0.1}>
          <p className="mt-4 max-w-2xl text-lg text-muted">{pricing.intro}</p>
        </FadeUp>

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-3">
          {pricing.plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: i * 0.12, ease: EASE }}
              className={`h-full ${
                p.popular ? "bg-brand rounded-[1.7rem] p-[1.5px] shadow-[0_30px_80px_-30px_rgba(62,224,176,0.5)]" : ""
              }`}
            >
              <div
                onMouseMove={spotMove}
                style={p.popular ? { borderColor: "transparent" } : undefined}
                className="card spot relative flex h-full flex-col rounded-3xl p-8"
              >
                {p.popular && (
                  <span className="bg-brand absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1 text-xs font-bold text-canvas">
                    Most popular
                  </span>
                )}

                <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
                <p className="mt-2 min-h-[48px] text-muted">{p.tagline}</p>

                <p className="mt-6 text-xs font-bold uppercase tracking-wider text-muted">
                  {p.from ? "Starting at" : "Price"}
                </p>
                <p className="mt-1 flex items-baseline gap-2 font-display">
                  <span className="text-lg font-semibold text-muted">PKR</span>
                  <span className="text-5xl font-bold">
                    <CountUp value={p.price} />
                  </span>
                </p>

                <ul className="mt-7 space-y-3 text-[15px]">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span className="mt-0.5 text-mint" aria-hidden="true">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => pick(p.name)}
                  className={`mt-auto w-full rounded-full px-6 py-3.5 font-bold transition hover:-translate-y-0.5 ${
                    p.popular
                      ? "bg-brand text-canvas hover:shadow-[0_14px_40px_-12px_rgba(62,224,176,0.7)]"
                      : "border border-line hover:border-mint hover:text-mint"
                  }`}
                  style={{ marginTop: "2rem" }}
                >
                  {p.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <FadeUp delay={0.1}>
          <div className="card mt-8 flex flex-col items-start justify-between gap-6 rounded-3xl p-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <h3 className="font-display text-2xl font-semibold">{pricing.custom.title}</h3>
              <p className="mt-2 text-muted">{pricing.custom.text}</p>
            </div>
            <button
              type="button"
              onClick={() => pick("custom quote")}
              className="bg-brand shrink-0 rounded-full px-7 py-3.5 font-bold text-canvas transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(62,224,176,0.7)]"
            >
              {pricing.custom.cta}
            </button>
          </div>
          <p className="mt-6 text-center text-sm text-muted">{pricing.note}</p>
        </FadeUp>
      </div>
    </section>
  );
}