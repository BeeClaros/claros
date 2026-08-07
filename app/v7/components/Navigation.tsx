"use client";

import { useEffect, useState, useCallback } from "react";
import BeeMark from "./BeeMark";

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
        const y = el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    },
    []
  );

  return (
    <>
      <nav className={`hv-nav ${scrolled ? "scrolled" : ""}`}>
        <div
          className="hv-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <a href="#" className="hv-brand" onClick={(e) => go(e, "#")}>
            <BeeMark size={32} />
            <span className="hv-wordmark">CLAROS</span>
          </a>

          <div
            className="hv-nav-desktop"
            style={{ display: "flex", alignItems: "center", gap: "2rem" }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hv-nav-link"
                onClick={(e) => go(e, item.href)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="hv-nav-contact"
              onClick={(e) => go(e, "#contact")}
            >
              Contact <span className="hv-arrow">&rarr;</span>
            </a>
          </div>

          <button
            className={`hv-hamburger ${open ? "open" : ""}`}
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

      <div className={`hv-mobile-menu ${open ? "open" : ""}`}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="hv-mobile-link"
            onClick={(e) => go(e, item.href)}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          className="hv-mobile-link"
          onClick={(e) => go(e, "#contact")}
        >
          Contact
        </a>
      </div>
    </>
  );
}
