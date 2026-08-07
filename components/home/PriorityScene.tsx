"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import AnimatedText from "@/components/ui/AnimatedText";
import { homeContent } from "@/content/home";

const { priority } = homeContent;

type LensKey = keyof typeof priority.lenses;
const lensKeys: LensKey[] = ["value", "ease", "speed", "risk"];

export default function PriorityScene() {
  const [activeLens, setActiveLens] = useState<LensKey>("value");

  return (
    <Section
      id="priority"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 py-24"
      ariaLabel="Prioritisation"
    >
      <div className="relative z-10 max-w-3xl">
        <AnimatedText
          as="h2"
          className="text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-tight tracking-tight text-text-primary"
        >
          {priority.headline}
        </AnimatedText>

        <AnimatedText
          as="p"
          className="mt-6 text-base md:text-lg text-text-secondary max-w-xl leading-relaxed"
          delay={0.3}
        >
          {priority.supporting}
        </AnimatedText>

        <div
          className="mt-10 flex flex-wrap gap-2"
          role="radiogroup"
          aria-label="Priority lens"
        >
          {lensKeys.map((key) => (
            <button
              key={key}
              role="radio"
              aria-checked={activeLens === key}
              onClick={() => setActiveLens(key)}
              className={`px-4 py-2.5 text-sm font-medium rounded-sm transition-all min-h-[44px] min-w-[44px] ${
                activeLens === key
                  ? "bg-signal-main/15 text-signal-main border border-signal-main/30"
                  : "text-text-muted border border-fine-line hover:text-text-secondary hover:border-text-muted"
              }`}
            >
              {priority.lenses[key].label}
            </button>
          ))}
        </div>

        <div aria-live="polite" aria-atomic="true" className="mt-8">
          <p className="text-base md:text-lg text-text-primary leading-relaxed max-w-lg">
            {priority.lenses[activeLens].explanation}
          </p>
        </div>
      </div>

      <span className="sr-only">
        Multiple clusters of points are visible. A few become brighter and
        denser based on the selected priority lens, while others fade. This
        represents how opportunities are evaluated and ranked.
      </span>
    </Section>
  );
}
