"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import AdminGate from "../../../../components/AdminGate";
import ImageField from "../../../../components/ImageField";
import { supabase } from "../../../../lib/supabase";
import { deleteImages } from "../../../../lib/storage";

type Pair = { title: string; text: string };

const input =
  "w-full rounded-xl border border-line bg-canvas px-4 py-3 text-[15px] outline-none transition placeholder:text-muted/60 focus:border-mint";
const label = "mb-1.5 mt-6 block text-sm font-bold";
const TYPES = ["Portfolio project", "Client project", "Personal project", "Open source"];
const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);

export default function EditProject() {
  return (
    <AdminGate>
      <Editor />
    </AdminGate>
  );
}

function StringList({
  items,
  onChange,
  placeholder,
}: {
  items: string[];
  onChange: (v: string[]) => void;
  placeholder: string;
}) {
  return (
    <div className="space-y-3">
      {items.map((v, i) => (
        <div key={i} className="flex gap-2">
          <textarea
            rows={2}
            className={input}
            value={v}
            placeholder={placeholder}
            onChange={(e) => onChange(items.map((x, j) => (j === i ? e.target.value : x)))}
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
            aria-label={`Remove item ${i + 1}`}
            className="h-10 w-10 flex-none rounded-xl border border-line text-muted hover:text-red-400"
          >
            &times;
          </button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, ""])} className="text-sm font-bold text-mint hover:underline">
        + Add
      </button>
    </div>
  );
}

function PairList({
  items,
  onChange,
  titlePlaceholder,
  textPlaceholder,
}: {
  items: Pair[];
  onChange: (v: Pair[]) => void;
  titlePlaceholder: string;
  textPlaceholder: string;
}) {
  return (
    <div className="space-y-4">
      {items.map((v, i) => (
        <div key={i} className="rounded-2xl border border-line bg-surface p-4">
          <div className="flex gap-2">
            <input
              className={input}
              value={v.title}
              placeholder={titlePlaceholder}
              onChange={(e) => onChange(items.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))}
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              aria-label={`Remove item ${i + 1}`}
              className="h-[46px] w-10 flex-none rounded-xl border border-line text-muted hover:text-red-400"
            >
              &times;
            </button>
          </div>
          <textarea
            rows={3}
            className={`${input} mt-2`}
            value={v.text}
            placeholder={textPlaceholder}
            onChange={(e) => onChange(items.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)))}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, { title: "", text: "" }])}
        className="text-sm font-bold text-mint hover:underline"
      >
        + Add
      </button>
    </div>
  );
}

