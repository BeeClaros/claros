"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";

interface SwarmContext3DValue {
  stateIndex: number;
  registerSection: (id: string, ratio: number) => void;
}

const SwarmContext3D = createContext<SwarmContext3DValue>({
  stateIndex: 0,
  registerSection: () => {},
});

export function useSwarmState3D(): SwarmContext3DValue {
  return useContext(SwarmContext3D);
}

const SECTION_ORDER = [
  "v2-opening",
  "v2-discover",
  "v2-focus",
  "v2-blueprint",
  "v2-phases",
  "v2-intelligence",
  "v2-path",
  "v2-closing",
] as const;

type SectionId = (typeof SECTION_ORDER)[number];

const SECTION_STATE: Record<SectionId, number> = {
  "v2-opening": 0,
  "v2-discover": 1,
  "v2-focus": 2,
  "v2-blueprint": 3,
  "v2-phases": 4,
  "v2-intelligence": 5,
  "v2-path": 6,
  "v2-closing": 7,
};

export default function SwarmController3D({
  children,
}: {
  children: ReactNode;
}) {
  const [ratios, setRatios] = useState<Record<string, number>>({});

  const registerSection = useCallback((id: string, ratio: number) => {
    setRatios((prev) => {
      if (prev[id] === ratio) return prev;
      return { ...prev, [id]: ratio };
    });
  }, []);

  const stateIndex = useMemo(() => {
    let maxRatio = 0;
    let maxId: SectionId = "v2-opening";
    let secondRatio = 0;
    let secondId: SectionId = "v2-opening";

    for (const id of SECTION_ORDER) {
      const r = ratios[id] ?? 0;
      if (r > maxRatio) {
        secondRatio = maxRatio;
        secondId = maxId;
        maxRatio = r;
        maxId = id;
      } else if (r > secondRatio) {
        secondRatio = r;
        secondId = id;
      }
    }

    if (maxRatio === 0) return 0;

    const primaryState = SECTION_STATE[maxId];

    if (secondRatio > 0.08 && secondId !== maxId) {
      const secondaryState = SECTION_STATE[secondId];
      const blend = secondRatio / (maxRatio + secondRatio);
      return primaryState + (secondaryState - primaryState) * blend;
    }

    return primaryState;
  }, [ratios]);

  const value = useMemo(
    () => ({ stateIndex, registerSection }),
    [stateIndex, registerSection]
  );

  return (
    <SwarmContext3D.Provider value={value}>{children}</SwarmContext3D.Provider>
  );
}
