export type HeroStage = {
  id: string;
  title: string;
  accent?: string;
  phrase: string;
  range: [number, number, number, number];
  holdToEnd?: boolean;
  showCta?: boolean;
};

export const HERO_STAGES: HeroStage[] = [
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

/** Centre of each stage's fully-visible hold zone. */
export const HERO_SNAP_POINTS: number[] = [
  0,
  ...HERO_STAGES.map((s) => (s.range[1] + s.range[2]) / 2),
  1,
];
