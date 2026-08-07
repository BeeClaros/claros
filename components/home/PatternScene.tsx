"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useInView,
  AnimatePresence,
} from "framer-motion";
import Section from "@/components/ui/Section";
import { homeContent } from "@/content/home";

const { pattern } = homeContent;

// Container is 210vh. Sticky is 100vh. Active scroll = 110vh.
// Thresholds split that into Q1: 30%, Q2: 37%, Q3: 33% - Q1 is shorter by design.
const THRESHOLDS = [0.30, 0.67];

export default function PatternScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const conclusionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const conclusionInView = useInView(conclusionRef, {
    once: true,
    margin: "-15% 0px",
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (progress < THRESHOLDS[0]) setActiveIndex(0);
    else if (progress < THRESHOLDS[1]) setActiveIndex(1);
    else setActiveIndex(2);
  });

  return (
    <Section
      id="pattern"
      className="relative"
      ariaLabel="Understanding the organisation"
    >
      <div ref={containerRef} className="relative min-h-[210vh]">
        <div className="sticky top-0 min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 py-24">
          <div className="relative z-10 max-w-3xl">
            <div className="min-h-[120px] md:min-h-[160px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeIndex}
                  className="text-[clamp(1.5rem,3.5vw,2.75rem)] font-medium leading-snug tracking-tight text-text-primary"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {pattern.questions[activeIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={conclusionRef}
        className="relative z-10 px-6 md:px-12 lg:px-20 pb-24 md:pb-32"
      >
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          animate={conclusionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-[clamp(1.25rem,2.5vw,2rem)] font-medium text-text-primary leading-snug">
            {pattern.statement}
          </p>
          <p className="mt-6 text-base md:text-lg text-text-secondary max-w-xl leading-relaxed">
            {pattern.explanation}
          </p>
        </motion.div>
      </div>

      <span className="sr-only">
        The points begin forming clusters and relationships, representing how
        patterns and opportunities emerge from systematic analysis of the
        organisation. Questions appear one at a time as you scroll:{" "}
        {pattern.questions.join(". ")}. {pattern.statement}{" "}
        {pattern.explanation}
      </span>
    </Section>
  );
}
