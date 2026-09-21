import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You're Registered | CLAROS Roofing Webinar",
  description:
    "Thank you for registering. We'll confirm the date and send you everything you need before the webinar.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return <ThankYouContent />;
}

function ThankYouContent() {
  return (
    <>
      <style>{`
        .ty-wrap {
          min-height: calc(100vh - 64px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(2rem, 8vw, 6rem) var(--v8-gutter, clamp(1.25rem, 5vw, 4.5rem));
          background: var(--v8-bg-contrast);
        }
        .ty-card {
          max-width: 520px;
          text-align: center;
        }
        .ty-check {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--v8-lime-pale);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 28px;
        }
        .ty-check svg {
          width: 24px;
          height: 24px;
          color: var(--v8-lime-deep);
        }
        .ty-title {
          font-family: var(--font-v8-display, sans-serif);
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: var(--v8-text-primary);
          margin: 0;
        }
        .ty-body {
          font-family: var(--font-v8-sans, sans-serif);
          font-size: 1.0625rem;
          line-height: 1.7;
          color: var(--v8-text-secondary);
          margin: 20px 0 0;
        }
        .ty-detail {
          margin-top: 32px;
          padding: 20px 24px;
          background: var(--v8-bg-secondary);
          border-radius: var(--v8-radius);
          text-align: left;
        }
        .ty-detail-item {
          font-family: var(--font-v8-sans, sans-serif);
          font-size: 0.9375rem;
          color: var(--v8-text-secondary);
          line-height: 1.6;
          padding: 6px 0;
          padding-left: 20px;
          position: relative;
        }
        .ty-detail-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 14px;
          width: 8px;
          height: 2px;
          background: var(--v8-lime);
        }
        .ty-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 32px;
          font-family: var(--font-v8-sans, sans-serif);
          font-size: 0.8125rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: var(--v8-text-secondary);
          text-decoration: none;
          transition: color 200ms ease;
        }
        .ty-link:hover {
          color: var(--v8-text-primary);
        }
      `}</style>
      <div className="ty-wrap">
        <div className="ty-card">
          <div className="ty-check">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="ty-title">You&apos;re registered</h1>
          <p className="ty-body">
            Thank you for registering for the roofing webinar. We&apos;ll
            confirm the exact date and send you everything you need before the
            session.
          </p>
          <div className="ty-detail">
            <div className="ty-detail-item">
              The webinar is planned for early October, exact date TBC
            </div>
            <div className="ty-detail-item">
              You&apos;ll receive the recording even if you can&apos;t attend
              live
            </div>
            <div className="ty-detail-item">
              Check your inbox for a confirmation email
            </div>
          </div>
          <a href="https://beeclaros.com" className="ty-link">
            ← Back to beeclaros.com
          </a>
        </div>
      </div>
    </>
  );
}
