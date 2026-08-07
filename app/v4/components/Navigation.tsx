"use client";

/**
 * V4 Navigation - minimal fixed top bar.
 * Gains a backdrop-blur background on scroll.
 */

import { useEffect, useState } from "react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`v4-nav ${scrolled ? "scrolled" : ""}`}>
      <div
        className="v4-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <a href="/v4" className="v4-nav-logo">
          CLAROS
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
          <a href="#approach" className="v4-nav-link" style={{ display: "none" }}>
            Approach
          </a>
          <a href="#industries" className="v4-nav-link" style={{ display: "none" }}>
            Industries
          </a>
          <a
            href="#contact"
            className="v4-btn-primary"
            style={{ height: 40, fontSize: "0.8125rem" }}
          >
            Start a Conversation
          </a>
        </div>
      </div>
    </nav>
  );
}
