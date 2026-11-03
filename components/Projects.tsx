"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import Laptop from "./Laptop";
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
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">Selected work</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Projects I am proud of.
          </h2>
        </Reveal>

        <div className="mt-14 space-y-10">
          {items === null && (
            <>
              <div className="skeleton h-[420px] rounded-3xl border border-line" role="status" aria-label="Loading projects" />
              <div className="skeleton h-[420px] rounded-3xl border border-line" />
            </>
          )}

          {items?.map((p, idx) => (
            <Reveal key={p.slug}>
              <article className="card group grid overflow-hidden rounded-3xl lg:grid-cols-2">
                <Link
                  href={`/projects/${p.slug}`}
                  aria-label={`${p.title} case study`}
                  className={`flex items-center bg-gradient-to-br from-surface-2 via-surface to-canvas p-7 sm:p-12 ${
                    idx % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Laptop src={p.cover} alt={`${p.title} screenshot`} title={p.title} />
                </Link>

                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <span className="w-fit rounded-full border border-line px-3 py-1 text-xs font-bold text-mint">
                    {p.type}
                    {p.year ? ` · ${p.year}` : ""}
                  </span>
                  <h3 className="mt-4 font-display text-3xl font-bold">{p.title}</h3>
                  <p className="mt-2 text-lg text-ink/90">{p.tagline}</p>
                  <p className="mt-3 line-clamp-3 leading-relaxed text-muted">{p.summary}</p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.stack.slice(0, 6).map((s) => (
                      <li key={s} className="rounded-full bg-surface-2 px-3 py-1 text-xs text-muted">{s}</li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-wrap items-center gap-5 text-sm font-bold">
                    <Link href={`/projects/${p.slug}`} className="text-mint transition hover:translate-x-1">
                      Read case study &rarr;
                    </Link>
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-muted transition hover:text-ink">
                        Live site &nearr;
                      </a>
                    )}
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-muted transition hover:text-ink">
                        GitHub &nearr;
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}