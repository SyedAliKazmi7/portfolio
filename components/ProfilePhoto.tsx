"use client";

import { useState } from "react";
import { motion, useSpring, useTransform, type MotionValue } from "motion/react";
import { EASE } from "./Motion";
import { profile } from "../lib/data";

const PHOTO = "/profile-cutout.png";

const fade = "linear-gradient(to bottom, #000 80%, transparent 100%)";

export default function ProfilePhoto({ mx, my }: { mx: MotionValue<number>; my: MotionValue<number> }) {
  const [failed, setFailed] = useState(false);
  const sx = useSpring(mx, { stiffness: 90, damping: 18 });
  const sy = useSpring(my, { stiffness: 90, damping: 18 });
  const x = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const y = useTransform(sy, [-0.5, 0.5], [-8, 8]);

  return (
    <div className="relative h-full w-full">
      {/* Glow behind the person */}
      <div className="absolute inset-x-[6%] bottom-0 h-[58%] rounded-full bg-mint/25 blur-[90px]" aria-hidden="true" />

      <motion.div style={{ x, y }} className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0, y: 90, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.25, ease: EASE }}
          className="h-full w-full"
          style={{ maskImage: fade, WebkitMaskImage: fade }}
        >
          {failed ? (
            <div className="flex h-full w-full items-end justify-center">
              <div className="flex h-[70%] w-[70%] max-w-[360px] items-center justify-center rounded-t-full border border-line bg-surface-2 font-display text-8xl font-bold">
                <span className="text-gradient">{profile.initials}</span>
              </div>
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              ref={(el) => {
                // Catches an error that happened before React was ready
                if (el && el.complete && el.naturalWidth === 0) setFailed(true);
              }}
              src={PHOTO}
              alt={`Portrait of ${profile.name}`}
              fetchPriority="high"
              onError={() => setFailed(true)}
              className="h-full w-full object-contain object-bottom drop-shadow-[0_25px_45px_rgba(0,0,0,0.55)]"
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}