"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionV2 from "@/components/v2/ui/SectionV2";
import AnimatedText from "@/components/ui/AnimatedText";
import { homeV2Content } from "@/content/v2/home";

const { opening } = homeV2Content;

export default function OpeningScene() {
  const [metricIndex, setMetricIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setMetricIndex((prev) => (prev + 1) % opening.metrics.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [mounted]);

  return (
    <SectionV2
      id="v2-opening"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20"
      ariaLabel="Introduction"
    >
      <div className="relative z-10 max-w-4xl">
        <AnimatedText
          as="h1"
          className="text-[clamp(2.4rem,5.5vw,4.8rem)] font-medium leading-[1.06] tracking-tight text-text-primary"
        >
          {opening.headlinePart1}
        </AnimatedText>

        <AnimatedText
          as="span"
          className="block text-[clamp(2.4rem,5.5vw,4.8rem)] font-medium leading-[1.06] tracking-tight text-signal-main mt-1"
          delay={0.55}
        >
          {opening.headlinePart2}
        </AnimatedText>

        <AnimatedText
          as="p"
          className="mt-8 text-lg md:text-xl text-text-secondary max-w-lg leading-relaxed"
          delay={1.0}
        >
          {opening.supporting}
        </AnimatedText>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.7 }}
        >
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 bg-signal-main text-black-main text-sm font-medium px-5 py-2.5 rounded-sm hover:bg-text-primary transition-colors"
          >
            {opening.primaryCta}
            <span
              className="inline-block transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >
              &rarr;
            </span>
          </a>
          <a
            href="#v2-discover"
            className="inline-flex items-center gap-2 text-text-muted text-sm border border-fine-line px-5 py-2.5 rounded-sm hover:text-text-secondary hover:border-text-muted transition-colors"
          >
            {opening.secondaryCta}
          </a>
        </motion.div>
      </div>

      {/* Floating metric chip */}
      <div
        className="absolute bottom-16 right-8 md:right-16 pointer-events-none"
        aria-hidden="true"
      >
        <AnimatePresence mode="wait">
          {mounted && (
            <motion.div
              key={metricIndex}
              className="flex flex-col items-end gap-0.5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[clamp(1.6rem,3vw,2.4rem)] font-medium text-text-primary tabular-nums">
                {opening.metrics[metricIndex].value}
              </span>
              <span className="text-xs text-text-muted font-mono uppercase tracking-widest">
                {opening.metrics[metricIndex].label}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <span className="sr-only">
        Particles form a three-dimensional sphere that slowly rotates,
        representing the dispersed state of AI activity before focused
        analysis begins.
      </span>
    </SectionV2>
  );
}
