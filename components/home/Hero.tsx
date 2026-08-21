"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import HiveScrollHint from "@/components/hive/HiveScrollHint";
import HeroScrollStages from "./HeroScrollStages";
import { useHeroScrollSnap } from "./useHeroScrollSnap";

const HiveVideo = dynamic(() => import("@/components/hive/HiveVideo"), { ssr: false });

const EASE = [0.22, 1, 0.36, 1] as const;

const TYPED_TITLE = "The discipline to build.";
const TYPED_SUBTITLE =
  "We help organisations decide where AI can create measurable value, implement what fits their business, and make it work with the teams who use it.";

const TYPE_SPEED_TITLE = 38;
const TYPE_SPEED_SUB = 28;
const TITLE_START_DELAY = 600;
const SUB_START_DELAY = 1200;

function useTypewriter(
  text: string,
  speed: number,
  startDelay: number,
  trigger: boolean,
) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  const reset = useCallback(() => {
    idx.current = 0;
    setDisplayed("");
    setDone(false);
  }, []);

  useEffect(() => {
    if (!trigger) {
      reset();
      return;
    }

    const delayId = setTimeout(() => {
      const tick = () => {
        idx.current += 1;
        setDisplayed(text.slice(0, idx.current));
        if (idx.current >= text.length) {
          setDone(true);
        }
      };
      const iv = setInterval(tick, speed);
      tick();
      return () => clearInterval(iv);
    }, startDelay);

    return () => clearTimeout(delayId);
  }, [trigger, text, speed, startDelay, reset]);

  return { displayed, done };
}

export default function Hero() {
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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

  useHeroScrollSnap(pinRef, mounted && !forceComplete);

  const title = useTypewriter(
    TYPED_TITLE,
    TYPE_SPEED_TITLE,
    TITLE_START_DELAY,
    mounted && !forceComplete,
  );
  const subtitle = useTypewriter(
    TYPED_SUBTITLE,
    TYPE_SPEED_SUB,
    SUB_START_DELAY,
    title.done,
  );

  const showCta = forceComplete || subtitle.done;

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
              <h1 className="v8-hero-title">
                The clarity to choose.{" "}
                <span className="v8-accent-text">
                  {forceComplete ? (
                    TYPED_TITLE
                  ) : (
                    <>
                      {title.displayed}
                      {!title.done && (
                        <span className="hero-caret" aria-hidden="true" />
                      )}
                    </>
                  )}
                </span>
              </h1>

              <p
                className="v8-lead"
                style={{
                  marginTop: "1.75rem",
                  maxWidth: "34rem",
                  minHeight: "4.5em",
                }}
              >
                {forceComplete ? (
                  TYPED_SUBTITLE
                ) : (
                  <>
                    {subtitle.displayed}
                    {title.done && !subtitle.done && (
                      <span className="hero-caret hero-caret--sub" aria-hidden="true" />
                    )}
                  </>
                )}
              </p>

              <motion.div
                style={{
                  marginTop: "2.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  flexWrap: "wrap",
                }}
                initial={forceComplete ? false : { opacity: 0, y: 20 }}
                animate={
                  showCta
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, ease: EASE }}
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

      <style>{`
        .hero-caret {
          display: inline-block;
          width: 3px;
          height: 0.85em;
          margin-left: 2px;
          vertical-align: baseline;
          background: var(--v8-lime);
          animation: hero-blink 0.6s step-end infinite;
        }
        .hero-caret--sub {
          width: 2px;
          height: 0.9em;
        }
        @keyframes hero-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-caret { animation: none; display: none; }
        }
      `}</style>
    </div>
  );
}
