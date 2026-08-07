import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: `Contact | ${siteConfig.name}`,
};

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col items-start justify-center px-6 md:px-12 lg:px-20">
      <h1 className="text-4xl font-medium text-text-primary tracking-tight">
        Start a conversation
      </h1>
      <p className="mt-4 text-text-secondary max-w-md">
        Tell us about your organisation and the challenge you are working on.
      </p>
      <a
        href={`mailto:${siteConfig.email}`}
        className="mt-6 group inline-flex items-center gap-2 text-signal-main border-b border-signal-main pb-1 hover:text-text-primary hover:border-text-primary transition-colors"
      >
        {siteConfig.email}
        <span
          className="inline-block transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        >
          &rarr;
        </span>
      </a>
      <Link
        href="/"
        className="mt-8 text-sm text-text-muted hover:text-text-primary transition-colors"
      >
        &larr; Back to home
      </Link>
    </main>
  );
}
