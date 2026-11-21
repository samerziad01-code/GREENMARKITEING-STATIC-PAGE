// Green Marketing — AI assistant API server (Render Web Service, Node 20+).
// The website itself is a separate Render Static Site; this service only answers the chat:
//   GET  /healthz   -> "ok" (Render health check; the site also pings it to wake the service up)
//   POST /api/chat  -> streams the assistant's reply (see api/chat.js)
// Env: ANTHROPIC_API_KEY (secret, set in the Render dashboard), ALLOWED_ORIGINS (optional, comma-separated).
import http from "node:http";

const PORT = process.env.PORT || 10000;
const MAX_BODY = 64 * 1024;

// Which websites may call this API from the browser.
const extraOrigins = (process.env.ALLOWED_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean);
const isAllowedOrigin = origin =>
  !!origin && (
    extraOrigins.includes(origin) ||
    /^https:\/\/green-marketing[a-z0-9-]*\.onrender\.com$/.test(origin) ||
    /^http:\/\/localhost(:\d+)?$/.test(origin)
  );

// Simple in-memory rate limit per visitor IP (protects the API budget from abuse).
const hits = new Map();
const LIMITS = { perMinute: 12, perDay: 150 };
function rateLimited(ip) {
  const now = Date.now();
  const h = hits.get(ip) || { minute: [], day: [] };
  h.minute = h.minute.filter(t => now - t < 60_000);
  h.day = h.day.filter(t => now - t < 86_400_000);
  if (h.minute.length >= LIMITS.perMinute || h.day.length >= LIMITS.perDay) { hits.set(ip, h); return true; }
  h.minute.push(now); h.day.push(now); hits.set(ip, h);
  return false;
}
setInterval(() => { const now = Date.now(); for (const [ip, h] of hits) if (!h.day.some(t => now - t < 86_400_000)) hits.delete(ip); }, 3_600_000).unref();

let chatHandler = null; // loaded lazily, only once an API key is configured
async function getChatHandler() {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  chatHandler ??= (await import("./api/chat.js")).default;
  return chatHandler;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on("data", c => { size += c.length; if (size > MAX_BODY) { reject(new Error("too large")); req.destroy(); } else chunks.push(c); });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

// Small helpers so api/chat.js works unchanged (it also runs as a Vercel function).
function decorate(res) {
  res.status = code => { res.statusCode = code; return res; };
  res.json = obj => { if (!res.headersSent) res.setHeader("Content-Type", "application/json; charset=utf-8"); res.end(JSON.stringify(obj)); return res; };
  return res;
}

const server = http.createServer(async (req, res) => {
  decorate(res);
  const url = new URL(req.url, "http://x");
  const origin = req.headers.origin;
  res.setHeader("X-Content-Type-Options", "nosniff");
  if (isAllowedOrigin(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Max-Age", "86400");
  }
  if (req.method === "OPTIONS") return res.status(204).end();

  if (url.pathname === "/healthz" || url.pathname === "/") {
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Content-Type", "text/plain");
    return res.status(200).end("ok");
  }

  if (url.pathname === "/api/chat") {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
    if (origin && !isAllowedOrigin(origin)) return res.status(403).json({ error: "Origin not allowed" });
    const ip = String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0].trim();
    if (rateLimited(ip)) return res.status(429).json({ error: "Too many requests" });
    const handler = await getChatHandler();
    // No key yet -> 503: the website then answers with its built-in assistant.
    if (!handler) return res.status(503).json({ error: "AI not configured" });
    try {
      req.body = JSON.parse(await readBody(req));
    } catch {
      return res.status(400).json({ error: "Invalid JSON" });
    }
    return handler(req, res);
  }

  res.status(404).json({ error: "Not found" });
});

server.listen(PORT, () => console.log(`Green Marketing AI API listening on :${PORT} (AI ${process.env.ANTHROPIC_API_KEY ? "enabled" : "not configured"})`));
