"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { useSwarmState3D } from "@/components/v2/swarm/SwarmController3D";

interface SectionV2Props {
  id: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export default function SectionV2({
  id,
  children,
  className = "",
  ariaLabel,
}: SectionV2Props) {
  const ref = useRef<HTMLElement>(null);
  const { registerSection } = useSwarmState3D();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        registerSection(id, entry.intersectionRatio);
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [id, registerSection]);

  return (
    <section
      ref={ref}
      id={id}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </section>
  );
}
