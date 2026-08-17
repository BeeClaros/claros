"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import HiveScrollHint from "./hive/HiveScrollHint";
import HeroScrollStages from "./HeroScrollStages";

const HiveVideo = dynamic(() => import("./hive/HiveVideo"), { ssr: false });

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  progressRef.current = scrollYProgress.get();

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 32,
    restDelta: 0.001,
  });

  const introOpacity = useTransform(progress, [0, 0.06, 0.14], [1, 1, 0]);
  const introY = useTransform(progress, [0, 0.14], [0, -36]);
  const introPointer = useTransform(
    progress,
    [0, 0.12, 0.14],
    ["auto", "auto", "none"],
  );

  const forceComplete = reducedMotion === true;

  return (
    <div
      ref={pinRef}
      className={forceComplete ? "v8-hero-pin v8-hero-pin-static" : "v8-hero-pin"}
    >
      <section
        id="top"
        className="v8-hero-sticky"
        style={{ paddingTop: "var(--v8-nav-h)" }}
      >
        <div aria-hidden="true" className="v8-hero-hive-wrap">
          <HiveVideo progressRef={progressRef} forceComplete={forceComplete} />
          <div className="v8-hero-hive-fade" />
        </div>

        {!forceComplete && <HiveScrollHint progress={progress} />}

        <div
          className="v8-container"
          style={{ position: "relative", zIndex: 2, width: "100%", height: "100%" }}
        >
          <div className="v8-hero-copy-slot">
            <motion.div
              className="hero-copy"
              style={
                forceComplete
                  ? undefined
                  : {
                      opacity: introOpacity,
                      y: introY,
                      pointerEvents: introPointer,
                    }
              }
            >
              <motion.h1
                className="v8-hero-title"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              >
                The clarity to choose.{" "}
                <span className="v8-accent-text">The discipline to build.</span>
              </motion.h1>

              <motion.p
                className="v8-lead"
                style={{ marginTop: "1.75rem", maxWidth: "34rem" }}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
              >
                We help organisations decide where AI can create measurable
                value, implement what fits their business, and make it work with
                the teams who use it.
              </motion.p>

              <motion.div
                style={{
                  marginTop: "2.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  flexWrap: "wrap",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              >
                <a href="mailto:hello@beeclaros.com" className="v8-btn-primary">
                  Discuss your priorities <span className="v8-arrow">&rarr;</span>
                </a>
              </motion.div>
            </motion.div>

            {!forceComplete && <HeroScrollStages progress={progress} />}
          </div>
        </div>
      </section>
    </div>
  );
}
