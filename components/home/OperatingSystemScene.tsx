"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Section from "@/components/ui/Section";
import AnimatedText from "@/components/ui/AnimatedText";
import { homeContent } from "@/content/home";

const { operatingSystem } = homeContent;

export default function OperatingSystemScene() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [eventIndex, setEventIndex] = useState(-1);

  useEffect(() => {
    if (!isInView) return;

    let current = 0;
    const showNext = () => {
      if (current < operatingSystem.events.length) {
        setEventIndex(current);
        current++;
        setTimeout(showNext, 1200);
      }
    };

    const timeout = setTimeout(showNext, 600);
    return () => clearTimeout(timeout);
  }, [isInView]);

  return (
    <Section
      id="operating-system"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 py-24"
      ariaLabel="How an AI initiative operates"
    >
      <div
        ref={ref}
        className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:block items-center justify-center gap-10 lg:min-h-[70vh] lg:flex lg:items-center"
      >
        {/* Events - left arm on desktop, above headline on mobile */}
        <div
          className="lg:absolute lg:left-0 xl:left-4 lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-auto max-w-[280px] lg:max-w-[240px] xl:max-w-[280px] order-1"
          aria-live="polite"
        >
          <AnimatePresence>
            {operatingSystem.events.map(
              (event, i) =>
                i <= eventIndex && (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3 mb-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    <span
                      className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                        i === eventIndex
                          ? "bg-signal-main"
                          : "bg-text-muted/40"
                      }`}
                      aria-hidden="true"
                    />
                    <span
                      className={`font-mono text-xs md:text-sm tracking-wide leading-snug ${
                        i === eventIndex
                          ? "text-text-primary"
                          : "text-text-muted"
                      }`}
                    >
                      {event}
                    </span>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>

        {/* Headline on the star hub at viewport centre */}
        <div className="order-2 mx-auto text-center max-w-xl px-4">
          <AnimatedText
            as="h2"
            className="text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-tight tracking-tight text-text-primary"
            delay={0.3}
          >
            {operatingSystem.headline}
          </AnimatedText>

          <AnimatedText
            as="p"
            className="mt-6 text-base md:text-lg text-text-secondary leading-relaxed"
            delay={0.6}
          >
            {operatingSystem.supporting}
          </AnimatedText>
        </div>
      </div>

      <span className="sr-only">
        A star-shaped network with a dense concentration of points at the centre.
        Multiple flows coordinate around this stable hub. Timed events show how a
        request enters, context is collected, AI prepares a recommendation, a
        person reviews it, the result returns to the business system, and
        performance becomes visible.
      </span>
    </Section>
  );
}
