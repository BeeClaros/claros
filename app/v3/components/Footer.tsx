import Link from "next/link";

const NAV_COLS = [
  {
    heading: "Work",
    links: [
      { label: "Approach",       href: "/v3#approach" },
      { label: "Assessment",     href: "/v3#assessment" },
      { label: "Implementation", href: "/v3#implementation" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Use Cases",  href: "/v3#use-cases" },
      { label: "Contact",    href: "/v3#contact" },
    ],
  },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--signal-bg-primary)",
        borderTop: "1px solid var(--signal-line-subtle)",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        className="signal-container"
        style={{
          paddingBlock: "clamp(3rem, 5vw, 4.5rem)",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "3rem",
            flexWrap: "wrap",
          }}
        >
          {/* Logo + descriptor */}
          <div style={{ flex: "1 1 16rem" }}>
            <Link
              href="/v3"
              className="signal-nav-logo"
              style={{ display: "block", marginBottom: "0.875rem" }}
            >
              Signal
            </Link>
            <p
              style={{
                fontFamily: "var(--font-signal-sans), sans-serif",
                fontSize: "0.875rem",
                lineHeight: 1.6,
                letterSpacing: "-0.006em",
                color: "var(--signal-text-muted)",
                maxWidth: "22rem",
                margin: 0,
              }}
            >
              AI implementation consultancy. We identify the strongest
              opportunities and move selected use cases into operation.
            </p>
          </div>

          {/* Nav columns */}
          <div
            style={{
              display: "flex",
              gap: "clamp(2.5rem, 6vw, 5rem)",
              flex: "0 1 auto",
            }}
          >
            {NAV_COLS.map((col) => (
              <div key={col.heading} style={{ minWidth: "8rem" }}>
                <p
                  className="signal-label"
                  style={{ color: "var(--signal-text-faint)", marginBottom: "1rem" }}
                >
                  {col.heading}
                </p>
                <ul
                  style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}
                >
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="signal-nav-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ height: "1px", background: "var(--signal-line-subtle)", marginTop: "2.5rem", marginBottom: "1.5rem" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <p
            className="signal-label"
            style={{ color: "var(--signal-text-faint)", margin: 0 }}
          >
            © {year} Signal
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link
              href="/privacy"
              style={{
                fontFamily: "var(--font-signal-sans), sans-serif",
                fontSize: "0.8125rem",
                color: "var(--signal-text-faint)",
                textDecoration: "none",
                letterSpacing: "-0.005em",
              }}
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
