import Link from "next/link";
import Year from "./Year";
import { profile } from "../lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-4 px-5 text-sm text-muted sm:flex-row sm:items-center sm:px-8">
        <p>
          &copy; <Year /> {profile.name}. All rights reserved.
        </p>
        <ul className="flex gap-6">
          <li><Link href="/#projects" className="transition hover:text-ink">Projects</Link></li>
          <li><Link href="/#contact" className="transition hover:text-ink">Contact</Link></li>
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="transition hover:text-ink">GitHub</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}