"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function BrandStatement() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      ref={ref}
      id="about"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--hv-bg-deep)",
        paddingBlock: "clamp(7rem, 16vw, 14rem)",
      }}
    >
      {/* full swarm background (generated) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.55,
          maskImage:
            "radial-gradient(ellipse 95% 90% at 50% 45%, black 0%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 95% 90% at 50% 45%, black 0%, transparent 78%)",
        }}
      >
        <Image
          src="/v7/bg-swarm.png"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      <div className="hv-glow" style={{ top: "30%", left: "50%", transform: "translateX(-50%)", width: 560, height: 560 }} />

      <div className="hv-container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <motion.h2
          className="hv-display"
          style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
            maxWidth: "20ch",
            margin: "0 auto",
            color: "var(--hv-text-primary)",
          }}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Alone, each part is limited.{" "}
          <span className="hv-accent-text">Together, they create a working system.</span>
        </motion.h2>

        <motion.p
          className="hv-lead"
          style={{ margin: "2rem auto 0", maxWidth: "36rem" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          AI creates more value when technology, people and processes move in the
          same direction.
        </motion.p>
      </div>
    </section>
  );
}
