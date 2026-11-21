// Green Marketing — AI assistant endpoint (Vercel serverless function, Node.js runtime).
// POST /api/chat  { messages: [{ role: "user" | "assistant", content: string }, ...] }
// Streams the assistant's reply back as plain text (UTF-8 chunks).
//
// The API key stays on the server: set ANTHROPIC_API_KEY in the hosting dashboard
// (Vercel → Project → Settings → Environment Variables). Never put it in the website files.
import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "./knowledge.js";

export const config = { maxDuration: 60 };

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from the environment

const MAX_TURNS = 16;        // only the most recent turns are sent to the model
const MAX_CHARS = 1500;      // per message, to keep requests small and abuse-resistant
const MAX_TOTAL_CHARS = 12000;

function cleanHistory(raw) {
  if (!Array.isArray(raw)) return null;
  const msgs = raw
    .filter(m => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map(m => ({ role: m.role, content: m.content.trim().slice(0, MAX_CHARS) }))
    .filter(m => m.content.length > 0)
    .slice(-MAX_TURNS);
  // drop the oldest turns until the whole history fits the size budget
  while (msgs.length > 1 && msgs.reduce((n, m) => n + m.content.length, 0) > MAX_TOTAL_CHARS) msgs.shift();
  while (msgs.length && msgs[0].role !== "user") msgs.shift(); // must start with the visitor
  if (!msgs.length || msgs[msgs.length - 1].role !== "user") return null; // must end with a question
  return msgs;
}

const FALLBACK_TEXT = {
  ar: "عذرًا، ما قدرت أجاوب على هالسؤال. بتقدر تحكي مع فريقنا مباشرة وبساعدوك 🌿\n[[WHATSAPP]]",
  en: "Sorry, I can't help with that one. Our team will be happy to help you directly 🌿\n[[WHATSAPP]]",
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  const body = typeof req.body === "string" ? safeJson(req.body) : req.body;
  const messages = cleanHistory(body?.messages);
  const lang = body?.lang === "en" ? "en" : "ar";
  if (!messages) return res.status(400).json({ error: "Invalid messages" });

  res.writeHead(200, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Accel-Buffering": "no",
  });

  try {
    const stream = client.beta.messages.stream({
      model: "claude-opus-5-5",
      max_tokens: 2000,
      // Short, conversational answers: low effort keeps replies fast and cheap.
      output_config: { effort: "low" },
      // If a reply is declined by a safety classifier, the API retries it on a fallback model automatically.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      // The system prompt never changes between requests, so it is cached and reused (cheaper + faster).
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      messages,
    });

    let wrote = false;
    for await (const event of stream) {
      if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
        res.write(event.delta.text);
        wrote = true;
      }
    }
    const final = await stream.finalMessage();
    if (final.stop_reason === "refusal" || !wrote) res.write((wrote ? "\n\n" : "") + FALLBACK_TEXT[lang]);
    res.end();
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) console.error("Rate limited:", error.message);
    else if (error instanceof Anthropic.AuthenticationError) console.error("Check ANTHROPIC_API_KEY:", error.message);
    else if (error instanceof Anthropic.APIError) console.error(`API error ${error.status}:`, error.message);
    else console.error("Chat error:", error);
    // The headers are already sent, so finish the stream with a friendly hand-off instead of an error page.
    res.write("\n" + FALLBACK_TEXT[lang]);
    res.end();
  }
}

function safeJson(s) { try { return JSON.parse(s); } catch { return null; } }
