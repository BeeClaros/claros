"use client";

import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import { useState, type RefObject } from "react";
import { HiveBuildContext } from "./HiveBuildContext";
import HiveScene from "./HiveScene";

type Props = {
  progressRef: RefObject<number>;
  forceComplete?: boolean;
};

export default function HiveCanvas({ progressRef, forceComplete }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <Image
        src="/v8/hero-hive-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="v8-hero-hive-fallback"
      />
    );
  }

  return (
    <HiveBuildContext.Provider value={progressRef}>
      <Canvas
        className="v8-hero-hive-canvas"
        gl={{ alpha: false, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        onCreated={({ gl }) => {
          gl.setClearColor(0xeceeea, 1);
        }}
        onError={() => setFailed(true)}
      >
        <HiveScene forceComplete={forceComplete} />
      </Canvas>
    </HiveBuildContext.Provider>
  );
}
