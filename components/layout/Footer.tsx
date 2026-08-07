import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-fine-line/30 px-6 md:px-12 lg:px-20 py-8"
      role="contentinfo"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="text-sm text-text-primary font-medium">
            {siteConfig.name}
          </span>
          <span className="text-sm text-text-muted hidden sm:inline">
            &middot;
          </span>
          <span className="text-sm text-text-muted">
            {siteConfig.tagline}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
          <a
            href={`mailto:${siteConfig.email}`}
            className="hover:text-text-secondary transition-colors"
          >
            {siteConfig.email}
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-secondary transition-colors"
          >
            LinkedIn
          </a>
          <Link
            href="/privacy"
            className="hover:text-text-secondary transition-colors"
          >
            Privacy
          </Link>
          <span>&copy; {year}</span>
        </div>
      </div>
    </footer>
  );
}
