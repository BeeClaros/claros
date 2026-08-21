"use client";

import { type RefObject, useEffect } from "react";
import { HERO_SNAP_POINTS } from "./heroStages";

const SETTLE_MS = 180;
const LOCK_MS = 800;
const SNAP_TOLERANCE = 0.015;

/**
 * After the user stops scrolling inside the hero pin, gently correct
 * to the nearest snap point using the browser's native smooth scroll.
 * No wheel interception — video scrubbing and spring stay untouched.
 */
export function useHeroScrollSnap(
  pinRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    const pin = pinRef.current;
    if (!pin || !enabled) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    let locked = false;

    const onScrollEnd = () => {
      if (locked) return;

      const rect = pin.getBoundingClientRect();
      const pinTop = window.scrollY + rect.top;
      const range = Math.max(pin.offsetHeight - window.innerHeight, 1);
      const progress = (window.scrollY - pinTop) / range;

      if (progress < -0.01 || progress > 1.01) return;

      let best = HERO_SNAP_POINTS[0];
      let bestDist = Math.abs(progress - best);
      for (let i = 1; i < HERO_SNAP_POINTS.length; i++) {
        const d = Math.abs(progress - HERO_SNAP_POINTS[i]);
        if (d < bestDist) {
          bestDist = d;
          best = HERO_SNAP_POINTS[i];
        }
      }

      if (bestDist < SNAP_TOLERANCE) return;

      const targetY = pinTop + best * range;
      locked = true;
      window.scrollTo({ top: targetY, behavior: "smooth" });
      setTimeout(() => {
        locked = false;
      }, LOCK_MS);
    };

    const onScroll = () => {
      if (locked) return;
      clearTimeout(timer);
      timer = setTimeout(onScrollEnd, SETTLE_MS);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, [pinRef, enabled]);
}
