"use client";

import { useEffect, useState, useCallback } from "react";
import MechBee from "./MechBee";

const NAV_ITEMS = [
  { label: "What we do", href: "#what-we-do" },
  { label: "How we work", href: "#how-we-work" },
  { label: "Where we help", href: "#where-we-help" },
  { label: "About", href: "#about" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setOpen(false);
      const id = href.replace("#", "");
      if (!id) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    },
    []
  );

  return (
    <>
      <nav className={`ae-nav ${scrolled ? "scrolled" : ""}`}>
        <div
          className="ae-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <a href="#" className="ae-brand" onClick={(e) => go(e, "#")}>
            <MechBee variant="icon" size={28} />
            <span className="ae-wordmark">CLAROS</span>
          </a>

          <div
            className="ae-nav-desktop"
            style={{ display: "flex", alignItems: "center", gap: "2rem" }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="ae-nav-link"
                onClick={(e) => go(e, item.href)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ae-nav-contact"
              onClick={(e) => go(e, "#contact")}
            >
              Contact <span className="ae-arrow">&rarr;</span>
            </a>
          </div>

          <button
            className={`ae-hamburger ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`ae-mobile-menu ${open ? "open" : ""}`}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="ae-mobile-link"
            onClick={(e) => go(e, item.href)}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          className="ae-mobile-link"
          onClick={(e) => go(e, "#contact")}
        >
          Contact
        </a>
      </div>
    </>
  );
}
