"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/ui/Section";
import AnimatedText from "@/components/ui/AnimatedText";
import { homeContent } from "@/content/home";

const { entryPoint } = homeContent;

export default function EntryPointScene() {
  const [activeRoute, setActiveRoute] = useState(0);

  return (
    <Section
      id="entry-point"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 py-24"
      ariaLabel="Choose your starting point"
    >
      <div className="relative z-10 max-w-3xl">
        <AnimatedText
          as="h2"
          className="text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-tight tracking-tight text-text-primary"
        >
          {entryPoint.question}
        </AnimatedText>

        <div
          className="mt-10 space-y-1"
          role="radiogroup"
          aria-label="Service entry point"
        >
          {entryPoint.routes.map((route, i) => (
            <button
              key={route.id}
              role="radio"
              aria-checked={activeRoute === i}
              onClick={() => setActiveRoute(i)}
              className={`w-full text-left py-4 px-4 rounded-sm transition-all min-h-[44px] border ${
                activeRoute === i
                  ? "border-fine-line bg-graphite/50"
                  : "border-transparent hover:border-fine-line/50"
              }`}
            >
              <span
                className={`block text-lg font-medium transition-colors ${
                  activeRoute === i
                    ? "text-signal-main"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                {route.title}
              </span>
            </button>
          ))}
        </div>

        <div aria-live="polite" aria-atomic="true" className="mt-6 min-h-[60px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeRoute}
              className="text-base md:text-lg text-text-secondary max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {entryPoint.routes[activeRoute].description}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 text-signal-main text-base border-b border-signal-main pb-1 hover:text-text-primary hover:border-text-primary transition-colors"
          >
            {entryPoint.primaryCta}
            <span
              className="inline-block transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >
              &rarr;
            </span>
          </a>
          <a
            href="/contact"
            className="text-text-muted text-base hover:text-text-secondary transition-colors"
          >
            {entryPoint.secondaryCta}
          </a>
        </div>
      </div>

      <span className="sr-only">
        The point field separates into three possible routes emerging from
        the same origin. Only the selected route is illuminated, representing
        the three ways to begin working with the consultancy.
      </span>
    </Section>
  );
}
