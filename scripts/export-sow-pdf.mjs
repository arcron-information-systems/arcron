import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import puppeteer from "puppeteer";

const HOST = "127.0.0.1";
const PORT = 3201;
const BASE_URL = `http://${HOST}:${PORT}`;
const TARGET_PATH = "/proposals/sow";
const OUT_DIR = path.resolve(process.cwd(), "out");
const PDF_PATH = path.join(OUT_DIR, "sow.pdf");
const PNG_PATH = path.join(OUT_DIR, "sow.png");
const VIEWPORT_WIDTH = 1440;
const VIEWPORT_HEIGHT = 900;

async function waitForServer(url, timeoutMs = 30000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const res = await fetch(url, { redirect: "manual" });
      if (res.status < 500) return;
    } catch {
      // retry
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Timed out waiting for server: ${url}`);
}

function startNextServer() {
  const runner = process.platform === "win32" ? "npm.cmd" : "npm";
  return spawn(runner, ["run", "start", "--", "-p", String(PORT), "-H", HOST], {
    stdio: "inherit",
    env: process.env,
  });
}

function installPuppeteerChrome() {
  const runner = process.platform === "win32" ? "npm.cmd" : "npm";
  return new Promise((resolve, reject) => {
    const installer = spawn(runner, ["exec", "puppeteer", "browsers", "install", "chrome"], {
      stdio: "inherit",
      env: process.env,
    });

    installer.on("error", reject);
    installer.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`Failed installing Puppeteer Chrome (exit ${code ?? "unknown"})`));
    });
  });
}

async function launchBrowser() {
  try {
    return await puppeteer.launch({ headless: true });
  } catch (error) {
    const message = String(error?.message ?? error);
    if (!message.includes("Could not find Chrome")) {
      throw error;
    }

    process.stdout.write("Chrome not found for Puppeteer. Installing managed Chrome...\n");
    await installPuppeteerChrome();
    return puppeteer.launch({ headless: true });
  }
}

async function main() {
  const nextBuild = path.resolve(process.cwd(), ".next");
  if (!fs.existsSync(nextBuild)) {
    throw new Error("Missing .next build output. Run `npm run build` first.");
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const server = startNextServer();
  let browser;

  try {
    await waitForServer(BASE_URL);
    browser = await launchBrowser();
    const page = await browser.newPage();
    await page.setViewport({
      width: VIEWPORT_WIDTH,
      height: VIEWPORT_HEIGHT,
      deviceScaleFactor: 2,
    });
    await page.emulateMediaType("screen");
    await page.goto(`${BASE_URL}${TARGET_PATH}`, {
      waitUntil: ["load", "domcontentloaded", "networkidle0"],
    });
    await page.waitForSelector("[data-sow-ready='true']", { timeout: 10000 });
    await page.waitForFunction(
      () =>
        document.querySelectorAll(".sow-card").length >= 8 &&
        document.querySelectorAll(".sow-bullets li").length >= 10,
      { timeout: 10000 },
    );
    await page.evaluate(async () => {
      await document.fonts.ready;
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    });
    const contentSize = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
      return {
        width: Math.ceil(Math.max(body.scrollWidth, html.scrollWidth)),
        height: Math.ceil(
          Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight,
          ),
        ),
      };
    });

    await page.screenshot({
      path: PNG_PATH,
      fullPage: true,
      type: "png",
      captureBeyondViewport: true,
    });

    const pngBase64 = fs.readFileSync(PNG_PATH, { encoding: "base64" });
    const pdfPage = await browser.newPage();
    await pdfPage.setViewport({
      width: contentSize.width,
      height: Math.min(contentSize.height, VIEWPORT_HEIGHT),
      deviceScaleFactor: 1,
    });
    await pdfPage.setContent(`<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      html, body { margin: 0; padding: 0; background: #0b1118; }
      img { display: block; width: ${contentSize.width}px; height: ${contentSize.height}px; }
    </style>
  </head>
  <body>
    <img alt="SOW" src="data:image/png;base64,${pngBase64}" />
  </body>
</html>`);
    await pdfPage.pdf({
      path: PDF_PATH,
      width: `${contentSize.width}px`,
      height: `${contentSize.height}px`,
      printBackground: true,
      margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
      preferCSSPageSize: false,
    });
    await pdfPage.close();
  } finally {
    if (browser) await browser.close();
    server.kill("SIGTERM");
  }

  process.stdout.write(`Wrote:\n- ${PDF_PATH}\n`);
}

main().catch((err) => {
  process.stderr.write(String(err?.stack ?? err) + "\n");
  process.exit(1);
});
