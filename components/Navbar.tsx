"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { EASE, Magnetic } from "./Motion";
import { profile } from "../lib/data";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [stuck, setStuck] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setStuck(y > 8);
    setHidden(y > prev && y > 140 && !open);
  });

  const close = () => setOpen(false);

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        stuck || open ? "border-b border-line bg-canvas/80 backdrop-blur-lg" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-5 sm:px-8" aria-label="Main">
        <Link href="/" onClick={close} className="flex items-center gap-3" aria-label={`${profile.name}, home`}>
          <motion.span
            whileHover={{ rotate: 8, scale: 1.08 }}
            className="bg-brand flex h-10 w-10 items-center justify-center rounded-xl font-display text-[15px] font-bold text-canvas"
          >
            {profile.initials}
          </motion.span>
          <span className="hidden font-display text-lg font-semibold sm:inline">{profile.name}</span>
        </Link>

        <ul className="hidden items-center gap-8 text-[15px] font-medium text-muted md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="link-u transition hover:text-ink">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Magnetic strength={0.25}>
              <Link
                href="/#contact"
                className="bg-brand inline-block rounded-full px-5 py-2.5 text-sm font-bold text-canvas transition hover:shadow-[0_10px_30px_-10px_rgba(62,224,176,0.6)]"
              >
                Hire me
              </Link>
            </Magnetic>
          </div>
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

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden md:hidden"
          >
            <div className="px-5 pb-6 pt-2">
              <ul className="text-lg font-medium">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <Link href={l.href} onClick={close} className="block rounded-xl px-3 py-3 hover:bg-surface">
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <Link href="/#contact" onClick={close} className="bg-brand mt-3 block rounded-full px-5 py-3 text-center font-bold text-canvas">
                Hire me
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        style={{ scaleX: progress }}
        className="bg-brand absolute bottom-0 left-0 h-[2px] w-full origin-left"
        aria-hidden="true"
      />
    </motion.header>
  );
}