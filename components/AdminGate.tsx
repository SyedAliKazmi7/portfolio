"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

type State = "loading" | "login" | "denied" | "ok";

const input =
  "w-full rounded-xl border border-line bg-canvas px-4 py-3.5 text-[15px] outline-none transition placeholder:text-muted/60 focus:border-mint";

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>("loading");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const check = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;
    if (!user) {
      setState("login");
      return;
    }
    const { data: p } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
    setState(p?.role === "admin" ? "ok" : "denied");
  }, []);

  useEffect(() => {
    check();
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      setTimeout(check, 0);
    });
    return () => sub.subscription.unsubscribe();
  }, [check]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) setError("Wrong email or password.");
  }

  async function logout() {
    await supabase.auth.signOut();
  }

  if (state === "loading") {
    return (
      <div className="flex min-h-[70vh] items-center justify-center" role="status" aria-label="Loading">
        <span className="spinner" />
      </div>
    );
  }

  if (state === "login") {
    return (
      <main className="flex min-h-[85vh] items-center justify-center px-5 pt-[72px]">
        <form onSubmit={login} noValidate className="card w-full max-w-md rounded-3xl p-8">
          <h1 className="font-display text-3xl font-bold">Admin login</h1>
          <p className="mt-1 text-sm text-muted">Only the site owner can sign in here.</p>

          <label htmlFor="a-email" className="mb-1.5 mt-6 block text-sm font-bold">Email</label>
          <input id="a-email" type="email" className={input} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />

          <label htmlFor="a-pass" className="mb-1.5 mt-5 block text-sm font-bold">Password</label>
          <input id="a-pass" type="password" className={input} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />

          {error && <p className="mt-4 text-sm font-semibold text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="bg-brand mt-6 h-[50px] w-full rounded-full font-bold text-canvas transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {busy ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </main>
    );
  }

  if (state === "denied") {
    return (
      <main className="mx-auto max-w-md px-5 pb-24 pt-40 text-center">
        <h1 className="font-display text-3xl font-bold">Not allowed</h1>
        <p className="mt-3 text-muted">This account is not an admin of the portfolio.</p>
        <button onClick={logout} className="bg-brand mt-6 rounded-full px-6 py-3 font-bold text-canvas">
          Log out
        </button>
      </main>
    );
  }

  return (
    <div className="pt-[72px]">
      <div className="mx-auto flex max-w-[1000px] items-center justify-between px-5 pt-8 text-sm sm:px-8">
        <span className="rounded-full border border-line px-3 py-1 font-bold text-mint">Portfolio admin</span>
        <div className="flex items-center gap-5">
          <Link href="/" className="text-muted transition hover:text-ink">View site</Link>
          <button onClick={logout} className="font-bold text-muted transition hover:text-ink">Log out</button>
        </div>
      </div>
      {children}
    </div>
  );
}