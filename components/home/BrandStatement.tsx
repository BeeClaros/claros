"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function BrandStatement() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);
  const reducedMotion = useReducedMotion();
  const live = reducedMotion !== true;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const swarmX = useTransform(scrollYProgress, [0, 1], ["0%", "2.5%"]);

  return (
    <section
      ref={ref}
      id="contact"
      className="v8-section"
      style={{
        background: "var(--v8-lime)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.32,
          mixBlendMode: "multiply",
          maskImage:
            "linear-gradient(to left, black 0%, black 22%, transparent 62%)",
          WebkitMaskImage:
            "linear-gradient(to left, black 0%, black 22%, transparent 62%)",
          x: live ? swarmX : 0,
        }}
      >
        <Image
          src="/images/bg-swarm.png"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "right center" }}
        />
      </motion.div>

      <div className="v8-container" style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            maxWidth: "38ch",
            marginLeft: "clamp(0rem, 6vw, 4.5rem)",
          }}
        >
          <h2
            className="v8-hero-title v8-reveal"
            style={{
              color: "var(--v8-text-primary)",
              fontSize: "clamp(2.25rem, 5vw, 4.25rem)",
            }}
          >
            Let&apos;s put your priorities to work.
          </h2>
          <p
            className="v8-lead v8-reveal v8-reveal-2"
            style={{
              marginTop: "2rem",
              maxWidth: "40rem",
              color: "var(--v8-text-primary)",
              opacity: 0.82,
            }}
          >
            Tell us where the business needs to move. We will help you decide
            what is worth doing next.
          </p>

          <div
            className="v8-reveal v8-reveal-3"
            style={{ marginTop: "2.5rem" }}
          >
            <a
              href="mailto:hello@beeclaros.com"
              className="v8-btn-dark"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              Talk to us <span className="v8-arrow">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
