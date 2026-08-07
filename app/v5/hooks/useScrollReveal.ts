"use client";

import { useEffect, type RefObject } from "react";

/**
 * Observes all .ed-reveal elements within the given container
 * and adds the .visible class when they enter the viewport.
 */
export function useScrollReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = container.querySelectorAll(".ed-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ref]);
}
