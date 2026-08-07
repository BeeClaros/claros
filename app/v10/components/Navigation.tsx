"use client";

import { useEffect, useState, useCallback } from "react";
import PartnershipMark from "./PartnershipMark";

const LEFT_NAV = [
  { label: "What we do", href: "#what-we-do" },
  { label: "How we work", href: "#how-we-work" },
];

const RIGHT_NAV = [
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
      <nav className={`v10-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="v10-container v10-nav-grid">
          <div className="v10-nav-left v10-nav-desktop">
            {LEFT_NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="v10-nav-link"
                onClick={(e) => go(e, item.href)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#"
            className="v10-nav-logo"
            onClick={(e) => go(e, "#")}
            aria-label="CLAROS - back to top"
          >
            <PartnershipMark height={52} priority />
          </a>

          <div className="v10-nav-right v10-nav-desktop">
            {RIGHT_NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="v10-nav-link"
                onClick={(e) => go(e, item.href)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="v10-nav-contact"
              onClick={(e) => go(e, "#contact")}
            >
              Contact <span className="v10-arrow">&rarr;</span>
            </a>
          </div>

          <button
            className={`v10-hamburger ${open ? "open" : ""}`}
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

      <div className={`v10-mobile-menu ${open ? "open" : ""}`}>
        {[...LEFT_NAV, ...RIGHT_NAV].map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="v10-mobile-link"
            onClick={(e) => go(e, item.href)}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          className="v10-mobile-link"
          onClick={(e) => go(e, "#contact")}
        >
          Contact
        </a>
      </div>
    </>
  );
}
