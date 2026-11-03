import { supabase } from "./supabase";
import { projects as fallback, type Project } from "./data";

type Row = {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  type: string;
  year: string;
  role: string;
  summary: string;
  problem: string;
  solution: string[] | null;
  decisions: unknown;
  challenges: unknown;
  stack: string[] | null;
  live_url: string;
  github_url: string;
  cover_url: string;
  gallery_urls: string[] | null;
};

const pairs = (v: unknown) =>
  Array.isArray(v)
    ? (v as { title?: string; text?: string }[]).map((x) => ({
        title: String(x?.title ?? ""),
        text: String(x?.text ?? ""),
      }))
    : [];

export function rowToProject(r: Row): Project {
  return {
    slug: r.slug,
    title: r.title,
    tagline: r.tagline,
    type: r.type,
    year: r.year,
    role: r.role,
    summary: r.summary,
    problem: r.problem,
    solution: r.solution ?? [],
    decisions: pairs(r.decisions),
    challenges: pairs(r.challenges),
    stack: r.stack ?? [],
    live: r.live_url,
    github: r.github_url,
    cover: r.cover_url,
    gallery: r.gallery_urls ?? [],
  };
}

export function projectToRow(p: Project, order: number) {
  return {
    slug: p.slug,
    title: p.title,
    tagline: p.tagline,
    type: p.type,
    year: p.year,
    role: p.role,
    summary: p.summary,
    problem: p.problem,
    solution: p.solution,
    decisions: p.decisions,
    challenges: p.challenges,
    stack: p.stack,
    live_url: p.live,
    github_url: p.github,
    cover_url: p.cover,
    gallery_urls: p.gallery,
    published: true,
    sort_order: order,
  };
}

// If the database is empty or unreachable, the built-in sample projects are shown.
export async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .eq("published", true)
    .order("sort_order")
    .order("created_at", { ascending: false });
  if (error || !data || data.length === 0) return fallback;
  return (data as Row[]).map(rowToProject);
}

export async function fetchProject(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) return fallback.find((p) => p.slug === slug) ?? null;
  if (data) return rowToProject(data as Row);

  const { count } = await supabase
    .from("portfolio_projects")
    .select("id", { count: "exact", head: true })
    .eq("published", true);
  return count === 0 ? fallback.find((p) => p.slug === slug) ?? null : null;
}