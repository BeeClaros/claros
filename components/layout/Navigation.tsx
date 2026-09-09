"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import BeeLogo from "./BeeLogo";
import RegionToggle from "./RegionToggle";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const WORK_CASES = [
  { label: "Professional services", href: "/work#professional-services" },
  { label: "Healthcare", href: "/work#healthcare" },
  { label: "Logistics", href: "/work#logistics" },
  { label: "Finance", href: "/work#revenue-operations" },
  { label: "Recruitment", href: "/work#recruitment" },
];

const LEFT_NAV: NavItem[] = [
  { label: "What we do", href: "/#what-we-do" },
  { label: "How we work", href: "/#how-we-work" },
  { label: "Industries", href: "/work", children: WORK_CASES },
  { label: "Private AI", href: "/private-ai" },
];

const PHASE_NAV: NavItem[] = [
  { label: "Assessment", href: "/assessment" },
  { label: "Build", href: "/build" },
  { label: "Delivery", href: "/delivery" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

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
    [isHome],
  );

  return (
    <>
      <nav className={`v8-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="v8-container v8-nav-grid">
          <div className="v8-nav-left v8-nav-desktop">
            {LEFT_NAV.map((item) =>
              item.children ? (
                <div key={item.label} className="v8-nav-dropdown">
                  <a
                    href={item.href}
                    className="v8-nav-link"
                    onClick={(e) => go(e, item.href)}
                  >
                    {item.label}
                  </a>
                  <div className="v8-nav-dropdown-menu">
                    {item.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        className="v8-nav-dropdown-item"
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="v8-nav-link"
                  onClick={(e) => go(e, item.href)}
                >
                  {item.label}
                </a>
              )
            )}
          </div>

          <a
            href="/"
            className="v8-nav-logo"
            aria-label="CLAROS - back to home"
          >
            <BeeLogo height={30} />
          </a>

          <div className="v8-nav-right v8-nav-desktop">
            {!isHome &&
              PHASE_NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="v8-nav-link"
                  onClick={(e) => go(e, item.href)}
                >
                  {item.label}
                </a>
              ))}
            <RegionToggle />
            <a
              href="/#contact"
              className="v8-nav-contact"
              onClick={(e) => go(e, "/#contact")}
            >
              Contact <span className="v8-arrow">&rarr;</span>
            </a>
          </div>

          <div className="v8-nav-mobile-end">
            <RegionToggle />
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
        </div>
      </nav>

      <div className={`v8-mobile-menu ${open ? "open" : ""}`}>
        {(isHome ? LEFT_NAV : [...LEFT_NAV, ...PHASE_NAV]).map((item) => (
          <div key={item.label}>
            <a
              href={item.href}
              className="v8-mobile-link"
              onClick={(e) => go(e, item.href)}
            >
              {item.label}
            </a>
            {item.children && (
              <div className="v8-mobile-sub">
                {item.children.map((child) => (
                  <a
                    key={child.href}
                    href={child.href}
                    className="v8-mobile-sub-link"
                    onClick={() => setOpen(false)}
                  >
                    {child.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
        <a
          href="/#contact"
          className="v8-mobile-link"
          onClick={(e) => go(e, "/#contact")}
        >
          Contact
        </a>
      </div>
    </>
  );
}
