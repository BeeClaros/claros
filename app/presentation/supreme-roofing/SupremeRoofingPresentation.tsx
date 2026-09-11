"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const VIDEO_URL =
  "https://drive.google.com/file/d/155plHCNx2oKlWLdnkFW3Pnu2CG0lvQiD/preview";

export default function SupremeRoofingPresentation() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!videoWrapRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoWrapRef.current.requestFullscreen();
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0c1e2a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
      }}
    >
      <style>{`
        .sp-expand-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 2;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: none;
          background: rgba(24, 46, 60, 0.75);
          color: white;
          cursor: pointer;
          display: grid;
          place-items: center;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          transition: background .16s, transform .16s;
        }
        .sp-expand-btn:hover {
          background: rgba(24, 46, 60, 0.95);
          transform: scale(1.08);
        }
        .sp-video-wrap:fullscreen {
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0;
          border: none;
          padding-bottom: 0;
        }
        .sp-video-wrap:fullscreen iframe {
          position: static;
          width: 100%;
          height: 100%;
        }
        .sp-video-wrap:fullscreen .sp-expand-btn {
          top: 16px;
          right: 16px;
        }
      `}</style>

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            background: "#a43132",
            borderRadius: 10,
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          <svg
            viewBox="0 0 32 32"
            width={24}
            height={24}
            fill="none"
            stroke="white"
            strokeWidth={1.7}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 10h9l3 3h12v13H4z" />
            <path d="M4 10V7h10l3 3h9v3" />
          </svg>
        </div>
        <div>
          <div
            style={{
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: "-0.4px",
              color: "#ffffff",
            }}
          >
            Supreme Roofing
          </div>
          <div style={{ fontSize: 12, color: "#7a9aad" }}>
            Proposal by{" "}
            <b style={{ color: "#b0c8d6", fontWeight: 600 }}>claros</b>
          </div>
        </div>
      </div>

      {/* Video player */}
      <div
        ref={videoWrapRef}
        className="sp-video-wrap"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "960px",
          paddingBottom: "min(56.25%, calc(100vh - 180px))",
          borderRadius: 12,
          overflow: "hidden",
          background: "#000",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 80px rgba(0,0,0,0.5)",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 56,
            height: 56,
            zIndex: 1,
            background: "transparent",
          }}
        />
        <button
          className="sp-expand-btn"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Expand video"}
          title={isFullscreen ? "Exit fullscreen" : "Expand video"}
        >
          {isFullscreen ? (
            <svg
              viewBox="0 0 24 24"
              width={18}
              height={18}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              width={18}
              height={18}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          )}
        </button>
        <iframe
          src={VIDEO_URL}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          title="Supreme Roofing proposal presentation"
        />
      </div>
    </div>
  );
}
