"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";

type Props = {
  progress: MotionValue<number>;
};

export default function HiveScrollHint({ progress }: Props) {
  const opacity = useTransform(progress, [0, 0.05, 0.92, 1], [0, 1, 1, 0]);
  const barScale = useTransform(progress, [0, 1], [0, 1]);

  return (
    <motion.div className="v8-hero-scroll-hint" style={{ opacity }} aria-hidden="true">
      <div className="v8-hero-scroll-hint-track">
        <motion.div className="v8-hero-scroll-hint-bar" style={{ scaleX: barScale }} />
      </div>
      <span className="v8-hero-scroll-hint-text">Scroll</span>
    </motion.div>
  );
}
