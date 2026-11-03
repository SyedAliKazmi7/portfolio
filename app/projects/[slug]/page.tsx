"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Reveal from "../../../components/Reveal";
import Laptop from "../../../components/Laptop";
import { fetchProject, fetchProjects } from "../../../lib/projects";
import type { Project } from "../../../lib/data";

const label = "text-sm font-bold uppercase tracking-[0.2em] text-mint";

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const [p, setP] = useState<Project | null | undefined>(undefined);
  const [all, setAll] = useState<Project[]>([]);

  useEffect(() => {
    let on = true;
    Promise.all([fetchProject(slug), fetchProjects()]).then(([one, list]) => {
      if (!on) return;
      setP(one);
      setAll(list);
    });
    return () => {
      on = false;
    };
  }, [slug]);

  useEffect(() => {
    if (p) document.title = `${p.title} | Case study`;
  }, [p]);

  if (p === undefined) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center" role="status" aria-label="Loading">
        <span className="spinner" />
      </div>
    );
  }

  if (p === null) {
    return (
      <main className="mx-auto max-w-[900px] px-5 pb-24 pt-40 sm:px-8">
        <h1 className="font-display text-4xl font-bold">Project not found</h1>
        <Link href="/#projects" className="mt-4 inline-block font-bold text-mint">&larr; Back to projects</Link>
      </main>
    );
  }

  const index = all.findIndex((x) => x.slug === p.slug);
  const next = all.length > 1 && index !== -1 ? all[(index + 1) % all.length] : null;

  return (
    <main className="pt-[72px]">
      <section className="relative overflow-hidden">
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1000px] px-5 pb-12 pt-16 sm:px-8 sm:pt-24">
          <Link href="/#projects" className="text-sm text-muted transition hover:text-mint">&larr; All projects</Link>
          <span className="mt-8 block w-fit rounded-full border border-line px-3 py-1 text-xs font-bold text-mint">
            {p.type}
            {p.year ? ` · ${p.year}` : ""}
          </span>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-6xl">{p.title}</h1>
          <p className="mt-4 text-xl text-muted">{p.tagline}</p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            {p.role && (
              <div className="rounded-2xl border border-line bg-surface p-4">
                <dt className="text-xs uppercase tracking-wider text-muted">My role</dt>
                <dd className="mt-1 font-semibold">{p.role}</dd>
              </div>
            )}
            {p.stack.length > 0 && (
              <div className="rounded-2xl border border-line bg-surface p-4">
                <dt className="text-xs uppercase tracking-wider text-muted">Built with</dt>
                <dd className="mt-1 font-semibold">{p.stack.join(", ")}</dd>
              </div>
            )}
          </dl>

          <div className="mt-8 flex flex-wrap gap-4">
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand rounded-full px-7 py-3.5 font-bold text-canvas transition hover:-translate-y-0.5"
              >
                Visit live site &nearr;
              </a>
            )}
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-line px-7 py-3.5 font-bold transition hover:border-mint hover:text-mint"
              >
                View code &nearr;
              </a>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1000px] px-5 sm:px-8">
        <Reveal>
          <div className="rounded-3xl border border-line bg-gradient-to-br from-surface-2 via-surface to-canvas px-6 py-10 sm:px-16 sm:py-16">
            <Laptop src={p.cover} alt={`${p.title} main screen`} title={p.title} />
          </div>
        </Reveal>

        {p.problem && (
          <Reveal className="mt-16">
            <h2 className={label}>The problem</h2>
            <p className="mt-3 text-xl leading-relaxed">{p.problem}</p>
          </Reveal>
        )}

        {p.solution.length > 0 && (
          <Reveal className="mt-14">
            <h2 className={label}>What I built</h2>
            <ul className="mt-4 space-y-3 text-lg text-muted">
              {p.solution.map((s) => (
                <li key={s} className="flex gap-3">
                  <span className="text-mint">✓</span>
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {p.decisions.length > 0 && (
          <Reveal className="mt-14">
            <h2 className={label}>Key decisions</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {p.decisions.map((d) => (
                <div key={d.title} className="card rounded-2xl p-6">
                  <h3 className="font-display text-lg font-semibold">{d.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{d.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {p.challenges.length > 0 && (
          <Reveal className="mt-14">
            <h2 className={label}>Challenges and how I solved them</h2>
            <div className="mt-5 space-y-4">
              {p.challenges.map((c) => (
                <div key={c.title} className="rounded-2xl border border-line bg-surface p-6">
                  <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{c.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {p.gallery.length > 0 && (
          <Reveal className="mt-14">
            <h2 className={label}>Screens</h2>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              {p.gallery.map((g, i) => (
                <div key={g} className="rounded-2xl border border-line bg-surface px-6 py-8">
                  <Laptop src={g} alt={`${p.title} screen ${i + 2}`} title={`${p.title} ${i + 2}`} />
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {next && (
          <Reveal className="my-20">
            <Link href={`/projects/${next.slug}`} className="card group block rounded-3xl p-8 sm:p-10">
              <p className="text-sm text-muted">Next project</p>
              <p className="mt-2 font-display text-3xl font-bold transition group-hover:text-mint">{next.title} &rarr;</p>
            </Link>
          </Reveal>
        )}
        {!next && <div className="h-20" />}
      </div>
    </main>
  );
}