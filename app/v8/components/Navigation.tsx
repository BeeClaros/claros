"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import BeeLogo from "./BeeLogo";

const LEFT_NAV = [
  { label: "What we do", href: "/#what-we-do" },
  { label: "How we work", href: "/#how-we-work" },
];

const RIGHT_NAV = [
  { label: "Assessment", href: "/assessment" },
  { label: "Build", href: "/build" },
  { label: "Delivery", href: "/delivery" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/v8";

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
      const hashOnly = href.startsWith("/#");
      if (hashOnly && isHome) {
        e.preventDefault();
        setOpen(false);
        const id = href.replace("/#", "");
        if (!id) {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        const el = document.getElementById(id);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 72;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      } else {
        setOpen(false);
      }
    },
    [isHome]
  );

  return (
    <>
      <nav className={`v8-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="v8-container v8-nav-grid">
          <div className="v8-nav-left v8-nav-desktop">
            {LEFT_NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="v8-nav-link"
                onClick={(e) => go(e, item.href)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="/"
            className="v8-nav-logo"
            aria-label="CLAROS - back to home"
          >
            <BeeLogo height={30} />
          </a>

          <div className="v8-nav-right v8-nav-desktop">
            {RIGHT_NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="v8-nav-link"
                onClick={(e) => go(e, item.href)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="mailto:hello@enxame.ai"
              className="v8-nav-contact"
            >
              Contact <span className="v8-arrow">&rarr;</span>
            </a>
          </div>

          <button
            className={`v8-hamburger ${open ? "open" : ""}`}
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

      <div className={`v8-mobile-menu ${open ? "open" : ""}`}>
        {[...LEFT_NAV, ...RIGHT_NAV].map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="v8-mobile-link"
            onClick={(e) => go(e, item.href)}
          >
            {item.label}
          </a>
        ))}
        <a
          href="mailto:hello@enxame.ai"
          className="v8-mobile-link"
        >
          Contact
        </a>
      </div>
    </>
  );
}
