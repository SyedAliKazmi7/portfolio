import Reveal from "./Reveal";
import { facts, principles, profile, skills } from "../lib/data";

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">About</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Full-stack, from the database to the design.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-5 text-lg leading-relaxed text-muted">
              {profile.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              {facts.map((f) => (
                <div key={f.label} className="rounded-2xl border border-line bg-surface p-4">
                  <dt className="text-xs uppercase tracking-wider text-muted">{f.label}</dt>
                  <dd className="mt-1 font-semibold">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-6">
              {skills.map((g) => (
                <div key={g.group}>
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted">{g.group}</h3>
                  <ul className="flex flex-wrap gap-2.5">
                    {g.items.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-line bg-surface px-4 py-2 text-sm transition hover:border-mint hover:text-mint"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="card h-full rounded-3xl p-7">
                <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}