"use client";

import { useState } from "react";
import { profile } from "../lib/data";

export default function ProfilePhoto({ className = "" }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`bg-brand rounded-[2rem] p-[3px] ${className}`}>
        <div className="flex h-full w-full items-center justify-center rounded-[calc(2rem-3px)] bg-surface-2 font-display text-7xl font-bold">
          <span className="text-gradient">{profile.initials}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-brand rounded-[2rem] p-[3px] shadow-[0_30px_80px_-30px_rgba(62,224,176,0.5)] ${className}`}>
      <div className="h-full w-full overflow-hidden rounded-[calc(2rem-3px)] bg-surface-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/profile.jpg"
          alt={`Portrait of ${profile.name}`}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}