"use client";

import { type RefObject, useEffect } from "react";
import { HERO_SNAP_POINTS } from "./heroStages";

const COOLDOWN_MS = 900;
const MIN_SWIPE_PX = 30;

/**
 * Intercept wheel / touch inside the hero pin and advance exactly one
 * snap point per gesture, using the browser's smooth scroll.
 */
export function useHeroScrollSnap(
  pinRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    const pin = pinRef.current;
    if (!pin || !enabled) return;

    let animating = false;
    let currentIndex = 0;
    let cooldownTimer: ReturnType<typeof setTimeout> | undefined;

    function getPinAbsTop() {
      return window.scrollY + pin!.getBoundingClientRect().top;
    }

    function getRange() {
      return Math.max(pin!.offsetHeight - window.innerHeight, 1);
    }

    function getProgress() {
      return (window.scrollY - getPinAbsTop()) / getRange();
    }

    function syncIndex() {
      const p = getProgress();
      let best = 0;
      let bestD = Math.abs(p - HERO_SNAP_POINTS[0]);
      for (let i = 1; i < HERO_SNAP_POINTS.length; i++) {
        const d = Math.abs(p - HERO_SNAP_POINTS[i]);
        if (d < bestD) { bestD = d; best = i; }
      }
      currentIndex = best;
    }

    syncIndex();

    function snapTo(index: number) {
      const clamped = Math.max(0, Math.min(index, HERO_SNAP_POINTS.length - 1));
      currentIndex = clamped;
      animating = true;

      const targetY = getPinAbsTop() + HERO_SNAP_POINTS[clamped] * getRange();
      window.scrollTo({ top: targetY, behavior: "smooth" });

      clearTimeout(cooldownTimer);
      cooldownTimer = setTimeout(() => { animating = false; }, COOLDOWN_MS);
    }

    /* ── Wheel ──────────────────────────────────────────────── */
    function onWheel(e: WheelEvent) {
      const p = getProgress();
      if (p < -0.02 || p > 1.02) return;

      if (currentIndex === 0 && e.deltaY < 0) return;
      if (currentIndex === HERO_SNAP_POINTS.length - 1 && e.deltaY > 0) return;

      e.preventDefault();
      if (animating || Math.abs(e.deltaY) < 2) return;

      snapTo(e.deltaY > 0 ? currentIndex + 1 : currentIndex - 1);
    }

    /* ── Touch ──────────────────────────────────────────────── */
    let touchStartY = 0;
    let touchHandled = false;

    function onTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY;
      touchHandled = false;
    }

    function onTouchMove(e: TouchEvent) {
      if (touchHandled) { e.preventDefault(); return; }
      if (animating) { e.preventDefault(); return; }

      const p = getProgress();
      if (p < -0.02 || p > 1.02) return;

      const delta = touchStartY - e.touches[0].clientY;
      if (Math.abs(delta) < MIN_SWIPE_PX) return;

      if (currentIndex === 0 && delta < 0) return;
      if (currentIndex === HERO_SNAP_POINTS.length - 1 && delta > 0) return;

      e.preventDefault();
      touchHandled = true;
      snapTo(delta > 0 ? currentIndex + 1 : currentIndex - 1);
    }

    pin.addEventListener("wheel", onWheel, { passive: false });
    pin.addEventListener("touchstart", onTouchStart, { passive: true });
    pin.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      pin.removeEventListener("wheel", onWheel);
      pin.removeEventListener("touchstart", onTouchStart);
      pin.removeEventListener("touchmove", onTouchMove);
      clearTimeout(cooldownTimer);
    };
  }, [pinRef, enabled]);
}
