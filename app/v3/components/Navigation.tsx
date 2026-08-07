"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Approach",       href: "/v3#approach" },
  { label: "Assessment",     href: "/v3#assessment" },
  { label: "Implementation", href: "/v3#implementation" },
  { label: "Use Cases",      href: "/v3#use-cases" },
  { label: "Contact",        href: "/v3#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`signal-nav${scrolled ? " scrolled" : ""}`}
      aria-label="Main navigation"
    >
      <div
        className="signal-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          gap: "2rem",
        }}
      >
        {/* Logo */}
        <Link href="/v3" className="signal-nav-logo" aria-label="Signal home">
          Signal
        </Link>

        {/* Nav links - hidden on small screens */}
        <div
          role="list"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(1rem, 2.2vw, 2rem)",
            flex: 1,
            justifyContent: "center",
          }}
          className="signal-nav-links-desktop"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="signal-nav-link"
              role="listitem"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Primary CTA */}
        <a href="#contact" className="signal-btn-primary signal-nav-cta">
          Start a conversation
          <span className="signal-arrow" aria-hidden="true">↗</span>
        </a>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .signal-nav-links-desktop {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          .signal-nav-cta {
            font-size: 0.8125rem;
            padding-inline: 14px;
            min-height: 40px;
          }
        }
      `}</style>
    </nav>
  );
}
