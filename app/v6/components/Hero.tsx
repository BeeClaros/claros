"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.5, 0.95]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Parallax background image */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-10% 0",
          zIndex: 0,
          y: imageY,
          scale: imageScale,
        }}
      >
        <Image
          src="/hero-partnership.png"
          alt="Human hand and robotic hand performing a fist bump - symbolising the partnership between people and AI"
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center 40%",
            opacity: "var(--pt-art-opacity-ambient)",
            filter: "saturate(0.85) contrast(1.05)",
          }}
        />
        <div className="pt-hero-art-harmonize" aria-hidden="true" />
      </motion.div>

      {/* Dynamic gradient overlay */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          opacity: overlayOpacity,
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.3) 35%, rgba(10,10,10,0.5) 65%, rgba(10,10,10,1) 100%)",
        }}
      />

      {/* Warm glow near center */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,168,83,0.06) 0%, transparent 60%)",
          pointerEvents: "none",
          filter: "blur(60px)",
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        className="pt-container"
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          paddingTop: "var(--pt-nav-h)",
        }}
      >
        <div
          style={{
            maxWidth: "44rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <motion.div
            className="pt-overline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            AI implementation consultancy
          </motion.div>

          <motion.h1
            className="pt-hero-heading"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            Your AI{" "}
            <span style={{ color: "var(--pt-accent)" }}>partner.</span>
          </motion.h1>

          <motion.p
            className="pt-lead"
            style={{ maxWidth: "30rem" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            From strategy to shipped. We find where AI creates real value &mdash;
            then build and run it, alongside your team.
          </motion.p>

          <motion.div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
              marginTop: "0.5rem",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <a href="#contact" className="pt-btn-primary">
              Book an intro call <span className="pt-arrow">&rarr;</span>
            </a>
            <a href="#problem" className="pt-btn-ghost">
              See how it works
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <motion.div
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(180deg, var(--pt-accent), transparent)",
          }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
