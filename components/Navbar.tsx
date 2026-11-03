"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { profile } from "../lib/data";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    function onScroll() {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
      setStuck(el.scrollTop > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        stuck || open ? "border-b border-line bg-canvas/80 backdrop-blur-lg" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-5 sm:px-8" aria-label="Main">
        <Link href="/" onClick={close} className="flex items-center gap-3" aria-label={`${profile.name}, home`}>
          <span className="bg-brand flex h-10 w-10 items-center justify-center rounded-xl font-display text-[15px] font-bold text-canvas">
            {profile.initials}
          </span>
          <span className="hidden font-display text-lg font-semibold sm:inline">{profile.name}</span>
        </Link>

        <ul className="hidden items-center gap-8 text-[15px] font-medium text-muted md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition hover:text-ink">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className="bg-brand hidden rounded-full px-5 py-2.5 text-sm font-bold text-canvas transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(62,224,176,0.6)] sm:inline-block"
          >
            Hire me
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-line text-ink md:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-nav" className="px-5 pb-6 pt-2 md:hidden">
          <ul className="text-lg font-medium">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={close} className="block rounded-xl px-3 py-3 hover:bg-surface">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/#contact" onClick={close} className="bg-brand mt-3 block rounded-full px-5 py-3 text-center font-bold text-canvas">
            Hire me
          </Link>
        </div>
      )}

      <div className="bg-brand absolute bottom-0 left-0 h-[2px]" style={{ width: `${progress}%` }} aria-hidden="true" />
    </header>
  );
}