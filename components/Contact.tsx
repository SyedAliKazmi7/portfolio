"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { profile } from "../lib/data";

const input =
  "w-full rounded-xl border border-line bg-canvas px-4 py-3.5 text-[15px] outline-none transition placeholder:text-muted/60 focus:border-mint";

export default function Contact() {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function send(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (name.trim().length < 2) return setError("Please enter your name.");
    if (msg.trim().length < 10) return setError("Please write a short message (at least 10 characters).");

    const text = `Hi ${profile.name}, I am ${name.trim()}.\n\n${msg.trim()}`;
    if (profile.whatsapp) {
      window.open(`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Project enquiry")}&body=${encodeURIComponent(text)}`;
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Could not copy. Please select the email and copy it by hand.");
    }
  }

  const links = [
    { label: "Email", href: `mailto:${profile.email}` },
    ...(profile.whatsapp ? [{ label: "WhatsApp", href: `https://wa.me/${profile.whatsapp}` }] : []),
    { label: "GitHub", href: profile.github },
    ...(profile.linkedin ? [{ label: "LinkedIn", href: profile.linkedin }] : []),
  ];

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden border-t border-line py-24 sm:py-32">
      <div className="blob absolute -bottom-40 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-mint/10 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-[1200px] gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">Contact</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Let&apos;s build something <span className="text-gradient">together.</span>
          </h2>
          <p className="mt-5 max-w-[480px] text-lg leading-relaxed text-muted">
            Tell me about your business and what you need. I usually reply within a day, with a clear plan and a fair price.
          </p>

          <ul className="mt-8 flex flex-wrap gap-3">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="rounded-full border border-line px-5 py-2.5 text-sm font-bold transition hover:border-mint hover:text-mint"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={copyEmail}
            className="mt-6 text-sm text-muted transition hover:text-ink"
          >
            {profile.email} · <span className="font-bold text-mint">{copied ? "Copied!" : "Copy email"}</span>
          </button>
        </Reveal>

        <Reveal delay={120}>
          <form onSubmit={send} noValidate className="card rounded-3xl p-7 sm:p-9">
            <h3 className="font-display text-2xl font-semibold">Send me a message</h3>
            <p className="mt-1 text-sm text-muted">
              {profile.whatsapp ? "This opens WhatsApp with your message ready to send." : "This opens your email app with your message ready to send."}
            </p>

            <label htmlFor="c-name" className="mb-1.5 mt-6 block text-sm font-bold">Your name</label>
            <input id="c-name" className={input} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />

            <label htmlFor="c-msg" className="mb-1.5 mt-5 block text-sm font-bold">What do you need?</label>
            <textarea
              id="c-msg"
              rows={5}
              className={input}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="For example: an online store for my shop, with stock and sales management."
            />

            {error && <p className="mt-4 text-sm font-semibold text-red-400">{error}</p>}

            <button
              type="submit"
              className="bg-brand mt-6 h-[52px] w-full rounded-full font-bold text-canvas transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(62,224,176,0.7)]"
            >
              {profile.whatsapp ? "Send on WhatsApp" : "Send by email"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}