"use client";

import { useEffect, useRef, type RefObject } from "react";

type Props = {
  progressRef: RefObject<number>;
  forceComplete?: boolean;
};

/** Matches scrub encode: keyframe every 4 frames @ 30fps. */
const SEEK_STEP = 4 / 30;
const SEEK_UNLOCK_MS = 220;
const STALL_FRAMES = 12;

export default function HiveVideo({ progressRef, forceComplete }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let raf = 0;
    let seeking = false;
    let pending: number | null = null;
    let duration = 0;
    let lastSampledTime = -1;
    let stallFrames = 0;
    let primed = false;
    let seekUnlockTimer = 0;
    let disposed = false;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.preload = "auto";

    const syncDuration = () => {
      if (video.duration && Number.isFinite(video.duration) && video.duration > 0) {
        duration = video.duration;
      }
    };

    const clearSeekLock = () => {
      seeking = false;
      if (seekUnlockTimer) {
        window.clearTimeout(seekUnlockTimer);
        seekUnlockTimer = 0;
      }
    };

    const armSeekLock = () => {
      seeking = true;
      if (seekUnlockTimer) window.clearTimeout(seekUnlockTimer);
      seekUnlockTimer = window.setTimeout(() => {
        seeking = false;
        seekUnlockTimer = 0;
        if (pending !== null) {
          const next = pending;
          pending = null;
          seekTo(next);
        }
      }, SEEK_UNLOCK_MS);
    };

    const seekTo = (t: number) => {
      syncDuration();
      if (!duration) return;

      const q = Math.round(t / SEEK_STEP) * SEEK_STEP;
      const clamped = Math.min(Math.max(0, q), Math.max(0, duration - 0.05));

      if (seeking) {
        pending = clamped;
        return;
      }

      if (Math.abs(video.currentTime - clamped) < SEEK_STEP * 0.35) return;

      armSeekLock();
      try {
        video.currentTime = clamped;
      } catch {
        clearSeekLock();
      }
    };

    const onSeeked = () => {
      clearSeekLock();
      if (pending !== null) {
        const next = pending;
        pending = null;
        seekTo(next);
      }
    };

    /** Unlock autoplay/decoder so forward scrub via play() works after load. */
    const primePlayback = async () => {
      if (primed || disposed) return;
      primed = true;
      syncDuration();
      try {
        video.muted = true;
        const p = video.play();
        if (p !== undefined) await p;
        if (disposed) return;
        video.pause();
        if (video.currentTime < 0.02) {
          armSeekLock();
          video.currentTime = 0.001;
        }
      } catch {
        // Autoplay blocked - seek-based scrub still works once metadata is ready
        primed = true;
        if (video.readyState >= 2 && video.currentTime < 0.02) {
          try {
            armSeekLock();
            video.currentTime = 0.001;
          } catch {
            clearSeekLock();
          }
        }
      }
    };

    const onReady = () => {
      syncDuration();
      void primePlayback();
    };

    const tick = () => {
      if (disposed) return;
      syncDuration();

      if (forceComplete) {
        if (duration > 0) seekTo(duration - 0.05);
        raf = requestAnimationFrame(tick);
        return;
      }

      if (duration <= 0) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min(1, Math.max(0, progressRef.current));
      const target = progress * duration;
      const current = video.currentTime;
      const delta = target - current;

      // Detect stalled play (common while MP4 is still buffering)
      if (
        !video.paused &&
        !seeking &&
        delta > 0.06 &&
        lastSampledTime >= 0 &&
        Math.abs(current - lastSampledTime) < 0.002
      ) {
        stallFrames += 1;
      } else {
        stallFrames = 0;
      }
      lastSampledTime = current;

      const farBehind = delta > 0.45;
      const stalled = stallFrames >= STALL_FRAMES;

      if (stalled || (farBehind && video.readyState < 3)) {
        // Jump to target keyframe instead of waiting on a frozen playhead
        if (!video.paused) video.pause();
        stallFrames = 0;
        seekTo(target);
      } else if (delta > 0.035) {
        pending = null;
        if (video.ended) {
          try {
            video.currentTime = Math.min(current, duration - 0.1);
          } catch {
            /* ignore */
          }
        }
        const rate = Math.min(2, Math.max(1, 1 + delta * 0.85));
        if (video.playbackRate !== rate) video.playbackRate = rate;
        if (video.paused || video.ended) {
          void video.play().catch(() => {
            // play() refused - scrub with seeks
            seekTo(target);
          });
        }
      } else if (delta < -0.05) {
        if (!video.paused) video.pause();
        seekTo(target);
      } else {
        if (!video.paused) video.pause();
        if (video.playbackRate !== 1) video.playbackRate = 1;
      }

      raf = requestAnimationFrame(tick);
    };

    video.addEventListener("loadedmetadata", onReady);
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("seeked", onSeeked);

    syncDuration();
    if (video.readyState >= 1) onReady();

    raf = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      if (seekUnlockTimer) window.clearTimeout(seekUnlockTimer);
      video.removeEventListener("loadedmetadata", onReady);
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("seeked", onSeeked);
      video.pause();
    };
  }, [forceComplete, progressRef]);

  return (
    <video
      ref={videoRef}
      className="v8-hero-hive-video"
      muted
      playsInline
      preload="auto"
      poster="/images/hero-hive-bg.png"
      aria-hidden="true"
    >
      <source src="/images/hero-hive-scrub.mp4" type="video/mp4" />
    </video>
  );
}
