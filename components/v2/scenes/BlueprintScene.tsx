"use client";

import { motion } from "framer-motion";
import SectionV2 from "@/components/v2/ui/SectionV2";
import AnimatedText from "@/components/ui/AnimatedText";
import { homeV2Content } from "@/content/v2/home";

const { blueprint } = homeV2Content;

const stepAccents: string[] = [
  "text-text-muted",
  "text-text-muted",
  "text-signal-secondary",
  "text-signal-human",
  "text-text-muted",
  "text-signal-main",
];

export default function BlueprintScene() {
  return (
    <SectionV2
      id="v2-blueprint"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20"
      ariaLabel="Solution design"
    >
      <div className="relative z-10 max-w-3xl w-full">
        <AnimatedText
          as="p"
          className="text-xs font-mono uppercase tracking-[0.2em] text-text-muted mb-6"
        >
          How solutions are built
        </AnimatedText>

        <AnimatedText
          as="h2"
          className="text-[clamp(1.6rem,3.5vw,3rem)] font-medium leading-[1.12] tracking-tight text-text-primary"
          delay={0.1}
        >
          {blueprint.headline}
        </AnimatedText>

        <AnimatedText
          as="p"
          className="mt-5 text-base text-text-secondary max-w-lg leading-relaxed"
          delay={0.2}
        >
          {blueprint.supporting}
        </AnimatedText>

        {/* Vertical numbered step list */}
        <div className="mt-12 relative">
          {/* Connecting line */}
          <div
            className="absolute left-[11px] top-4 bottom-4 w-px bg-gradient-to-b from-fine-line via-fine-line to-transparent"
            aria-hidden="true"
          />

          <ol className="space-y-0">
            {blueprint.steps.map((step, i) => (
              <motion.li
                key={step.id}
                className="relative flex items-start gap-5 py-4"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
              >
                {/* Dot */}
                <div
                  className={`relative z-10 w-[22px] h-[22px] rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    stepAccents[i] === "text-text-muted"
                      ? "border-fine-line bg-black-main"
                      : `border-current bg-black-main ${stepAccents[i]}`
                  }`}
                  aria-hidden="true"
                >
                  <span className={`text-[9px] font-mono ${stepAccents[i]}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-col gap-0.5 pt-0.5">
                  <span className={`text-sm font-medium ${stepAccents[i]}`}>
                    {step.label}
                  </span>
                  <span className="text-sm text-text-muted leading-relaxed">
                    {step.description}
                  </span>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </SectionV2>
  );
}
