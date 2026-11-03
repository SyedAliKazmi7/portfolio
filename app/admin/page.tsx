"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import AdminGate from "../../components/AdminGate";
import { supabase } from "../../lib/supabase";
import { deleteImages } from "../../lib/storage";
import { projects as samples } from "../../lib/data";
import { projectToRow } from "../../lib/projects";

type Row = {
  id: number;
  slug: string;
  title: string;
  type: string;
  year: string;
  cover_url: string;
  published: boolean;
  sort_order: number;
};

export default function AdminHome() {
  return (
    <AdminGate>
      <List />
    </AdminGate>
  );
}

function List() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("portfolio_projects")
      .select("id, slug, title, type, year, cover_url, published, sort_order")
      .order("sort_order")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setRows((data ?? []) as Row[]);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function toggle(r: Row) {
    setError("");
    const { error } = await supabase.from("portfolio_projects").update({ published: !r.published }).eq("id", r.id);
    if (error) setError(error.message);
    else load();
  }

  async function move(i: number, dir: -1 | 1) {
    if (!rows) return;
    const j = i + dir;
    if (j < 0 || j >= rows.length) return;
    const next = [...rows];
    [next[i], next[j]] = [next[j], next[i]];
    setRows(next);
    await Promise.all(
      next.map((r, idx) => supabase.from("portfolio_projects").update({ sort_order: (idx + 1) * 10 }).eq("id", r.id))
    );
    load();
  }

  async function remove(r: Row) {
    if (!confirm(`Delete "${r.title}" for good? Its uploaded images will be deleted too.`)) return;
    setBusy(true);
    setError("");
    const { data } = await supabase.from("portfolio_projects").select("cover_url, gallery_urls").eq("id", r.id).maybeSingle();
    const { error } = await supabase.from("portfolio_projects").delete().eq("id", r.id);
    if (error) {
      setBusy(false);
      return setError(error.message);
    }
    if (data) await deleteImages([data.cover_url, ...(data.gallery_urls ?? [])].filter(Boolean));
    setBusy(false);
    load();
  }

  async function importSamples() {
    setBusy(true);
    setError("");
    const { error } = await supabase
      .from("portfolio_projects")
      .insert(samples.map((p, i) => projectToRow(p, (i + 1) * 10)));
    setBusy(false);
    if (error) setError(error.message);
    else load();
  }

  return (
    <main className="mx-auto max-w-[1000px] px-5 pb-24 pt-8 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-4xl font-bold tracking-tight">Projects</h1>
        <Link href="/admin/projects/new" className="bg-brand rounded-full px-6 py-3 font-bold text-canvas transition hover:-translate-y-0.5">
          + New project
        </Link>
      </div>

      {error && <p className="mt-4 text-sm font-semibold text-red-400">{error}</p>}

      {rows === null && !error && (
        <div className="mt-10 flex justify-center" role="status" aria-label="Loading">
          <span className="spinner" />
        </div>
      )}

      {rows && rows.length === 0 && (
        <div className="card mt-10 rounded-3xl p-10 text-center">
          <p className="font-display text-2xl font-semibold">No projects in the database yet</p>
          <p className="mt-2 text-muted">
            Your site is showing the sample projects from the code. Import them here so you can edit them, or start fresh.
          </p>
          <button
            onClick={importSamples}
            disabled={busy}
            className="bg-brand mt-6 rounded-full px-6 py-3 font-bold text-canvas disabled:opacity-60"
          >
            {busy ? "Importing..." : "Import my sample projects"}
          </button>
        </div>
      )}

      <ul className="mt-8 space-y-3">
        {rows?.map((r, i) => (
          <li key={r.id} className="card flex flex-wrap items-center gap-4 rounded-2xl p-4">
            <div className="h-16 w-24 flex-none overflow-hidden rounded-lg border border-line bg-surface-2">
              {r.cover_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={r.cover_url} alt="" className="h-full w-full object-cover object-top" />
              )}
            </div>
            <div className="min-w-[160px] flex-1">
              <p className="font-display text-lg font-semibold">{r.title}</p>
              <p className="text-sm text-muted">
                {r.type}
                {r.year ? ` · ${r.year}` : ""} · /projects/{r.slug}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                r.published ? "bg-mint/15 text-mint" : "bg-surface-2 text-muted"
              }`}
            >
              {r.published ? "Published" : "Hidden"}
            </span>
            <div className="flex items-center gap-4 text-sm font-bold">
              <button onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up" className="text-muted hover:text-ink disabled:opacity-30">↑</button>
              <button onClick={() => move(i, 1)} disabled={i === (rows?.length ?? 0) - 1} aria-label="Move down" className="text-muted hover:text-ink disabled:opacity-30">↓</button>
              <Link href={`/admin/projects/${r.id}`} className="text-mint hover:underline">Edit</Link>
              <button onClick={() => toggle(r)} className="text-muted hover:text-ink">{r.published ? "Hide" : "Show"}</button>
              <button onClick={() => remove(r)} disabled={busy} className="text-red-400 hover:underline disabled:opacity-60">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}