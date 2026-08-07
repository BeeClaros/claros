"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const beeY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const beeOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const swarmY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section
      ref={ref}
      id="top"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "var(--hv-nav-h)",
      }}
    >
      {/* distant coordinated swarm (generated) */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          y: swarmY,
          opacity: 0.5,
          maskImage:
            "linear-gradient(90deg, transparent 0%, transparent 34%, black 78%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, transparent 34%, black 78%)",
        }}
      >
        <Image
          src="/v7/bg-swarm.png"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "right center" }}
        />
      </motion.div>

      {/* soft honey glow behind the bee */}
      <div
        className="hv-glow"
        style={{ top: "22%", right: "10%", width: 520, height: 520 }}
      />

      <div
        className="hv-container hv-grid"
        style={{ position: "relative", zIndex: 2, alignItems: "center", rowGap: "3rem" }}
      >
        {/* Text */}
        <div style={{ maxWidth: "40rem" }} className="hero-copy">
          <motion.div
            className="hv-overline"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          >
            AI adoption &amp; implementation
          </motion.div>

          <motion.h1
            className="hv-hero-title"
            style={{ marginTop: "1.5rem" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            AI works better when the business{" "}
            <span className="hv-accent-text">works with it.</span>
          </motion.h1>

          <motion.p
            className="hv-lead"
            style={{ marginTop: "1.75rem", maxWidth: "34rem" }}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
          >
            We help organisations find where AI creates real value, implement the
            right solutions and build the foundations to use them across the
            business.
          </motion.p>

          <motion.div
            style={{
              marginTop: "2.25rem",
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          >
            <a href="#assessment" className="hv-btn-primary">
              Start with an assessment <span className="hv-arrow">&rarr;</span>
            </a>
            <a href="#how-we-work" className="hv-btn-text">
              See how we work <span className="hv-arrow">&rarr;</span>
            </a>
          </motion.div>

          <motion.p
            className="hv-label"
            style={{ marginTop: "2.5rem" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9, ease: EASE }}
          >
            From opportunity discovery to implementation and long-term adoption.
          </motion.p>
        </div>

        {/* Hero bee (generated) - hidden on small screens */}
        <motion.div
          className="hero-bee"
          style={{ y: beeY, opacity: beeOpacity }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.4, ease: EASE }}
        >
          <div
            className="hv-bee-float hero-bee-img"
            style={{
              position: "relative",
              width: "min(520px, 44vw)",
              aspectRatio: "1 / 1",
              background: "transparent",
            }}
          >
            <Image
              src="/v7/bee-hero.png"
              alt="Abstract mechanical bee - the CLAROS symbol"
              fill
              priority
              unoptimized
              sizes="(max-width: 900px) 0px, 44vw"
              style={{ objectFit: "contain", background: "transparent" }}
            />
          </div>
        </motion.div>
      </div>

      <style>{`
        .hero-copy { grid-column: 1 / 7 !important; }
        .hero-bee { grid-column: 7 / -1 !important; display: flex; justify-content: center; background: transparent; }
        .hero-bee-img, .hero-bee-img img { background: transparent !important; }
        @media (max-width: 900px) {
          .hero-copy { grid-column: 1 / -1 !important; }
          .hero-bee { display: none !important; }
        }
      `}</style>
    </section>
  );
}