function Editor() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";

  const [loaded, setLoaded] = useState(isNew);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [tagline, setTagline] = useState("");
  const [type, setType] = useState(TYPES[0]);
  const [year, setYear] = useState("");
  const [role, setRole] = useState("");
  const [summary, setSummary] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState<string[]>([""]);
  const [decisions, setDecisions] = useState<Pair[]>([]);
  const [challenges, setChallenges] = useState<Pair[]>([]);
  const [stack, setStack] = useState("");
  const [live, setLive] = useState("");
  const [github, setGithub] = useState("");
  const [cover, setCover] = useState<string[]>([]);
  const [gallery, setGallery] = useState<string[]>([]);
  const [published, setPublished] = useState(true);
  const [sortOrder, setSortOrder] = useState("100");
  const [removed, setRemoved] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isNew) return;
    let on = true;
    supabase
      .from("portfolio_projects")
      .select("*")
      .eq("id", Number(id))
      .maybeSingle()
      .then(({ data, error }) => {
        if (!on) return;
        if (error || !data) {
          setError(error?.message ?? "Project not found.");
          return;
        }
        setTitle(data.title);
        setSlug(data.slug);
        setSlugTouched(true);
        setTagline(data.tagline);
        setType(data.type);
        setYear(data.year);
        setRole(data.role);
        setSummary(data.summary);
        setProblem(data.problem);
        setSolution(data.solution?.length ? data.solution : [""]);
        setDecisions(Array.isArray(data.decisions) ? data.decisions : []);
        setChallenges(Array.isArray(data.challenges) ? data.challenges : []);
        setStack((data.stack ?? []).join(", "));
        setLive(data.live_url);
        setGithub(data.github_url);
        setCover(data.cover_url ? [data.cover_url] : []);
        setGallery(data.gallery_urls ?? []);
        setPublished(data.published);
        setSortOrder(String(data.sort_order));
        setLoaded(true);
      });
    return () => {
      on = false;
    };
  }, [id, isNew]);

  function onTitle(v: string) {
    setTitle(v);
    if (!slugTouched) setSlug(slugify(v));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const s = slug || slugify(title);
    if (!title.trim()) return setError("Please enter a title.");
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s))
      return setError("The web address can use only lowercase letters, numbers and dashes.");
    if (live.trim() && !/^https?:\/\//.test(live.trim())) return setError("The live link must start with https://");
    if (github.trim() && !/^https?:\/\//.test(github.trim())) return setError("The GitHub link must start with https://");

    const clean = (v: Pair[]) =>
      v.filter((x) => x.title.trim() || x.text.trim()).map((x) => ({ title: x.title.trim(), text: x.text.trim() }));

    const row = {
      slug: s,
      title: title.trim(),
      tagline: tagline.trim(),
      type,
      year: year.trim(),
      role: role.trim(),
      summary: summary.trim(),
      problem: problem.trim(),
      solution: solution.map((x) => x.trim()).filter(Boolean),
      decisions: clean(decisions),
      challenges: clean(challenges),
      stack: stack.split(",").map((x) => x.trim()).filter(Boolean),
      live_url: live.trim(),
      github_url: github.trim(),
      cover_url: cover[0] ?? "",
      gallery_urls: gallery,
      published,
      sort_order: Number.isFinite(Number(sortOrder)) ? Math.round(Number(sortOrder)) : 100,
    };

    setBusy(true);
    const res = isNew
      ? await supabase.from("portfolio_projects").insert(row)
      : await supabase.from("portfolio_projects").update(row).eq("id", Number(id));
    setBusy(false);

    if (res.error) {
      return setError(
        res.error.code === "23505"
          ? "Another project already uses this web address. Please change it."
          : res.error.message
      );
    }
    if (removed.length > 0) await deleteImages(removed);
    router.push("/admin");
  }

  if (!loaded) {
    return error ? (
      <main className="mx-auto max-w-[900px] px-5 py-16 sm:px-8">
        <p className="font-semibold text-red-400">{error}</p>
        <Link href="/admin" className="mt-4 inline-block font-bold text-mint">&larr; Back</Link>
      </main>
    ) : (
      <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-label="Loading">
        <span className="spinner" />
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-[900px] px-5 pb-28 pt-6 sm:px-8">
      <Link href="/admin" className="text-sm text-muted hover:text-mint">&larr; All projects</Link>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">{isNew ? "New project" : "Edit project"}</h1>

      <form onSubmit={save} noValidate>
        <label htmlFor="f-title" className={label}>Title</label>
        <input id="f-title" className={input} value={title} onChange={(e) => onTitle(e.target.value)} placeholder="Deen's Sanitary Store" />

        <label htmlFor="f-slug" className={label}>Web address (slug)</label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted">/projects/</span>
          <input
            id="f-slug"
            className={input}
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(slugify(e.target.value));
            }}
          />
        </div>

        <label htmlFor="f-tag" className={label}>One-line description</label>
        <input id="f-tag" className={input} value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="An online store with stock and sales management" />

        <div className="grid gap-x-5 sm:grid-cols-3">
          <div>
            <label htmlFor="f-type" className={label}>Type</label>
            <select id="f-type" className={input} value={type} onChange={(e) => setType(e.target.value)}>
              {TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="f-year" className={label}>Year</label>
            <input id="f-year" className={input} value={year} onChange={(e) => setYear(e.target.value)} placeholder="2026" />
          </div>
          <div>
            <label htmlFor="f-order" className={label}>Order (small shows first)</label>
            <input id="f-order" inputMode="numeric" className={input} value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
          </div>
        </div>

        <label htmlFor="f-role" className={label}>My role</label>
        <input id="f-role" className={input} value={role} onChange={(e) => setRole(e.target.value)} placeholder="Design, development and deployment" />

        <label htmlFor="f-summary" className={label}>Short summary (shown on the home page)</label>
        <textarea id="f-summary" rows={3} className={input} value={summary} onChange={(e) => setSummary(e.target.value)} />

        <label className={label}>Cover image (shown in the laptop)</label>
        <ImageField urls={cover} max={1} onChange={setCover} onRemoved={(u) => setRemoved((r) => [...r, u])} />

        <label htmlFor="f-problem" className={label}>The problem</label>
        <textarea id="f-problem" rows={3} className={input} value={problem} onChange={(e) => setProblem(e.target.value)} />

        <p className={label}>What I built (one point each)</p>
        <StringList items={solution} onChange={setSolution} placeholder="For example: Cart and checkout with delivery." />

        <p className={label}>Key decisions</p>
        <PairList items={decisions} onChange={setDecisions} titlePlaceholder="Decision" textPlaceholder="Why you chose it" />

        <p className={label}>Challenges and how I solved them</p>
        <PairList items={challenges} onChange={setChallenges} titlePlaceholder="Challenge" textPlaceholder="How you solved it" />

        <label htmlFor="f-stack" className={label}>Technologies (separate with commas)</label>
        <input id="f-stack" className={input} value={stack} onChange={(e) => setStack(e.target.value)} placeholder="Next.js, TypeScript, Supabase" />

        <div className="grid gap-x-5 sm:grid-cols-2">
          <div>
            <label htmlFor="f-live" className={label}>Live site link</label>
            <input id="f-live" className={input} value={live} onChange={(e) => setLive(e.target.value)} placeholder="https://" />
          </div>
          <div>
            <label htmlFor="f-gh" className={label}>GitHub link</label>
            <input id="f-gh" className={input} value={github} onChange={(e) => setGithub(e.target.value)} placeholder="https://github.com/..." />
          </div>
        </div>

        <p className={label}>More screenshots (up to 12)</p>
        <ImageField urls={gallery} max={12} onChange={setGallery} onRemoved={(u) => setRemoved((r) => [...r, u])} />

        <label className="mt-8 flex cursor-pointer items-center gap-3">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="h-5 w-5 accent-[#3ee0b0]" />
          <span className="font-bold">Published (visible on the site)</span>
        </label>

        {error && <p className="mt-6 text-sm font-semibold text-red-400">{error}</p>}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={busy}
            className="bg-brand h-[52px] rounded-full px-8 font-bold text-canvas transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {busy ? "Saving..." : "Save project"}
          </button>
          <Link href="/admin" className="rounded-full border border-line px-6 py-3.5 font-bold transition hover:border-mint">
            Cancel
          </Link>
          {!isNew && slug && (
            <Link href={`/projects/${slug}`} target="_blank" className="text-sm font-bold text-mint hover:underline">
              Preview page &nearr;
            </Link>
          )}
        </div>
      </form>
    </main>
  );
}