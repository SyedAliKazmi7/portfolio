"use client";

import { useState } from "react";

export default function ProjectImage({
  src,
  alt,
  title,
  className = "",
}: {
  src: string;
  alt: string;
  title: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-surface-2 to-surface ${className}`}>
        <span className="px-4 text-center font-display text-xl text-muted">{title}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="absolute inset-0 h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]"
      />
    </div>
  );
}