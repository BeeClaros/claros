"use client";

import { motion } from "framer-motion";
import SectionV2 from "@/components/v2/ui/SectionV2";
import AnimatedText from "@/components/ui/AnimatedText";
import { homeV2Content } from "@/content/v2/home";

const { focus } = homeV2Content;

const quadrantData = [
  {
    key: "highImpactLowEffort" as const,
    corner: "top-left",
    accent: "signal-main",
    accentClass: "text-signal-main border-signal-main/30",
  },
  {
    key: "highImpactHighEffort" as const,
    corner: "top-right",
    accent: "signal-secondary",
    accentClass: "text-signal-secondary border-signal-secondary/30",
  },
  {
    key: "lowImpactLowEffort" as const,
    corner: "bottom-left",
    accent: "text-muted",
    accentClass: "text-text-muted border-fine-line",
  },
  {
    key: "lowImpactHighEffort" as const,
    corner: "bottom-right",
    accent: "signal-human",
    accentClass: "text-signal-human border-signal-human/30",
  },
];

export default function FocusScene() {
  return (
    <SectionV2
      id="v2-focus"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20"
      ariaLabel="Prioritisation"
    >
      <div className="relative z-10 max-w-4xl w-full">
        <AnimatedText
          as="p"
          className="text-xs font-mono uppercase tracking-[0.2em] text-text-muted mb-6"
        >
          Prioritisation
        </AnimatedText>

        <AnimatedText
          as="h2"
          className="text-[clamp(1.6rem,3.5vw,3rem)] font-medium leading-[1.12] tracking-tight text-text-primary max-w-2xl"
          delay={0.1}
        >
          {focus.headline}
        </AnimatedText>

        <AnimatedText
          as="p"
          className="mt-5 text-base text-text-secondary max-w-lg leading-relaxed"
          delay={0.2}
        >
          {focus.supporting}
        </AnimatedText>

        {/* 2×2 quadrant matrix */}
        <motion.div
          className="mt-10 relative"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {/* Axis labels */}
          <div className="absolute -left-1 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-xs font-mono text-text-muted uppercase tracking-widest whitespace-nowrap pointer-events-none select-none hidden md:block">
            {focus.axes.y} ↑
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 text-xs font-mono text-text-muted uppercase tracking-widest whitespace-nowrap pointer-events-none select-none">
            {focus.axes.x} →
          </div>

          <div className="grid grid-cols-2 gap-px bg-fine-line rounded-sm overflow-hidden ml-0 md:ml-8">
            {quadrantData.map(({ key, accentClass }, i) => {
              const q = focus.quadrants[key];
              return (
                <motion.div
                  key={key}
                  className="bg-black-soft p-5 md:p-7 flex flex-col gap-2 min-h-[120px] md:min-h-[150px]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.08 }}
                >
                  <span className={`text-xs font-mono uppercase tracking-widest border-b pb-2 ${accentClass}`}>
                    {q.label}
                  </span>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {q.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </SectionV2>
  );
}
