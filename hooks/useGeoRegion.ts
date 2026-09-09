"use client";

import { useCallback, useEffect, useState } from "react";

export type Region = "americas" | "europe";

interface GeoRegionState {
  region: Region;
  loading: boolean;
  toggleRegion: () => void;
}

const STORAGE_KEY = "claros_geo_region";
const REGION_EVENT = "claros:region";

const AMERICAS_TIMEZONES = /America|US|Canada|Brazil|Mexico|Pacific\/|Hawaii/i;
const AMERICAS_COUNTRIES = new Set([
  "US", "CA", "MX", "BR", "AR", "CL", "CO", "PE", "VE", "EC", "BO", "PY",
  "UY", "GY", "SR", "PA", "CR", "GT", "HN", "SV", "NI", "BZ", "CU", "DO",
  "HT", "JM", "TT", "BB", "BS", "AG", "DM", "GD", "KN", "LC", "VC", "PR",
]);

function detectFromTimezone(): Region | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz && AMERICAS_TIMEZONES.test(tz)) return "americas";
  } catch {
    /* ignore */
  }
  return null;
}

function readCached(): Region | null {
  try {
    const cached = sessionStorage.getItem(STORAGE_KEY);
    if (cached === "americas" || cached === "europe") return cached;
  } catch {
    /* SSR / storage unavailable */
  }
  return null;
}

function persistRegion(region: Region) {
  try {
    sessionStorage.setItem(STORAGE_KEY, region);
  } catch {
    /* */
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent<Region>(REGION_EVENT, { detail: region }));
  }
}

let detectPromise: Promise<Region> | null = null;

function detectRegion(): Promise<Region> {
  if (detectPromise) return detectPromise;

  detectPromise = (async () => {
    const cached = readCached();
    if (cached) return cached;

    const tzRegion = detectFromTimezone();
    if (tzRegion) {
      persistRegion(tzRegion);
      return tzRegion;
    }

    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = (await response.json()) as {
        country_code?: string;
        continent_code?: string;
        timezone?: string;
      };

      let next: Region = "europe";
      if (data.continent_code === "NA" || data.continent_code === "SA") {
        next = "americas";
      } else if (data.country_code && AMERICAS_COUNTRIES.has(data.country_code)) {
        next = "americas";
      } else if (data.timezone && AMERICAS_TIMEZONES.test(data.timezone)) {
        next = "americas";
      }

      persistRegion(next);
      return next;
    } catch {
      persistRegion("europe");
      return "europe";
    }
  })();

  return detectPromise;
}

export function useGeoRegion(): GeoRegionState {
  const [region, setRegion] = useState<Region>("europe");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onChange = (event: Event) => {
      const next = (event as CustomEvent<Region>).detail;
      if (next === "americas" || next === "europe") {
        setRegion(next);
        setLoading(false);
      }
    };
    window.addEventListener(REGION_EVENT, onChange);
    return () => window.removeEventListener(REGION_EVENT, onChange);
  }, []);

  useEffect(() => {
    let cancelled = false;
    detectRegion().then((next) => {
      if (cancelled) return;
      setRegion(next);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleRegion = useCallback(() => {
    setRegion((current) => {
      const next = current === "americas" ? "europe" : "americas";
      persistRegion(next);
      return next;
    });
  }, []);

  return { region, loading, toggleRegion };
}
