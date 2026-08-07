"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navigation, primaryAction } from "@/config/navigation";
import { siteConfig } from "@/config/site";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    closeRef.current?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-[60] bg-black-main flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-center justify-between px-6 h-16">
            <span className="text-text-primary font-medium text-lg tracking-tight">
              {siteConfig.name}
            </span>
            <button
              ref={closeRef}
              onClick={onClose}
              className="flex items-center justify-center w-11 h-11 text-text-primary"
              aria-label="Close menu"
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
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </svg>
            </button>
          </div>

          <nav
            className="flex-1 flex flex-col justify-center px-6 gap-2"
            aria-label="Mobile navigation"
          >
            {navigation.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + i * 0.06,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block text-2xl text-text-muted hover:text-text-primary transition-colors py-3"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.1 + navigation.length * 0.06,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="mt-4 pt-4 border-t border-fine-line"
            >
              <Link
                href={primaryAction.href}
                onClick={onClose}
                className="group inline-flex items-center gap-2 text-xl text-signal-main py-3"
              >
                {primaryAction.label}
                <span
                  className="inline-block transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  &rarr;
                </span>
              </Link>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
