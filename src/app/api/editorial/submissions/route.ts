import { createHash, timingSafeEqual } from "node:crypto";
import { loadSubmissions } from "@/lib/submission-store";

export const runtime = "nodejs";
const headers = { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" };
let attempts = 0; let resetAt = 0;
export async function POST(request: Request) {
  const reply = (body: object, status = 200) => Response.json(body, { status, headers });
  if (request.headers.get("origin") !== new URL(request.url).origin) return reply({ error: "Invalid request." }, 403);
  const configuredKey = process.env.EBA_EDITORIAL_REVIEW_KEY;
  if (!configuredKey || configuredKey.length < 24) return reply({ error: "The private review area needs to be configured by EBA’s website administrator." }, 503);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply({ error: "Invalid request." }, 415);
  const now = Date.now(); if (now > resetAt) { attempts = 0; resetAt = now + 60000; }
  if (++attempts > 10) return reply({ error: "Too many attempts. Please wait a minute." }, 429);
  const reader = request.body?.getReader(); if (!reader) return reply({ error: "Access key required." }, 401);
  const chunks: Uint8Array[] = []; let size = 0;
  while (true) { const part = await reader.read(); if (part.done) break; size += part.value.byteLength; if (size > 2048) { await reader.cancel(); return reply({ error: "Invalid request." }, 413); } chunks.push(part.value); }
  let body; try { body = JSON.parse(Buffer.concat(chunks).toString("utf8")); } catch { return reply({ error: "Invalid request." }, 400); }
  if (typeof body?.key !== "string" || !timingSafeEqual(createHash("sha256").update(body.key).digest(), createHash("sha256").update(configuredKey).digest())) return reply({ error: "The review access key is incorrect." }, 401);
  try { return reply({ submissions: await loadSubmissions() }); }
  catch { return reply({ error: "Private submissions could not be loaded. Please contact the website administrator." }, 503); }
}
