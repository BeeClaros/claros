"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";
import { HERO_STAGES, type HeroStage } from "./heroStages";

function StageBlock({
  stage,
  progress,
}: {
  stage: HeroStage;
  progress: MotionValue<number>;
}) {
  const [a, b, c, d] = stage.range;

  const opacity = useTransform(
    progress,
    stage.holdToEnd ? [a, b, 1] : [a, b, c, d],
    stage.holdToEnd ? [0, 1, 1] : [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    stage.holdToEnd ? [a, b, 1] : [a, b, c, d],
    stage.holdToEnd ? [28, 0, 0] : [28, 0, 0, -20],
  );
  const filter = useTransform(
    progress,
    stage.holdToEnd ? [a, b, 1] : [a, b, c, d],
    stage.holdToEnd
      ? ["blur(6px)", "blur(0px)", "blur(0px)"]
      : ["blur(6px)", "blur(0px)", "blur(0px)", "blur(4px)"],
  );
  return (
    <div className="v8-hero-stage">
      <motion.div
        className="v8-hero-stage-inner"
        style={{ opacity, y, filter }}
      >
        <h2 className="v8-hero-stage-title">
          {stage.title}{" "}
          {stage.accent ? (
            <span className="v8-accent-text">{stage.accent}</span>
          ) : null}
        </h2>
        <p className="v8-hero-stage-phrase">{stage.phrase}</p>
        {stage.showCta ? (
          <a href="mailto:hello@beeclaros.com" className="v8-btn-primary v8-hero-stage-cta">
            Discuss your priorities <span className="v8-arrow">&rarr;</span>
          </a>
        ) : null}
      </motion.div>
    </div>
  );
}

type Props = {
  progress: MotionValue<number>;
};

export default function HeroScrollStages({ progress }: Props) {
  return (
    <div className="v8-hero-stages">
      {HERO_STAGES.map((stage) => (
        <StageBlock key={stage.id} stage={stage} progress={progress} />
      ))}
    </div>
  );
}
