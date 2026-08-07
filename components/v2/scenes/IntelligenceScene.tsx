"use client";

import { motion } from "framer-motion";
import SectionV2 from "@/components/v2/ui/SectionV2";
import AnimatedText from "@/components/ui/AnimatedText";
import { homeV2Content } from "@/content/v2/home";

const { intelligence } = homeV2Content;

const stackColors: string[] = [
  "border-text-muted/40 text-text-secondary",
  "border-signal-secondary/50 text-signal-secondary",
  "border-signal-human/50 text-signal-human",
  "border-text-muted/40 text-text-secondary",
  "border-signal-main/50 text-signal-main",
];

export default function IntelligenceScene() {
  return (
    <SectionV2
      id="v2-intelligence"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20"
      ariaLabel="System architecture"
    >
      <div className="relative z-10 max-w-3xl w-full">
        <AnimatedText
          as="p"
          className="text-xs font-mono uppercase tracking-[0.2em] text-text-muted mb-6"
        >
          The full picture
        </AnimatedText>

        <AnimatedText
          as="h2"
          className="text-[clamp(1.6rem,3.5vw,3rem)] font-medium leading-[1.12] tracking-tight text-text-primary"
          delay={0.1}
        >
          {intelligence.headline}
        </AnimatedText>

        <AnimatedText
          as="p"
          className="mt-5 text-base text-text-secondary max-w-lg leading-relaxed"
          delay={0.2}
        >
          {intelligence.supporting}
        </AnimatedText>

        {/* Vertical stack diagram */}
        <div className="mt-12 relative">
          {/* Connecting arrows */}
          <div
            className="absolute left-[28px] top-10 bottom-10 w-px bg-gradient-to-b from-fine-line to-fine-line/20"
            aria-hidden="true"
          />

          <ol className="space-y-2">
            {intelligence.stack.map((layer, i) => (
              <motion.li
                key={layer.id}
                className={`relative flex items-start gap-5 border rounded-sm px-5 py-4 bg-black-soft ${stackColors[i]}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex flex-col gap-0.5 flex-1">
                  <span className="text-sm font-medium">{layer.label}</span>
                  <span className="text-sm text-text-muted">
                    {layer.description}
                  </span>
                </div>

                {/* Arrow connector */}
                {i < intelligence.stack.length - 1 && (
                  <div
                    className="absolute -bottom-[11px] left-7 text-text-muted/30 text-xs leading-none z-10"
                    aria-hidden="true"
                  >
                    ↓
                  </div>
                )}
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </SectionV2>
  );
}
