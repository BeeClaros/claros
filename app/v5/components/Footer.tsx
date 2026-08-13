"use client";

const NAV_ITEMS = [
  { label: "What we do", href: "#what-we-do" },
  { label: "How we work", href: "#how-we-work" },
  { label: "Who we help", href: "#who-we-help" },
  { label: "Assessment", href: "#assessment" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="ed-footer">
      <div className="ed-container">
        <div
          className="ed-grid"
          style={{ rowGap: "2.5rem" }}
        >
          {/* Left - wordmark and description */}
          <div style={{ gridColumn: "1 / span 4" }} className="footer-col-left">
            <p className="ed-footer-wordmark" style={{ marginBottom: "1rem" }}>
              CLAROS
            </p>
            <p className="ed-footer-desc">
              AI adoption and implementation for organisations that want
              measurable business value.
            </p>
          </div>

          {/* Centre - navigation */}
          <div
            style={{
              gridColumn: "6 / span 3",
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
            className="footer-col-nav"
          >
            <p className="ed-footer-label">
              Navigation
            </p>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="ed-footer-link"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right - contact & legal */}
          <div
            style={{
              gridColumn: "10 / span 3",
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
            className="footer-col-contact"
          >
            <p className="ed-footer-label">
              Connect
            </p>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ed-footer-link"
            >
              LinkedIn
            </a>
            <a href="mailto:hello@beeclaros.com" className="ed-footer-link">
              hello@beeclaros.com
            </a>
            <a href="#" className="ed-footer-link">
              Privacy
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: "3rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--ed-line)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <p className="ed-footer-small">
            © {new Date().getFullYear()} CLAROS. All rights reserved.
          </p>
          <p className="ed-coord" style={{ fontSize: "0.625rem" }}>
            v5.0 - editorial.theme
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-col-left,
          .footer-col-nav,
          .footer-col-contact {
            grid-column: 1 / -1 !important;
          }
        }
      `}</style>
    </footer>
  );
}
