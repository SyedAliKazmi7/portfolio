"use client";

import { motion } from "motion/react";
import Icon from "./Icon";
import { EASE, FadeUp, TextReveal, spotMove } from "./Motion";
import { process, services } from "../lib/data";

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 border-y border-line bg-surface/40 py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <FadeUp>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">Services</p>
        </FadeUp>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
          <TextReveal text="What I can build for you." inView />
        </h2>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: (i % 2) * 0.12, ease: EASE }}
              whileHover={{ y: -6 }}
              onMouseMove={spotMove}
              className="card spot h-full rounded-3xl p-8"
            >
              <motion.span
                whileHover={{ rotate: [0, -12, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint/10 text-mint"
              >
                <Icon d={s.icon} />
              </motion.span>
              <h3 className="mt-5 font-display text-2xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted">{s.text}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2.5">
                    <span className="text-mint">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <FadeUp>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">How I work</p>
        </FadeUp>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
          <TextReveal text="A clear process, no surprises." inView />
        </h2>

        <div className="relative mt-14">
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.3, ease: EASE }}
            className="absolute left-[6%] right-[6%] top-6 hidden h-px origin-left bg-gradient-to-r from-mint/60 via-amber/60 to-mint/60 md:block"
          />
          <ol className="relative grid gap-10 md:grid-cols-4">
            {process.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: EASE }}
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.25 + i * 0.15 }}
                  className="bg-brand relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl font-display text-lg font-bold text-canvas"
                >
                  {i + 1}
                </motion.span>
                <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}