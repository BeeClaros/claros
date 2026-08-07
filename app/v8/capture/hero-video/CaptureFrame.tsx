"use client";

import { useEffect, useState } from "react";
import {
  CAPTURE_BLOCKS,
  CAPTURE_HEIGHT,
  CAPTURE_WIDTH,
  blockState,
  hexPath,
  hexPoints,
} from "./hiveCaptureData";

declare global {
  interface Window {
    __setHiveTime?: (t: number) => void;
    __hiveCaptureReady?: boolean;
  }
}

type Props = {
  time: number;
};

function CaptureSvg({ time }: Props) {
  return (
    <svg
      viewBox={`0 0 ${CAPTURE_WIDTH} ${CAPTURE_HEIGHT}`}
      width={CAPTURE_WIDTH}
      height={CAPTURE_HEIGHT}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      aria-hidden="true"
    >
      {CAPTURE_BLOCKS.map((block, i) => {
        const { visible, wire, dot, fill } = blockState(time, block.startAt);
        if (!visible) return null;

        const pts = hexPoints(block.cx, block.cy, block.r);
        const depth = block.r * 0.42;
        const bottom = pts.map(([x, y]) => [x, y + depth] as [number, number]);
        const leftWall = [pts[4], pts[5], pts[0], bottom[0], bottom[5], bottom[4]];
        const rightWall = [pts[1], pts[2], pts[3], bottom[3], bottom[2], bottom[1]];

        const wallPath = (wall: [number, number][]) =>
          "M " + wall.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L ") + " Z";

        return (
          <g key={i} opacity={wire}>
            {!block.hollow && fill > 0 && (
              <>
                <path d={wallPath(leftWall)} fill="#D8DCD6" opacity={fill * 0.95} />
                <path d={wallPath(rightWall)} fill="#C4C8C2" opacity={fill * 0.95} />
                <path d={hexPath(block.cx, block.cy, block.r)} fill="#FFFFFF" opacity={fill} />
              </>
            )}

            <path
              d={hexPath(block.cx, block.cy, block.r)}
              fill="none"
              stroke="#262A27"
              strokeWidth={1.4}
            />
            {bottom.map((p, j) => {
              const next = bottom[(j + 1) % 6];
              return (
                <line
                  key={`b${j}`}
                  x1={p[0]}
                  y1={p[1]}
                  x2={next[0]}
                  y2={next[1]}
                  stroke="#262A27"
                  strokeWidth={1.2}
                />
              );
            })}
            {pts.map((p, j) => (
              <line
                key={`v${j}`}
                x1={p[0]}
                y1={p[1]}
                x2={bottom[j][0]}
                y2={bottom[j][1]}
                stroke="#262A27"
                strokeWidth={1.2}
              />
            ))}

            {block.hollow &&
              [
                [pts[0], pts[3]],
                [pts[1], pts[4]],
                [pts[2], pts[5]],
              ].map(([a, b], j) => (
                <line
                  key={`tr${j}`}
                  x1={a[0]}
                  y1={a[1]}
                  x2={b[0]}
                  y2={b[1]}
                  stroke="#262A27"
                  strokeWidth={0.9}
                  opacity={0.6}
                />
              ))}

            {dot > 0 && (
              <g transform={`translate(${pts[0][0]} ${pts[0][1]})`} opacity={dot}>
                <circle r={5} fill="#C7F000" />
                <circle r={1.8} fill="#FFFFFF" fillOpacity={0.55} />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default function CaptureFrame() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    window.__setHiveTime = (t: number) => setTime(t);
    window.__hiveCaptureReady = true;
    return () => {
      delete window.__setHiveTime;
      delete window.__hiveCaptureReady;
    };
  }, []);

  return (
    <div
      id="hive-capture"
      style={{
        position: "relative",
        width: CAPTURE_WIDTH,
        height: CAPTURE_HEIGHT,
        overflow: "hidden",
        background: "#ECEEEA",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/v8/hero-hive-bg.png"
        alt=""
        width={CAPTURE_WIDTH}
        height={CAPTURE_HEIGHT}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "right center",
        }}
      />
      <CaptureSvg time={time} />
      <div id="hive-capture-ready" hidden />
    </div>
  );
}
