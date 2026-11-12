import { skills } from "../lib/data";

export default function TechMarquee() {
  const items = skills.flatMap((g) => g.items);
  const row = [...items, ...items];

  return (
    <section
      aria-label="Technologies"
      className="marquee overflow-hidden border-y border-line bg-surface/50 py-5"
      style={{
        maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
      }}
    >
      <div className="marquee-track flex w-max whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={`${t}-${i}`}
            aria-hidden={i >= items.length}
            className="flex items-center gap-10 pr-10 font-display text-lg text-muted"
          >
            {t}
            <span className="text-mint" aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}