"use client";

import { useState } from "react";
import { uploadImage } from "../lib/storage";

export default function ImageField({
  urls,
  max,
  onChange,
  onRemoved,
}: {
  urls: string[];
  max: number;
  onChange: (urls: string[]) => void;
  onRemoved: (url: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function add(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, max - urls.length);
    e.target.value = "";
    if (files.length === 0) return;
    setBusy(true);
    setError("");
    const added: string[] = [];
    try {
      for (const f of files) added.push(await uploadImage(f));
    } catch {
      setError("Upload failed. Please check that you are logged in as admin and try again.");
    }
    setBusy(false);
    if (added.length > 0) onChange([...urls, ...added]);
  }

  function move(i: number, d: -1 | 1) {
    const j = i + d;
    if (j < 0 || j >= urls.length) return;
    const next = [...urls];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {urls.map((u, i) => (
          <div key={u} className="w-[150px]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={u} alt={`Image ${i + 1}`} className="h-full w-full object-cover object-top" />
              <button
                type="button"
                onClick={() => {
                  onChange(urls.filter((x) => x !== u));
                  onRemoved(u);
                }}
                aria-label={`Remove image ${i + 1}`}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-sm text-white"
              >
                &times;
              </button>
            </div>
            {max > 1 && (
              <div className="mt-1.5 flex justify-center gap-3 text-sm text-muted">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move left" className="disabled:opacity-30 hover:text-ink">&larr;</button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === urls.length - 1} aria-label="Move right" className="disabled:opacity-30 hover:text-ink">&rarr;</button>
              </div>
            )}
          </div>
        ))}

        {urls.length < max && (
          <label
            className={`flex aspect-[16/10] w-[150px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-line text-muted transition hover:border-mint hover:text-mint ${
              busy ? "pointer-events-none opacity-60" : ""
            }`}
          >
            <span className="text-2xl leading-none">{busy ? "…" : "+"}</span>
            <span className="mt-1 text-xs font-bold">{busy ? "Uploading" : "Add image"}</span>
            <input type="file" accept="image/*" multiple={max > 1} onChange={add} className="sr-only" disabled={busy} />
          </label>
        )}
      </div>
      {error && <p className="mt-2 text-sm font-semibold text-red-400">{error}</p>}
    </div>
  );
}