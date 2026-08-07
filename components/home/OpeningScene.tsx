"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/ui/Section";
import AnimatedText from "@/components/ui/AnimatedText";
import { homeContent } from "@/content/home";

const { opening } = homeContent;

export default function OpeningScene() {
  const [labelIndex, setLabelIndex] = useState(0);
  const [showLabels, setShowLabels] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setShowLabels(true), 2000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!showLabels) return;
    intervalRef.current = setInterval(() => {
      setLabelIndex((prev) => (prev + 1) % opening.floatingLabels.length);
    }, 2400);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [showLabels]);

  return (
    <Section
      id="opening"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20"
      ariaLabel="Introduction"
    >
      <div className="relative z-10 max-w-4xl">
        <AnimatedText
          as="h1"
          className="text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1.05] tracking-tight text-text-primary"
        >
          {opening.headlinePart1}
        </AnimatedText>

        <AnimatedText
          as="span"
          className="block text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1.05] tracking-tight text-text-primary mt-2"
          delay={0.6}
        >
          {opening.headlinePart2}
        </AnimatedText>

        <AnimatedText
          as="p"
          className="mt-8 text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed"
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
            className="group inline-flex items-center gap-2 text-signal-main text-base border-b border-signal-main pb-1 hover:text-text-primary hover:border-text-primary transition-colors"
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
            href="#pattern"
            className="text-text-muted text-base hover:text-text-secondary transition-colors"
          >
            {opening.secondaryCta}
          </a>
        </motion.div>
      </div>

      {/* Floating labels within the field */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <AnimatePresence mode="wait">
          {showLabels && (
            <motion.span
              key={labelIndex}
              className="absolute font-mono text-xs text-text-muted/50 tracking-wider uppercase"
              style={{
                left: `${30 + (labelIndex * 17) % 50}%`,
                top: `${25 + (labelIndex * 13) % 40}%`,
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.8 }}
            >
              {opening.floatingLabels[labelIndex]}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Accessible description of the visual state */}
      <span className="sr-only">
        A dispersed field of points moves independently across the screen,
        representing the unstructured state of AI activity before focused
        analysis.
      </span>
    </Section>
  );
}
