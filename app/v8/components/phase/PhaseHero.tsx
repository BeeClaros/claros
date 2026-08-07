"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  phase: string;
  title: string;
  lead: string;
  statement?: string;
  imageSrc: string;
  imageAlt?: string;
  imagePosition?: "right" | "center";
};

export default function PhaseHero({
  phase,
  title,
  lead,
  statement,
  imageSrc,
  imageAlt = "",
  imagePosition = "right",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);
  const reducedMotion = useReducedMotion();
  const live = reducedMotion !== true;

  return (
    <section
      ref={ref}
      className="phase-hero"
      style={{
        background: "var(--v8-bg-contrast)",
        position: "relative",
        overflow: "hidden",
        paddingTop: "calc(var(--v8-nav-h) + clamp(4rem, 10vw, 7rem))",
        paddingBottom: "clamp(4rem, 10vw, 8rem)",
      }}
    >
      {/* Hive background image - right side */}
      <div
        aria-hidden="true"
        className="phase-hero-bg"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "min(58%, 720px)",
          height: "100%",
          opacity: 0.72,
          maskImage:
            imagePosition === "right"
              ? "linear-gradient(to left, black 20%, transparent 95%)"
              : "linear-gradient(to left, black 40%, transparent 100%)",
          WebkitMaskImage:
            imagePosition === "right"
              ? "linear-gradient(to left, black 20%, transparent 95%)"
              : "linear-gradient(to left, black 40%, transparent 100%)",
          pointerEvents: "none",
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 58vw"
          style={{
            objectFit: "cover",
            objectPosition: imagePosition === "right" ? "left center" : "center",
          }}
        />
      </div>

      {/* Soft lime accent bar */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: "22%",
          width: "clamp(48px, 6vw, 100px)",
          height: "38%",
          background: "var(--v8-lime-pale)",
          zIndex: 0,
        }}
      />

      <div className="v8-container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "38rem" }}>
          <motion.div
            className="v8-overline"
            style={{ color: "var(--v8-lime-deep)" }}
            initial={live ? { opacity: 0, y: 16 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            {phase}
          </motion.div>

          <motion.h1
            className="v8-hero-title"
            style={{
              marginTop: "1rem",
              fontSize: "clamp(2.75rem, 5.5vw, 4.75rem)",
            }}
            initial={live ? { opacity: 0, y: 28 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
          >
            {title}
          </motion.h1>

          <motion.p
            className="v8-lead"
            style={{ marginTop: "1.75rem", maxWidth: "34rem" }}
            initial={live ? { opacity: 0, y: 22 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.38, ease: EASE }}
          >
            {lead}
          </motion.p>

          {statement ? (
            <motion.p
              className="v8-statement"
              style={{
                marginTop: "2.5rem",
                maxWidth: "22ch",
                fontSize: "clamp(1.3rem, 2.2vw, 1.75rem)",
              }}
              initial={live ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.52, ease: EASE }}
            >
              {statement}
            </motion.p>
          ) : null}
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .phase-hero-bg {
            width: 100% !important;
            opacity: 0.28 !important;
            mask-image: linear-gradient(to top, transparent 0%, black 40%, black 70%, transparent 100%) !important;
            -webkit-mask-image: linear-gradient(to top, transparent 0%, black 40%, black 70%, transparent 100%) !important;
          }
        }
      `}</style>
    </section>
  );
}
