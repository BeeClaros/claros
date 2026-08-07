"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { navigation, primaryAction } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-signal-main focus:text-black-main focus:text-sm focus:font-medium focus:rounded-sm"
      >
        Skip to content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black-main/90 backdrop-blur-md border-b border-fine-line/30"
            : "bg-transparent"
        }`}
        role="banner"
      >
        <nav
          className="flex items-center justify-between px-6 md:px-12 lg:px-20 h-16 md:h-20"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="text-text-primary font-medium text-lg tracking-tight"
          >
            {siteConfig.name}
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-text-muted hover:text-text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={primaryAction.href}
              className="group inline-flex items-center gap-1.5 text-sm text-signal-main border-b border-signal-main pb-0.5 hover:text-text-primary hover:border-text-primary transition-colors"
            >
              {primaryAction.label}
              <span
                className="inline-block transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                &rarr;
              </span>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <button
            className="lg:hidden flex items-center justify-center w-11 h-11 text-text-primary"
            onClick={() => setMobileOpen(true)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label="Open menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </nav>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
