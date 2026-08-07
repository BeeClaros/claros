"use client";

import { useRef, type ReactNode } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function PhaseReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref);
  return <div ref={ref}>{children}</div>;
}
