"use client";

import { useGeoRegion } from "@/hooks/useGeoRegion";

export default function RegionToggle() {
  const { region, toggleRegion } = useGeoRegion();
  const isUS = region === "americas";
  const label = isUS ? "US" : "EU";

  return (
    <button
      type="button"
      className="v8-region-toggle"
      onClick={toggleRegion}
      aria-label={`Switch region, currently ${label}`}
      title={isUS ? "US-hosted · USD" : "EU-hosted · EUR"}
    >
      <svg
        viewBox="0 0 24 24"
        width="15"
        height="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18" />
      </svg>
      <span>{label}</span>
    </button>
  );
}
