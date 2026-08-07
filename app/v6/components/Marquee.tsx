"use client";

const PHRASES = [
  "Partnership over products",
  "Assess, then implement",
  "Value over pilots",
  "Ownership over ambition",
  "Working solutions, not slides",
  "Judgment meets capability",
];

export default function Marquee() {
  // Duplicate the list so the -50% translate loops seamlessly.
  const items = [...PHRASES, ...PHRASES];

  return (
    <div className="pt-marquee" aria-hidden="true">
      <div className="pt-marquee-track">
        {items.map((phrase, i) => (
          <span key={i} className="pt-marquee-item">
            {phrase}
            <span className="pt-marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
