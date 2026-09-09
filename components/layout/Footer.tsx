"use client";

import BeeLogo from "./BeeLogo";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="v8-footer">
      <div className="v8-container">
        <div className="footer-top">
          <div style={{ maxWidth: "26rem" }}>
            <a
              href="#top"
              className="v8-brand"
              style={{ color: "var(--v8-on-dark-primary)" }}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <BeeLogo height={26} className="v8-footer-logo" onDark />
            </a>
            <p
              className="v8-body"
              style={{ marginTop: "1.25rem", color: "var(--v8-on-dark-secondary)", fontSize: "0.95rem" }}
            >
              AI adoption and implementation for companies that need clear
              priorities and practical delivery.
            </p>
          </div>

          <div className="footer-links">
            <div>
              <div className="v8-label" style={{ marginBottom: "1rem" }}>
                Connect
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.65rem" }}>
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="v8-footer-link">
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <address
                    className="v8-footer-link"
                    style={{ fontStyle: "normal", cursor: "default", pointerEvents: "none" }}
                  >
                    30 N Gould St, Sheridan,<br />WY 82801, USA
                  </address>
                </li>
              </ul>
            </div>
            <div>
              <div className="v8-label" style={{ marginBottom: "1rem" }}>
                Company
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.65rem" }}>
                <li>
                  <a href="/about" className="v8-footer-link">
                    About us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="v8-label" style={{ marginBottom: "1rem" }}>
                Legal
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.65rem" }}>
                <li>
                  <a href="/privacy" className="v8-footer-link">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span style={{ color: "var(--v8-on-dark-muted)", fontSize: "0.8125rem" }}>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </span>
          <span
            className="v8-label"
            style={{ color: "var(--v8-on-dark-muted)" }}
          >
            Coordinated AI adoption
          </span>
        </div>
      </div>

      <style>{`
        .footer-top {
          display: flex;
          justify-content: space-between;
          gap: 3rem;
          flex-wrap: wrap;
        }
        .footer-links {
          display: flex;
          gap: clamp(2.5rem, 6vw, 5rem);
        }
        .footer-bottom {
          margin-top: 3rem;
          padding-top: 1.75rem;
          border-top: 1px solid var(--v8-on-dark-line);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
      `}</style>
    </footer>
  );
}
