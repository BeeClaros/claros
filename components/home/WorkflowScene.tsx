"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Section from "@/components/ui/Section";
import { useTypewriter } from "@/components/ui/TypewriterText";
import { homeContent } from "@/content/home";

const { workflow } = homeContent;
const STEP_COUNT = workflow.steps.length;
const STATEMENT_COUNT = workflow.statements.length;

const STEP_INTERVAL_MS = 420;
const STATEMENT_SPEED = 32;

function stepColor(id: string): string {
  if (id === "ai-step") return "text-signal-secondary";
  if (id === "human-decision") return "text-signal-human";
  if (id === "result") return "text-signal-main";
  return "text-text-muted";
}

export default function WorkflowScene() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });
  const prefersReducedMotion = useReducedMotion();

  const headline = useTypewriter(workflow.headline, {
    active: isInView,
    speed: 42,
  });

  const supporting = useTypewriter(workflow.supporting, {
    active: isInView && headline.isComplete,
    speed: 28,
  });

  const [animatedSteps, setAnimatedSteps] = useState(0);
  const [statementIndex, setStatementIndex] = useState(0);
  const [statementsDone, setStatementsDone] = useState(false);

  const stepsReady = supporting.isComplete;
  const visibleSteps = stepsReady
    ? prefersReducedMotion
      ? STEP_COUNT
      : animatedSteps
    : 0;

  const statementsReady = visibleSteps >= STEP_COUNT;

  const currentStatement = workflow.statements[statementIndex] ?? "";
  const statement = useTypewriter(currentStatement, {
    active: statementsReady && !statementsDone,
    speed: STATEMENT_SPEED,
  });

  const delivery = useTypewriter(workflow.deliveryMessage, {
    active: statementsDone,
    speed: 26,
  });

  useEffect(() => {
    if (!stepsReady || prefersReducedMotion) return;

    let count = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const timeoutId = setTimeout(() => {
      count = 1;
      setAnimatedSteps(1);

      intervalId = setInterval(() => {
        count += 1;
        setAnimatedSteps(count);
        if (count >= STEP_COUNT && intervalId) clearInterval(intervalId);
      }, STEP_INTERVAL_MS);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [stepsReady, prefersReducedMotion]);

  useEffect(() => {
    if (!statementsReady || prefersReducedMotion) return;
    if (!statement.isComplete || statementsDone) return;

    const timeout = setTimeout(() => {
      if (statementIndex < STATEMENT_COUNT - 1) {
        setStatementIndex((prev) => prev + 1);
      } else {
        setStatementsDone(true);
      }
    }, 280);

    return () => clearTimeout(timeout);
  }, [
    statementsReady,
    statement.isComplete,
    statementIndex,
    statementsDone,
    prefersReducedMotion,
  ]);

  useEffect(() => {
    if (!statementsReady || !prefersReducedMotion) return;

    const id = requestAnimationFrame(() => {
      setStatementIndex(STATEMENT_COUNT - 1);
      setStatementsDone(true);
    });

    return () => cancelAnimationFrame(id);
  }, [statementsReady, prefersReducedMotion]);

  return (
    <Section
      id="workflow"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 py-24"
      ariaLabel="From selection to working solution"
    >
      <div ref={ref} className="relative z-10 max-w-4xl">
        <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-tight tracking-tight text-text-primary">
          {headline.displayText}
        </h2>

        <p className="mt-6 text-base md:text-lg text-text-secondary max-w-xl leading-relaxed min-h-[3.5rem] md:min-h-[3rem]">
          {supporting.displayText}
        </p>

        <div className="mt-12 flex flex-col md:flex-row md:flex-wrap md:items-center gap-3 md:gap-0 min-h-[80px] md:min-h-[24px]">
          {workflow.steps.map((step, i) => (
            <motion.div
              key={step.id}
              className="flex items-center"
              initial={false}
              animate={
                i < visibleSteps
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 8 }
              }
              transition={{
                duration: 0.35,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <span
                className={`font-mono text-xs uppercase tracking-wider ${stepColor(step.id)}`}
              >
                {step.label}
              </span>
              {i < STEP_COUNT - 1 && (
                <span
                  className={`hidden md:inline-block mx-3 text-fine-line transition-opacity duration-300 ${
                    i + 1 < visibleSteps ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden="true"
                >
                  &rarr;
                </span>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-12 space-y-4 min-h-[120px]">
          {prefersReducedMotion
            ? workflow.statements.map((text) => (
                <p
                  key={text}
                  className="text-base md:text-lg text-text-secondary leading-relaxed"
                >
                  {text}
                </p>
              ))
            : workflow.statements.map((text, i) => (
                <p
                  key={text}
                  className="text-base md:text-lg text-text-secondary leading-relaxed"
                >
                  {i < statementIndex || statementsDone
                    ? text
                    : i === statementIndex
                      ? statement.displayText
                      : ""}
                </p>
              ))}
        </div>

        <p className="mt-12 text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium text-text-primary leading-snug max-w-2xl min-h-[3rem]">
          {delivery.displayText}
        </p>
      </div>

      <span className="sr-only">
        {workflow.headline} {workflow.supporting} The workflow path:{" "}
        {workflow.steps.map((s) => s.label).join(", ")}.{" "}
        {workflow.statements.join(" ")} {workflow.deliveryMessage}
      </span>
    </Section>
  );
}
