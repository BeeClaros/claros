"use client";

import { useEffect, useState, useCallback } from "react";

const NAV_ITEMS = [
  { label: "What we do", href: "#what-we-do" },
  { label: "How we work", href: "#how-we-work" },
  { label: "Who we help", href: "#who-we-help" },
  { label: "Insights", href: "#insights" },
  { label: "About", href: "#about" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    },
    []
  );

  return (
    <>
      <nav className={`ed-nav ${scrolled ? "scrolled" : ""}`}>
        <div
          className="ed-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Wordmark */}
          <a href="#" className="ed-nav-wordmark">
            CLAROS
          </a>

          {/* Desktop links */}
          <div
            className="ed-nav-links-desktop"
            style={{ display: "flex", alignItems: "center", gap: "2rem" }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="ed-nav-link"
                onClick={(e) => handleClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ed-nav-contact"
              onClick={(e) => handleClick(e, "#contact")}
            >
              Contact <span className="ed-arrow">→</span>
            </a>
          </div>

          {/* Hamburger */}
          <button
            className={`ed-hamburger ${mobileOpen ? "open" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div className={`ed-mobile-menu ${mobileOpen ? "open" : ""}`}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="ed-mobile-menu-link"
            onClick={(e) => handleClick(e, item.href)}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          className="ed-mobile-menu-link"
          onClick={(e) => handleClick(e, "#contact")}
        >
          Contact
        </a>
      </div>
    </>
  );
}
