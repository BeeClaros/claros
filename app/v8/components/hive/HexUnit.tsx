"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";
import { useHiveProgressRef } from "./HiveBuildContext";
import { HEX_R, HEX_H, type HexData } from "./hiveLayout";

// ── Helpers ────────────────────────────────────────────────────────────────
const Q_IDENTITY = new THREE.Quaternion();

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

// ── Shared geometries / materials (created once, reused) ───────────────────
// Flat-top hex prism: rotated by π/6 around Y so faces are vertical
const HEX_GEO = new THREE.CylinderGeometry(HEX_R, HEX_R, HEX_H, 6);
const DOT_GEO = new THREE.SphereGeometry(0.10, 12, 12);

// Reusable material proto (each HexUnit gets its own clone for opacity)
const BASE_MAT = new THREE.MeshStandardMaterial({
  color: 0xfafaf8,
  roughness: 0.78,
  metalness: 0.0,
  transparent: true,
  opacity: 0,
});

const DOT_MAT = new THREE.MeshStandardMaterial({
  color: 0xc7f000,
  emissive: new THREE.Color(0xc7f000),
  emissiveIntensity: 0.5,
});

// ── Component ──────────────────────────────────────────────────────────────
interface Props {
  data: HexData;
  forceComplete: boolean;
}

const ANIM_WINDOW = 0.35; // each piece animates over 35% of total scroll range

export default function HexUnit({ data, forceComplete }: Props) {
  const progressRef = useHiveProgressRef();
  const groupRef = useRef<THREE.Group>(null!);
  const matRef = useRef<THREE.MeshStandardMaterial>(BASE_MAT.clone());

  useFrame(() => {
    const raw = forceComplete ? 1 : progressRef.current;
    const t = clamp((raw - data.staggerStart) / ANIM_WINDOW, 0, 1);
    const eased = easeInOutCubic(t);

    const group = groupRef.current;
    if (!group) return;

    // Position: scatter → target
    group.position.lerpVectors(data.scatterPos, data.targetPos, eased);

    // Rotation: random → identity
    group.quaternion.slerpQuaternions(data.qRot, Q_IDENTITY, eased);

    // Scale: 0.05 → 1 ("emerges" from a tiny seed)
    const s = 0.05 + 0.95 * eased;
    group.scale.setScalar(s);

    // Opacity: invisible → fully solid (reaches full opacity halfway through)
    matRef.current.opacity = clamp(eased * 2, 0, 1);
  });

  return (
    <group ref={groupRef}>
      {/* Flat-top hexagonal prism (π/6 rotation makes faces vertical) */}
      <mesh geometry={HEX_GEO} material={matRef.current} rotation={[0, Math.PI / 6, 0]}>
        <Edges color="#363B33" lineWidth={1.2} threshold={5} />
      </mesh>

      {/* Lime dot at one of the top vertices - gives the scaffold/tech feel */}
      <mesh
        geometry={DOT_GEO}
        material={DOT_MAT}
        position={[HEX_R * Math.cos(0), HEX_H / 2 + 0.04, HEX_R * Math.sin(0)]}
      />
    </group>
  );
}
