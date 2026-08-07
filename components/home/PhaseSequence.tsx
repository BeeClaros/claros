"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Section from "@/components/ui/Section";
import { homeContent } from "@/content/home";

const { phases } = homeContent;

const phaseData = [
  { ...phases.explore, key: "explore" },
  { ...phases.build, key: "build" },
  { ...phases.run, key: "run" },
] as const;

function PhaseBlock({
  phase,
  index,
}: {
  phase: (typeof phaseData)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30% 0px" });

  return (
    <div
      ref={ref}
      className="min-h-[70vh] flex flex-col justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.8,
          delay: 0.1,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <span className="font-mono text-xs uppercase tracking-wider text-signal-main">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-medium leading-tight tracking-tight text-text-primary">
          {phase.title}
        </h3>
        <p className="mt-4 text-lg md:text-xl text-text-secondary max-w-md leading-relaxed">
          {phase.copy}
        </p>
        <p className="mt-3 font-mono text-xs text-text-muted tracking-wider">
          {phase.detail}
        </p>
      </motion.div>
    </div>
  );
}

export default function PhaseSequence() {
  const noteRef = useRef<HTMLParagraphElement>(null);
  const noteInView = useInView(noteRef, { once: true, margin: "-20% 0px" });

  return (
    <Section
      id="phases"
      className="relative px-6 md:px-12 lg:px-20 py-12"
      ariaLabel="Three stages: Explore, Build, Run"
    >
      <div className="relative z-10 max-w-3xl">
        {phaseData.map((phase, i) => (
          <PhaseBlock key={phase.key} phase={phase} index={i} />
        ))}

        <motion.p
          ref={noteRef}
          className="mt-8 mb-16 text-base text-text-muted max-w-lg leading-relaxed"
          initial={{ opacity: 0 }}
          animate={noteInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {phases.note}
        </motion.p>
      </div>

      <span className="sr-only">
        The point field transitions through three consecutive states representing
        Explore, Build, and Run - the three stages of the consultancy&apos;s work.
      </span>
    </Section>
  );
}
