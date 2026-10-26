import { createHash } from "node:crypto";
import { submissionSchema } from "@/lib/submission-schema";
import { createFormToken, saveSubmission, validFormToken } from "@/lib/submission-store";

export const runtime = "nodejs";
const noStore = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
const attempts = new Map<string, { count: number; expires: number }>();
function limited(key: string, maximum: number, period: number) {
  const now = Date.now();
  for (const [entry, value] of attempts) if (value.expires < now) attempts.delete(entry);
  const bucket = attempts.get(key) ?? { count: 0, expires: now + period };
  bucket.count += 1; attempts.set(key, bucket);
  return bucket.count > maximum;
}
const reply = (body: object, status = 200) => Response.json(body, { status, headers: noStore });

export async function GET() {
  if (limited("tokens", 300, 60 * 60 * 1000)) return reply({ error: "Please try again later." }, 429);
  try { return reply({ token: await createFormToken() }); }
  catch { return reply({ error: "Online submissions are temporarily unavailable. Please contact hello@enibrand.com." }, 503); }
}

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return reply({ error: "Please submit using the form on this website." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply({ error: "Only form text and supporting links are accepted." }, 415);
  if (limited("all-submissions", 100, 60 * 60 * 1000)) return reply({ error: "Submissions are busy. Please try again later." }, 429);
  const reader = request.body?.getReader();
  if (!reader) return reply({ error: "Please complete the form." }, 400);
  const chunks: Uint8Array[] = []; let bytes = 0;
  try {
    while (true) {
      const chunk = await reader.read(); if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > 128000) { await reader.cancel(); return reply({ error: "Your submission is too large. Shorten the text and use a supporting link." }, 413); }
      chunks.push(chunk.value);
    }
  } catch { return reply({ error: "The form could not be read. Please try again." }, 400); }
  let body;
  try { body = JSON.parse(Buffer.concat(chunks).toString("utf8")); }
  catch { return reply({ error: "The form could not be read. Please try again." }, 400); }
  const parsed = submissionSchema.safeParse(body?.payload);
  if (!parsed.success) return reply({ error: "Please check the required fields.", fields: parsed.error.flatten().fieldErrors }, 422);
  try {
    if (typeof body.token !== "string" || !await validFormToken(body.token)) return reply({ error: "Your form session expired or was submitted too quickly. Wait a moment, then try again, or reload the page." }, 403);
    const key = createHash("sha256").update(parsed.data.email.toLowerCase()).digest("hex");
    if (limited(key, 5, 60 * 60 * 1000)) return reply({ error: "You’ve reached the submission limit. Please try again in an hour." }, 429);
    const record = await saveSubmission(parsed.data);
    return reply({ reference: record.reference, status: record.status }, 201);
  } catch {
    return reply({ error: "We couldn’t save your submission. Your submission has not been confirmed. Please try again later or contact hello@enibrand.com." }, 503);
  }
}
