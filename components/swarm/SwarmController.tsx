"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";

interface SwarmContextValue {
  stateIndex: number;
  registerSection: (id: string, ratio: number) => void;
}

const SwarmContext = createContext<SwarmContextValue>({
  stateIndex: 0,
  registerSection: () => {},
});

export function useSwarmState(): SwarmContextValue {
  return useContext(SwarmContext);
}

const SECTION_ORDER = [
  "opening",
  "pattern",
  "priority",
  "workflow",
  "phases",
  "operating-system",
  "entry-point",
  "final",
] as const;

const SECTION_STATE: Record<(typeof SECTION_ORDER)[number], number> = {
  opening: 0,
  pattern: 1,
  priority: 2,
  workflow: 3,
  phases: 3.35,
  "operating-system": 4,
  "entry-point": 4.25,
  final: 5,
};

export default function SwarmController({
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
    let maxId: (typeof SECTION_ORDER)[number] = "opening";
    let secondRatio = 0;
    let secondId: (typeof SECTION_ORDER)[number] = "opening";

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
    <SwarmContext.Provider value={value}>{children}</SwarmContext.Provider>
  );
}
