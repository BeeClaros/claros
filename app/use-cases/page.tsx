import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: `Use Cases | ${siteConfig.name}`,
};

export default function UseCasesPage() {
  return (
    <main className="min-h-screen flex flex-col items-start justify-center px-6 md:px-12 lg:px-20">
      <h1 className="text-4xl font-medium text-text-primary tracking-tight">
        Use Cases
      </h1>
      <p className="mt-4 text-text-secondary">This page is coming soon.</p>
      <Link
        href="/"
        className="mt-6 text-sm text-text-muted hover:text-text-primary transition-colors"
      >
        &larr; Back to home
      </Link>
    </main>
  );
}
