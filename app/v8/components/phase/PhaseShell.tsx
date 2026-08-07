"use client";

import type { ReactNode } from "react";
import Navigation from "../Navigation";
import Footer from "../Footer";

export default function PhaseShell({ children }: { children: ReactNode }) {
  return (
    <div
      className="v8-theme"
      style={{ minHeight: "100vh", backgroundColor: "var(--v8-bg-primary)" }}
    >
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
