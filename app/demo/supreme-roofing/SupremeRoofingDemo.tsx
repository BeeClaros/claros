"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const VIDEO_URL = "https://drive.google.com/file/d/13k8PIPFpd7uxIpk2WynFxcxqNphk0HYG/preview";

export default function SupremeRoofingDemo() {
  const [showPopup, setShowPopup] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showPopup) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isFullscreen) setShowPopup(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showPopup, isFullscreen]);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.data === "open-demo-popup") setShowPopup(true);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
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
    <>
      <style>{`
        @keyframes sr-popup-fade {
          from { opacity: 0 }
          to   { opacity: 1 }
        }
        @keyframes sr-popup-slide {
          from { opacity: 0; transform: translateY(18px) scale(.97) }
          to   { opacity: 1; transform: translateY(0) scale(1) }
        }
        .sr-welcome-overlay {
          animation: sr-popup-fade .3s ease-out;
        }
        .sr-welcome-card {
          animation: sr-popup-slide .35s ease-out;
        }
        .sr-try-btn:hover {
          background: #2a4757 !important;
        }
        .sr-expand-btn {
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
        .sr-expand-btn:hover {
          background: rgba(24, 46, 60, 0.95);
          transform: scale(1.08);
        }
        .sr-video-wrap:fullscreen {
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0;
          border: none;
          padding-bottom: 0;
        }
        .sr-video-wrap:fullscreen iframe {
          position: static;
          width: 100%;
          height: 100%;
        }
        .sr-video-wrap:fullscreen .sr-expand-btn {
          top: 16px;
          right: 16px;
        }
        @media (max-width: 520px) {
          .sr-welcome-header { padding: 22px 20px 14px !important }
          .sr-welcome-video  { padding: 0 20px 16px !important }
          .sr-welcome-footer {
            padding: 16px 20px !important;
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .sr-welcome-footer p { text-align: center }
        }
      `}</style>

      {showPopup && (
        <div
          className="sr-welcome-overlay"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(24, 42, 53, 0.88)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
          }}
        >
          <div
            className="sr-welcome-card"
            style={{
              background: "#fff",
              borderRadius: "16px",
              maxWidth: "680px",
              width: "100%",
              maxHeight: "90vh",
              overflow: "auto",
              boxShadow: "0 25px 100px rgba(12, 35, 59, 0.5)",
              color: "#182a35",
            }}
          >
            {/* ── Header ── */}
            <div className="sr-welcome-header" style={{ padding: "30px 32px 20px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: 43,
                    height: 43,
                    background: "#a43132",
                    borderRadius: 12,
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    viewBox="0 0 32 32"
                    width={26}
                    height={26}
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
                      fontSize: 16,
                      fontWeight: 700,
                      letterSpacing: "-0.4px",
                    }}
                  >
                    Supreme Roofing
                  </div>
                  <div style={{ fontSize: 12, color: "#65727a" }}>
                    Connected Red Folder by{" "}
                    <b style={{ color: "#182a35", fontWeight: 600 }}>claros</b>
                  </div>
                </div>
              </div>

              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 650,
                  lineHeight: 1.3,
                  letterSpacing: "-0.5px",
                  margin: 0,
                }}
              >
                Hi Supreme Roofing team!
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "#65727a",
                  lineHeight: 1.6,
                  margin: "10px 0 0",
                }}
              >
                We&apos;ve prepared a video demonstration for you describing the
                Red&nbsp;Folder workflow &mdash; how estimating, contracts and
                accounting connect in one clear&nbsp;handoff.
              </p>
            </div>

            {/* ── Video player ── */}
            <div className="sr-welcome-video" style={{ padding: "0 32px 24px" }}>
              <div
                ref={videoWrapRef}
                className="sr-video-wrap"
                style={{
                  position: "relative",
                  width: "100%",
                  paddingBottom: "56.25%",
                  borderRadius: 10,
                  overflow: "hidden",
                  background: "#0c1e2a",
                  border: "1px solid #dce2e2",
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
                  className="sr-expand-btn"
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? "Exit fullscreen" : "Expand video"}
                  title={isFullscreen ? "Exit fullscreen" : "Expand video"}
                >
                  {isFullscreen ? (
                    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
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
                  title="Red Folder workflow demonstration"
                />
              </div>
            </div>

            {/* ── Footer / CTA ── */}
            <div
              className="sr-welcome-footer"
              style={{
                padding: "20px 32px",
                borderTop: "1px solid #dce2e2",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                background: "#f7f9f8",
                borderRadius: "0 0 16px 16px",
              }}
            >
              <p
                style={{
                  fontSize: 12,
                  color: "#65727a",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Watch the walkthrough, then try the interactive demo yourself.
              </p>
              <button
                className="sr-try-btn"
                onClick={() => setShowPopup(false)}
                style={{
                  background: "#182e3c",
                  color: "white",
                  border: "1px solid #182e3c",
                  borderRadius: 9,
                  padding: "12px 22px",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "inherit",
                  lineHeight: 1.4,
                  flexShrink: 0,
                  transition: "background .16s",
                }}
              >
                Try it yourself
                <svg
                  viewBox="0 0 24 24"
                  width={16}
                  height={16}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14m-5-5 5 5-5 5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <iframe
        src="/demo/supreme-roofing-demo.html"
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
          display: "block",
        }}
        title="Supreme Roofing Red Folder Demo"
      />
    </>
  );
}
