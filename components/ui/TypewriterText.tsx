"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface UseTypewriterOptions {
  active: boolean;
  speed?: number;
  delay?: number;
}

export function useTypewriter(
  text: string,
  { active, speed = 38, delay = 0 }: UseTypewriterOptions
) {
  const prefersReducedMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!active) return;

    if (prefersReducedMotion) {
      const id = requestAnimationFrame(() => {
        setDisplayText(text);
        setIsComplete(true);
      });
      return () => cancelAnimationFrame(id);
    }

    let intervalId: ReturnType<typeof setInterval> | undefined;

    const timeoutId = setTimeout(() => {
      setDisplayText("");
      setIsComplete(false);
      let index = 0;
      intervalId = setInterval(() => {
        index += 1;
        setDisplayText(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(intervalId);
          setIsComplete(true);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, active, speed, delay, prefersReducedMotion]);

  if (!active) {
    return { displayText: "", isComplete: false };
  }

  if (prefersReducedMotion && !isComplete) {
    return { displayText: text, isComplete: true };
  }

  return { displayText, isComplete };
}

interface TypewriterTextProps {
  text: string;
  as?: "h2" | "p" | "span";
  className?: string;
  active: boolean;
  speed?: number;
  delay?: number;
}

export default function TypewriterText({
  text,
  as: Tag = "span",
  className = "",
  active,
  speed,
  delay,
}: TypewriterTextProps) {
  const { displayText } = useTypewriter(text, { active, speed, delay });

  return (
    <Tag className={className} aria-label={text}>
      {displayText}
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
