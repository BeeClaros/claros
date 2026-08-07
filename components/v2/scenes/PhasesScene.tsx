"use client";

import { motion } from "framer-motion";
import SectionV2 from "@/components/v2/ui/SectionV2";
import AnimatedText from "@/components/ui/AnimatedText";
import { homeV2Content } from "@/content/v2/home";

const { phases } = homeV2Content;

export default function PhasesScene() {
  return (
    <SectionV2
      id="v2-phases"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20"
      ariaLabel="Engagement phases"
    >
      <div className="relative z-10 max-w-4xl w-full">
        <AnimatedText
          as="h2"
          className="text-[clamp(1.6rem,3.5vw,3rem)] font-medium leading-[1.12] tracking-tight text-text-primary mb-12"
        >
          {phases.headline}
        </AnimatedText>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-fine-line rounded-sm overflow-hidden">
          {phases.items.map((phase, i) => (
            <motion.div
              key={phase.number}
              className="bg-black-soft p-7 md:p-8 flex flex-col gap-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <span className="text-[clamp(2.8rem,4vw,3.5rem)] font-medium text-fine-line leading-none tabular-nums">
                {phase.number}
              </span>
              <div className="flex flex-col gap-3 flex-1">
                <h3 className="text-lg font-medium text-text-primary">
                  {phase.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed flex-1">
                  {phase.copy}
                </p>
                <p className="text-xs text-text-muted font-mono">
                  {phase.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-8 text-sm text-text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {phases.note}
        </motion.p>
      </div>
    </SectionV2>
  );
}
