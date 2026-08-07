"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";

const IDEAS = [
  {
    num: "01",
    title: "Scattered experiments",
    copy: "Ideas and pilots multiply, but they do not connect into one working system.",
  },
  {
    num: "02",
    title: "Unclear priorities",
    copy: "It is hard to know what to do first - and where the business value is real.",
  },
  {
    num: "03",
    title: "Adoption that stalls",
    copy: "Solutions are introduced, then fade. They never become part of daily work.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function FrictionRow({
  idea,
  index,
  progress,
  live,
}: {
  idea: (typeof IDEAS)[number];
  index: number;
  progress: MotionValue<number>;
  live: boolean;
}) {
  const start = 0.08 + index * 0.28;
  const mid = start + 0.2;
  const opacity = useTransform(
    progress,
    [start, mid],
    live ? [0.28, 1] : [1, 1],
    { clamp: true }
  );
  const x = useTransform(progress, [start, mid], live ? [36, 0] : [0, 0], {
    clamp: true,
  });
  const bar = useTransform(progress, [start, mid], live ? [0, 1] : [1, 1], {
    clamp: true,
  });

  return (
    <motion.article className="problem-row-item" style={{ opacity, x }}>
      <div className="problem-row-index">{idea.num}</div>
      <div className="problem-row-body">
        <motion.span
          className="problem-row-bar"
          aria-hidden="true"
          style={{ scaleX: bar }}
        />
        <h3 className="problem-row-title">{idea.title}</h3>
        <p className="v8-body problem-row-copy">{idea.copy}</p>
      </div>
    </motion.article>
  );
}

export default function Problem() {
  const ref = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.15,
    margin: "0px 0px -80px 0px",
  });
  const reducedMotion = useReducedMotion();
  const live = reducedMotion !== true;

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.85", "end 0.45"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 28 });

  const intro: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: live ? 0.12 : 0 } },
  };
  const item: Variants = {
    hidden: live ? { opacity: 0, y: 24 } : { opacity: 1, y: 0 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: live ? 0.8 : 0, ease: EASE },
    },
  };

  return (
    <section
      ref={ref}
      className="v8-section"
      style={{ background: "var(--v8-bg-contrast)" }}
    >
      <div className="v8-container">
        <div className="problem-layout">
          <motion.div
            className="problem-sticky"
            variants={intro}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <motion.div className="v8-overline" variants={item}>
              The problem
            </motion.div>
            <motion.h2
              className="v8-section-title problem-headline"
              variants={item}
              style={{ marginTop: "1.35rem" }}
            >
              More AI activity is not{" "}
              <em className="problem-em">more AI value.</em>
            </motion.h2>
            <motion.p
              className="v8-lead"
              variants={item}
              style={{ marginTop: "1.5rem" }}
            >
              Teams ship experiments. Tools multiply. Without clear priorities,
              ownership and practical adoption, activity stays fragmented - and
              never becomes business value.
            </motion.p>
          </motion.div>

          <div ref={listRef} className="problem-list">
            {IDEAS.map((idea, i) => (
              <FrictionRow
                key={idea.num}
                idea={idea}
                index={i}
                progress={progress}
                live={live}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .problem-layout {
          display: grid;
          grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.15fr);
          gap: clamp(2.5rem, 6vw, 5.5rem);
          align-items: start;
        }
        .problem-sticky {
          position: sticky;
          top: calc(var(--v8-nav-h) + 2rem);
        }
        .problem-headline {
          max-width: 11ch;
          font-size: clamp(2.35rem, 4.5vw, 3.6rem);
        }
        .problem-em {
          font-style: normal;
          color: var(--v8-lime-deep);
        }
        .problem-list {
          display: flex;
          flex-direction: column;
          border-top: 1px solid var(--v8-line);
        }
        .problem-row-item {
          display: grid;
          grid-template-columns: 4.5rem 1fr;
          gap: clamp(1rem, 2vw, 1.75rem);
          padding: clamp(1.6rem, 3vw, 2.25rem) 0;
          border-bottom: 1px solid var(--v8-line);
        }
        .problem-row-index {
          font-family: var(--font-v8-mono), monospace;
          font-size: 0.8125rem;
          letter-spacing: 0.1em;
          color: var(--v8-text-muted);
          padding-top: 0.35rem;
        }
        .problem-row-body {
          min-width: 0;
        }
        .problem-row-bar {
          display: block;
          width: 3rem;
          height: 2px;
          margin-bottom: 1rem;
          background: var(--v8-lime);
          transform-origin: left center;
        }
        .problem-row-title {
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: clamp(1.45rem, 2.6vw, 2rem);
          font-weight: 500;
          letter-spacing: -0.025em;
          line-height: 1.15;
          color: var(--v8-text-primary);
        }
        .problem-row-copy {
          margin-top: 0.7rem;
          max-width: 36ch;
        }
        @media (max-width: 900px) {
          .problem-layout {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .problem-sticky {
            position: relative;
            top: auto;
          }
          .problem-headline {
            max-width: 14ch;
          }
        }
        @media (max-width: 520px) {
          .problem-row-item {
            grid-template-columns: 2.75rem 1fr;
            gap: 0.85rem;
          }
        }
      `}</style>
    </section>
  );
}
