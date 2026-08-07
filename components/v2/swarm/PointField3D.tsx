"use client";

import { useRef, useEffect, useSyncExternalStore, useCallback } from "react";
import { SwarmEngine3D } from "./swarm-engine-3d";

interface PointField3DProps {
  stateIndex: number;
  particleCount?: number;
  className?: string;
}

function getParticleCount(override?: number): number {
  if (override) return override;
  if (typeof window === "undefined") return 400;
  const w = window.innerWidth;
  if (w < 640) return 200;
  if (w < 1024) return 400;
  return 650;
}

function subscribeToReducedMotion(callback: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServer() {
  return false;
}

export default function PointField3D({
  stateIndex,
  particleCount,
  className = "",
}: PointField3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<SwarmEngine3D | null>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    getReducedMotionServer
  );

  const handlePointerMove = useCallback((e: PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas || !engineRef.current) return;
    const rect = canvas.getBoundingClientRect();
    engineRef.current.setPointer(e.clientX - rect.left, e.clientY - rect.top);
  }, []);

  const handlePointerLeave = useCallback(() => {
    engineRef.current?.clearPointer();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const count = getParticleCount(particleCount);
    const engine = new SwarmEngine3D({ particleCount: count });
    engineRef.current = engine;
    engine.init(canvas, reducedMotion);

    const handleResize = () => {
      engine.resize();
      if (reducedMotion) engine.renderStatic();
    };

    const handleVisibility = () => {
      engine.setPageVisibility(!document.hidden);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        engine.setVisibility(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(canvas);
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);

    if (!reducedMotion) {
      canvas.addEventListener("pointermove", handlePointerMove);
      canvas.addEventListener("pointerleave", handlePointerLeave);
    }

    return () => {
      engine.destroy();
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [particleCount, reducedMotion, handlePointerMove, handlePointerLeave]);

  useEffect(() => {
    engineRef.current?.setStateIndex(stateIndex);
  }, [stateIndex]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
      role="presentation"
      style={{ touchAction: "none" }}
    />
  );
}
