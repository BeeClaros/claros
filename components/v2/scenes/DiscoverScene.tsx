"use client";

import { motion } from "framer-motion";
import SectionV2 from "@/components/v2/ui/SectionV2";
import AnimatedText from "@/components/ui/AnimatedText";
import { homeV2Content } from "@/content/v2/home";

const { discover } = homeV2Content;

export default function DiscoverScene() {
  return (
    <SectionV2
      id="v2-discover"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20"
      ariaLabel="Discovery and diagnosis"
    >
      <div className="relative z-10 max-w-3xl">
        <AnimatedText
          as="p"
          className="text-xs font-mono uppercase tracking-[0.2em] text-signal-main mb-8"
        >
          How we start
        </AnimatedText>

        <AnimatedText
          as="h2"
          className="text-[clamp(1.6rem,3.5vw,3rem)] font-medium leading-[1.12] tracking-tight text-text-primary"
          delay={0.15}
        >
          {discover.intro}
        </AnimatedText>

        <div className="mt-12 space-y-0 border-t border-fine-line">
          {discover.questions.map((question, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-6 py-7 border-b border-fine-line"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <span className="text-xs font-mono text-text-muted tabular-nums mt-1 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                {question}
              </p>
            </motion.div>
          ))}
        </div>

        <AnimatedText
          as="p"
          className="mt-10 text-base text-text-muted max-w-md leading-relaxed"
          delay={0.4}
        >
          {discover.statement}
        </AnimatedText>
      </div>
    </SectionV2>
  );
}
