"use client";

import Section from "@/components/ui/Section";
import AnimatedText from "@/components/ui/AnimatedText";
import { homeContent } from "@/content/home";

const { finalState } = homeContent;

export default function FinalScene() {
  return (
    <Section
      id="final"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 py-24"
      ariaLabel="Closing"
    >
      <div className="relative z-10 max-w-3xl">
        <AnimatedText
          as="h2"
          className="text-[clamp(2rem,5vw,4rem)] font-medium leading-tight tracking-tight text-text-primary"
        >
          {finalState.headline}
        </AnimatedText>

        <AnimatedText
          as="p"
          className="mt-6 text-lg md:text-xl text-text-secondary max-w-md leading-relaxed"
          delay={0.3}
        >
          {finalState.supporting}
        </AnimatedText>

        <AnimatedText as="div" className="mt-10" delay={0.6}>
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 text-signal-main text-lg border-b border-signal-main pb-1 hover:text-text-primary hover:border-text-primary transition-colors"
          >
            {finalState.primaryCta}
            <span
              className="inline-block transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >
              &rarr;
            </span>
          </a>
        </AnimatedText>
      </div>

      <span className="sr-only">
        The full point field is now coordinated, calm and alive, with subtle
        ongoing movement suggesting continuous improvement.
      </span>
    </Section>
  );
}
