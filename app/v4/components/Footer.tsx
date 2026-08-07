/**
 * V4 Footer - very minimal.
 * Logo, navigation, LinkedIn, contact.
 */

export default function Footer() {
  return (
    <footer className="v4-footer">
      <div
        className="v4-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        <span
          className="v4-nav-logo"
          style={{ fontSize: "0.9375rem" }}
        >
          CLAROS
        </span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <a href="#approach" className="v4-footer-link">
            Approach
          </a>
          <a href="#industries" className="v4-footer-link">
            Industries
          </a>
          <a href="#contact" className="v4-footer-link">
            Contact
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="v4-footer-link"
          >
            LinkedIn
          </a>
        </div>

        <span className="v4-footer-link" style={{ cursor: "default" }}>
          &copy; {new Date().getFullYear()} CLAROS
        </span>
      </div>
    </footer>
  );
}
