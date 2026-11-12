"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useSpring } from "motion/react";

export default function CursorGlow() {
  const [hover, setHover] = useState(false);
  const shown = useMotionValue(0);
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const gx = useSpring(x, { stiffness: 70, damping: 20, mass: 0.6 });
  const gy = useSpring(y, { stiffness: 70, damping: 20, mass: 0.6 });
  const rx = useSpring(x, { stiffness: 420, damping: 32 });
  const ry = useSpring(y, { stiffness: 420, damping: 32 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;

    let visible = false;

    const move = (e: MouseEvent) => {
      if (!visible) {
        visible = true;
        animate(shown, 1, { duration: 0.4 });
      }
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a, button, [role='button'], input, textarea, select, label"));
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y, shown]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ x: gx, y: gy, opacity: shown }}
        className="pointer-events-none fixed left-0 top-0 z-[60]"
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 460,
            height: 460,
            background: "radial-gradient(circle, rgba(62,224,176,0.08), transparent 65%)",
          }}
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ x: rx, y: ry, opacity: shown }}
        className="pointer-events-none fixed left-0 top-0 z-[61]"
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-mint/70"
          animate={{
            width: hover ? 56 : 20,
            height: hover ? 56 : 20,
            backgroundColor: hover ? "rgba(62,224,176,0.12)" : "rgba(62,224,176,0)",
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  );
}