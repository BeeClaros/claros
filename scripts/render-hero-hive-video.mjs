#!/usr/bin/env node
/**
 * Renders hero-hive-loop.webm + hero-hive-loop.mp4 from the capture page.
 *
 * Usage: node scripts/render-hero-hive-video.mjs
 * Requires: ffmpeg in PATH, playwright (npx playwright install chromium)
 *
 * Tip: if `next dev` is already running on :3000, the script reuses it.
 */

import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const FRAMES_DIR = path.join(ROOT, ".tmp", "hive-frames");
const OUT_DIR = path.join(ROOT, "public", "v8");
const FALLBACK_PORT = 3456;
const FPS = 30;
const DURATION = 18;
const TOTAL_FRAMES = FPS * DURATION;
const WIDTH = 1920;
const HEIGHT = 1080;
const CAPTURE_PATH = "/v8/capture/hero-video";

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit", shell: true, ...opts });
    child.on("error", reject);
    child.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`))));
  });
}

async function isServerUp(port) {
  try {
    const res = await fetch(`http://localhost:${port}${CAPTURE_PATH}`);
    return res.ok;
  } catch {
    return false;
  }
}

async function waitForServer(port, timeoutMs = 180000) {
  const url = `http://localhost:${port}${CAPTURE_PATH}`;
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await isServerUp(port)) return url;
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`Server not ready at ${url}`);
}

function killProcess(child) {
  if (!child?.pid) return;
  if (process.platform === "win32") {
    spawn("taskkill", ["/pid", String(child.pid), "/f", "/t"], { shell: true });
  } else {
    child.kill("SIGTERM");
  }
}

async function main() {
  let ownedServer = null;
  let captureUrl = null;

  if (await isServerUp(3000)) {
    captureUrl = `http://localhost:3000${CAPTURE_PATH}`;
    console.log(`Using existing dev server at ${captureUrl}`);
  } else {
    console.log("No dev server on :3000 — starting production server…");
    await run("npm", ["run", "build"], { cwd: ROOT });
    ownedServer = spawn("npx", ["next", "start", "-p", String(FALLBACK_PORT)], {
      cwd: ROOT,
      stdio: "ignore",
      shell: true,
    });
    captureUrl = await waitForServer(FALLBACK_PORT);
    console.log(`Production server ready at ${captureUrl}`);
  }

  try {
    fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
    fs.mkdirSync(FRAMES_DIR, { recursive: true });

    console.log("Launching browser…");
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } });
    await page.goto(captureUrl, { waitUntil: "networkidle" });
    await page.waitForFunction(() => window.__hiveCaptureReady === true, { timeout: 30000 });

    console.log(`Capturing ${TOTAL_FRAMES} frames @ ${FPS}fps…`);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const t = i / FPS;
      await page.evaluate((time) => window.__setHiveTime?.(time), t);
      await page.waitForTimeout(8);
      const framePath = path.join(FRAMES_DIR, `frame_${String(i).padStart(5, "0")}.png`);
      await page.locator("#hive-capture").screenshot({ path: framePath, type: "png" });
      if (i % 60 === 0) console.log(`  frame ${i}/${TOTAL_FRAMES}`);
    }

    await browser.close();

    const webmPath = path.join(OUT_DIR, "hero-hive-loop.webm");
    const mp4Path = path.join(OUT_DIR, "hero-hive-loop.mp4");

    console.log("Encoding WebM…");
    await run("ffmpeg", [
      "-y",
      "-framerate",
      String(FPS),
      "-i",
      path.join(FRAMES_DIR, "frame_%05d.png"),
      "-c:v",
      "libvpx-vp9",
      "-pix_fmt",
      "yuv420p",
      "-crf",
      "32",
      "-b:v",
      "0",
      webmPath,
    ]);

    console.log("Encoding MP4…");
    await run("ffmpeg", [
      "-y",
      "-framerate",
      String(FPS),
      "-i",
      path.join(FRAMES_DIR, "frame_%05d.png"),
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      "-crf",
      "23",
      "-preset",
      "medium",
      "-movflags",
      "+faststart",
      mp4Path,
    ]);

    const webmSize = (fs.statSync(webmPath).size / 1024 / 1024).toFixed(2);
    const mp4Size = (fs.statSync(mp4Path).size / 1024 / 1024).toFixed(2);
    console.log(`Done: ${webmPath} (${webmSize} MB)`);
    console.log(`Done: ${mp4Path} (${mp4Size} MB)`);
  } finally {
    killProcess(ownedServer);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
