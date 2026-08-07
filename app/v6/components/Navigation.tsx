"use client";

import { useEffect, useState, useCallback } from "react";

const NAV_ITEMS = [
  { label: "Partnership", href: "#partnership" },
  { label: "How we help", href: "#journey" },
  { label: "Principles", href: "#principles" },
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
      <nav className={`pt-nav ${scrolled ? "scrolled" : ""}`}>
        <div
          className="pt-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <a href="#" className="pt-nav-wordmark">
            CLAROS
          </a>

          <div
            className="pt-nav-links-desktop"
            style={{ display: "flex", alignItems: "center", gap: "2rem" }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="pt-nav-link"
                onClick={(e) => handleClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="pt-nav-cta"
              onClick={(e) => handleClick(e, "#contact")}
            >
              Book a call
            </a>
          </div>

          <button
            className={`pt-hamburger ${mobileOpen ? "open" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`pt-mobile-menu ${mobileOpen ? "open" : ""}`}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="pt-mobile-menu-link"
            onClick={(e) => handleClick(e, item.href)}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          className="pt-mobile-menu-link"
          onClick={(e) => handleClick(e, "#contact")}
        >
          Book a call
        </a>
      </div>
    </>
  );
}
