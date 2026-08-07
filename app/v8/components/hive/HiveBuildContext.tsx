"use client";

import { createContext, useContext, type RefObject } from "react";

export const HiveBuildContext = createContext<RefObject<number>>({ current: 0 });

export function useHiveProgressRef() {
  return useContext(HiveBuildContext);
}
