"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import Laptop from "./Laptop";
import { EASE, FadeUp, TextReveal, Tilt, rise, spotMove, stagger } from "./Motion";
import { fetchProjects } from "../lib/projects";
import type { Project } from "../lib/data";

export default function Projects() {
  const [items, setItems] = useState<Project[] | null>(null);

  useEffect(() => {
    let on = true;
    fetchProjects().then((p) => {
      if (on) setItems(p);
    });
    return () => {
      on = false;
    };
  }, []);

  return (
    <section id="projects" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <FadeUp>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">Selected work</p>
        </FadeUp>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
          <TextReveal text="Projects I am proud of." inView />
        </h2>

        <div className="mt-14 space-y-10">
          {items === null && (
            <>
              <div className="skeleton h-[420px] rounded-3xl border border-line" role="status" aria-label="Loading projects" />
              <div className="skeleton h-[420px] rounded-3xl border border-line" />
            </>
          )}

          {items?.map((p, idx) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.85, ease: EASE }}
              onMouseMove={spotMove}
              className="card spot group grid overflow-hidden rounded-3xl lg:grid-cols-2"
            >
              <Link
                href={`/projects/${p.slug}`}
                aria-label={`${p.title} case study`}
                className={`flex items-center bg-gradient-to-br from-surface-2 via-surface to-canvas p-7 sm:p-12 ${
                  idx % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Tilt max={7} className="w-full">
                  <Laptop src={p.cover} alt={`${p.title} screenshot`} title={p.title} />
                </Tilt>
              </Link>

              <motion.div
                variants={stagger(0.09, 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="flex flex-col justify-center p-7 sm:p-10"
              >
                <motion.span
                  variants={rise}
                  className="w-fit rounded-full border border-line px-3 py-1 text-xs font-bold text-mint"
                >
                  {p.type}
                  {p.year ? ` · ${p.year}` : ""}
                </motion.span>
                <motion.h3 variants={rise} className="mt-4 font-display text-3xl font-bold">{p.title}</motion.h3>
                <motion.p variants={rise} className="mt-2 text-lg text-ink/90">{p.tagline}</motion.p>
                <motion.p variants={rise} className="mt-3 line-clamp-3 leading-relaxed text-muted">{p.summary}</motion.p>

                <motion.ul variants={rise} className="mt-5 flex flex-wrap gap-2">
                  {p.stack.slice(0, 6).map((s) => (
                    <li key={s} className="rounded-full bg-surface-2 px-3 py-1 text-xs text-muted">{s}</li>
                  ))}
                </motion.ul>

                <motion.div variants={rise} className="mt-7 flex flex-wrap items-center gap-5 text-sm font-bold">
                  <Link href={`/projects/${p.slug}`} className="text-mint transition hover:translate-x-1">
                    Read case study &rarr;
                  </Link>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="link-u text-muted transition hover:text-ink">
                      Live site &nearr;
                    </a>
                  )}
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="link-u text-muted transition hover:text-ink">
                      GitHub &nearr;
                    </a>
                  )}
                </motion.div>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}