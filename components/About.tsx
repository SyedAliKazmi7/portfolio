"use client";

import { motion } from "motion/react";
import { FadeUp, TextReveal, rise, spotMove, stagger } from "./Motion";
import { facts, principles, profile, skills } from "../lib/data";

const view = { once: true, margin: "-60px" } as const;

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <FadeUp>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">About</p>
        </FadeUp>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
          <TextReveal text="Full-stack, from the database to the design." inView />
        </h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <FadeUp>
            <div className="space-y-5 text-lg leading-relaxed text-muted">
              {profile.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <motion.dl
              variants={stagger(0.1, 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={view}
              className="mt-8 grid gap-4 sm:grid-cols-3"
            >
              {facts.map((f) => (
                <motion.div key={f.label} variants={rise} className="rounded-2xl border border-line bg-surface p-4">
                  <dt className="text-xs uppercase tracking-wider text-muted">{f.label}</dt>
                  <dd className="mt-1 font-semibold">{f.value}</dd>
                </motion.div>
              ))}
            </motion.dl>
          </FadeUp>

          <FadeUp delay={0.12}>
            <div className="space-y-6">
              {skills.map((g) => (
                <div key={g.group}>
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted">{g.group}</h3>
                  <motion.ul
                    variants={stagger(0.045, 0.1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={view}
                    className="flex flex-wrap gap-2.5"
                  >
                    {g.items.map((s) => (
                      <motion.li
                        key={s}
                        variants={rise}
                        whileHover={{ y: -3, scale: 1.04 }}
                        className="rounded-full border border-line bg-surface px-4 py-2 text-sm transition-colors hover:border-mint hover:text-mint"
                      >
                        {s}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={view}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              onMouseMove={spotMove}
              className="card spot h-full rounded-3xl p-7"
            >
              <h3 className="font-display text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}