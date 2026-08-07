"use client";

import { motion } from "framer-motion";
import SectionV2 from "@/components/v2/ui/SectionV2";
import AnimatedText from "@/components/ui/AnimatedText";
import { homeV2Content } from "@/content/v2/home";

const { closing } = homeV2Content;

export default function ClosingScene() {
  return (
    <SectionV2
      id="v2-closing"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 md:px-12 lg:px-20"
      ariaLabel="Closing call to action"
    >
      <div className="relative z-10 max-w-3xl flex flex-col items-center gap-8">
        <AnimatedText
          as="h2"
          className="text-[clamp(2.8rem,7vw,6rem)] font-medium leading-[1.04] tracking-tight text-text-primary"
        >
          {closing.headlinePart1}
        </AnimatedText>

        <AnimatedText
          as="span"
          className="block text-[clamp(2.8rem,7vw,6rem)] font-medium leading-[1.04] tracking-tight text-signal-main -mt-6"
          delay={0.5}
        >
          {closing.headlinePart2}
        </AnimatedText>

        <AnimatedText
          as="p"
          className="text-lg text-text-secondary max-w-md leading-relaxed"
          delay={0.9}
        >
          {closing.supporting}
        </AnimatedText>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
        >
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 bg-signal-main text-black-main text-sm font-medium px-7 py-3 rounded-sm hover:bg-text-primary transition-colors"
          >
            {closing.primaryCta}
            <span
              className="inline-block transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >
              &rarr;
            </span>
          </a>
        </motion.div>
      </div>

      <span className="sr-only">
        A dense central sphere of particles - representing focused AI
        capability - glows at the centre of the screen.
      </span>
    </SectionV2>
  );
}
