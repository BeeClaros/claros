"use client";

import { useMemo } from "react";
import { OrthographicCamera } from "@react-three/drei";
import HexUnit from "./HexUnit";
import { buildHexGrid, CAMERA, HIVE_OFFSET } from "./hiveLayout";

type Props = {
  forceComplete?: boolean;
};

export default function HiveScene({ forceComplete = false }: Props) {
  const hexes = useMemo(() => buildHexGrid(), []);

  return (
    <>
      <OrthographicCamera
        makeDefault
        position={CAMERA.position}
        zoom={CAMERA.zoom}
        near={CAMERA.near}
        far={CAMERA.far}
        onUpdate={(self) => self.lookAt(...CAMERA.lookAt)}
      />

      {/* Soft ambient - warm off-white to match reference image tones */}
      <ambientLight intensity={0.45} color="#EFF1ED" />

      {/* Key light from upper-left - produces shadow faces visible in reference */}
      <directionalLight position={[-10, 16, -8]} intensity={1.4} color="#FFFFFF" />

      {/* Soft fill from right - keeps dark shadow walls distinguishable */}
      <directionalLight position={[8, 10, 8]} intensity={0.55} color="#E4E8E2" />

      {/* Subtle rim from below-back - separates cell edges from background */}
      <directionalLight position={[0, -2, -12]} intensity={0.08} color="#ECEFEA" />

      <group position={HIVE_OFFSET}>
        {hexes.map((hex) => (
          <HexUnit key={hex.id} data={hex} forceComplete={forceComplete} />
        ))}
      </group>
    </>
  );
}
