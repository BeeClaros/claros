"use client";

import { motion } from "framer-motion";
import SectionV2 from "@/components/v2/ui/SectionV2";
import AnimatedText from "@/components/ui/AnimatedText";
import { homeV2Content } from "@/content/v2/home";

const { path } = homeV2Content;

const cardAccents = [
  "text-signal-main",
  "text-signal-secondary",
  "text-signal-human",
];

export default function PathScene() {
  return (
    <SectionV2
      id="v2-path"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20"
      ariaLabel="Entry points"
    >
      <div className="relative z-10 max-w-4xl w-full">
        <AnimatedText
          as="h2"
          className="text-[clamp(1.6rem,3.5vw,3rem)] font-medium leading-[1.12] tracking-tight text-text-primary"
        >
          {path.headline}
        </AnimatedText>

        <AnimatedText
          as="p"
          className="mt-4 text-base text-text-secondary max-w-lg leading-relaxed"
          delay={0.12}
        >
          {path.supporting}
        </AnimatedText>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {path.routes.map((route, i) => (
            <motion.div
              key={route.id}
              className="flex flex-col gap-5 border border-fine-line rounded-sm p-6 bg-black-soft hover:border-text-muted/40 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6% 0px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <span
                className={`text-[2rem] font-medium leading-none ${cardAccents[i]}`}
                aria-hidden="true"
              >
                {route.number}
              </span>

              <div className="flex flex-col gap-2 flex-1">
                <h3 className="text-base font-medium text-text-primary">
                  {route.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed flex-1">
                  {route.description}
                </p>
              </div>

              <a
                href="/contact"
                className={`group text-sm inline-flex items-center gap-1.5 ${cardAccents[i]} border-b border-current pb-0.5 w-fit hover:opacity-70 transition-opacity`}
              >
                {route.cta}
                <span
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  &rarr;
                </span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionV2>
  );
}
