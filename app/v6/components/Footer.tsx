"use client";

const NAV_ITEMS = [
  { label: "Partnership", href: "#partnership" },
  { label: "How we help", href: "#journey" },
  { label: "Principles", href: "#principles" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="pt-footer">
      <div className="pt-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto auto",
            gap: "3rem",
            alignItems: "start",
          }}
          className="footer-grid"
        >
          {/* Left - branding */}
          <div className="footer-col-brand">
            <p className="pt-footer-wordmark" style={{ marginBottom: "0.75rem" }}>
              CLAROS
            </p>
            <p
              style={{
                fontSize: "0.875rem",
                lineHeight: 1.6,
                color: "var(--pt-text-muted)",
                maxWidth: "26rem",
              }}
            >
              An AI implementation partner for organisations that want working
              solutions, not just slides. We advise and execute &mdash; clarity
              before capability, ownership above all.
            </p>
          </div>

          {/* Centre - navigation */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
            className="footer-col-nav"
          >
            <p
              className="pt-label"
              style={{ marginBottom: "0.5rem" }}
            >
              Navigation
            </p>
            {NAV_ITEMS.map((item) => (
              <a key={item.label} href={item.href} className="pt-footer-link">
                {item.label}
              </a>
            ))}
          </div>

          {/* Right - contact */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
            className="footer-col-contact"
          >
            <p
              className="pt-label"
              style={{ marginBottom: "0.5rem" }}
            >
              Connect
            </p>
            <a
              href="https://linkedin.com/company/enxame"
              target="_blank"
              rel="noopener noreferrer"
              className="pt-footer-link"
            >
              LinkedIn
            </a>
            <a href="mailto:hello@enxame.com" className="pt-footer-link">
              hello@enxame.com
            </a>
            <a href="#" className="pt-footer-link">
              Privacy
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: "3rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--pt-line)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <p className="pt-footer-small">
            © {new Date().getFullYear()} CLAROS. All rights reserved.
          </p>
          <p
            className="pt-mono"
            style={{
              fontSize: "0.625rem",
              letterSpacing: "0.08em",
              color: "var(--pt-text-faint)",
            }}
          >
            v6.0 - partnership.theme
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
