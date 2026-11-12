"use client";

import { MotionConfig } from "motion/react";
import CursorGlow from "./CursorGlow";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <CursorGlow />
      {children}
    </MotionConfig>
  );
}