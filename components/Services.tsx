import Reveal from "./Reveal";
import Icon from "./Icon";
import { process, services } from "../lib/data";

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 border-y border-line bg-surface/40 py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">Services</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            What I can build for you.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 100}>
              <div className="card h-full rounded-3xl p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint/10 text-mint">
                  <Icon d={s.icon} />
                </span>
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
              </div>
            </Reveal>
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
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">How I work</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            A clear process, no surprises.
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-6 md:grid-cols-4">
          {process.map((s, i) => (
            <Reveal key={s.title} delay={i * 120}>
              <li className="relative">
                <span className="bg-brand flex h-12 w-12 items-center justify-center rounded-2xl font-display text-lg font-bold text-canvas">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}