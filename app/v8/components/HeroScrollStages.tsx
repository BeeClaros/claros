"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";

type Stage = {
  id: string;
  title: string;
  accent?: string;
  phrase: string;
  range: [number, number, number, number];
  holdToEnd?: boolean;
  showCta?: boolean;
};

const STAGES: Stage[] = [
  {
    id: "assessment",
    title: "From scattered ideas",
    accent: "to clear priorities.",
    phrase: "Understand where AI creates real value for the business.",
    range: [0.08, 0.16, 0.30, 0.40],
  },
  {
    id: "build",
    title: "Practical solutions",
    accent: "that fit.",
    phrase: "Implement systems that work inside existing teams and processes.",
    range: [0.38, 0.46, 0.62, 0.72],
  },
  {
    id: "delivery",
    title: "Adoption that",
    accent: "lasts.",
    phrase: "Measure outcomes, support teams and expand what works.",
    range: [0.70, 0.78, 1, 1],
    holdToEnd: true,
    showCta: true,
  },
];

function StageBlock({
  stage,
  progress,
}: {
  stage: Stage;
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
          <a href="mailto:hello@enxame.ai" className="v8-btn-primary v8-hero-stage-cta">
            Talk to us <span className="v8-arrow">&rarr;</span>
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
      {STAGES.map((stage) => (
        <StageBlock key={stage.id} stage={stage} progress={progress} />
      ))}
    </div>
  );
}
