import { mkdir, open, readFile, readdir, realpath, rename, unlink } from "node:fs/promises";
import path from "node:path";
import { createHmac, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import type { SubmissionInput } from "@/lib/submission-schema";

export type StoredSubmission = { reference: string; kind: "article" | "campaign"; status: "in-review"; receivedAt: string; payload: SubmissionInput };

export async function submissionDirectory() {
  const directory = path.resolve(/* turbopackIgnore: true */ process.env.EBA_SUBMISSIONS_DIR || path.join(process.cwd(), ".eba-private", "submissions"));
  const forbidden = ["public", "src", ".next", "node_modules", ".git", ".agents", ".codex"].map(folder => path.resolve(/* turbopackIgnore: true */ process.cwd(), folder));
  const inside = (parent: string, child: string) => { const relative = path.relative(parent, child); return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative)); };
  if (directory === process.cwd() || directory === path.parse(directory).root) throw new Error("Private storage needs a dedicated directory.");
  if (forbidden.some(folder => inside(folder, directory))) throw new Error("Private storage cannot be inside a public or application directory.");
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const resolved = await realpath(/* turbopackIgnore: true */ directory);
  for (const folder of forbidden) {
    const actual = await realpath(/* turbopackIgnore: true */ folder).catch(() => folder);
    if (inside(actual, resolved)) throw new Error("Private storage resolves into a public or application directory.");
  }
  return resolved;
}

async function signingKey() {
  const file = path.join(await submissionDirectory(), ".form-signing-key");
  try { const key = await readFile(file); if (key.length !== 32) throw new Error("The form signing key is not ready."); return key; }
  catch (error) { if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error; }
  const value = randomBytes(32);
  try {
    const handle = await open(file, "wx", 0o600);
    try { await handle.writeFile(value); await handle.sync(); } finally { await handle.close(); }
    return value;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "EEXIST") { const key = await readFile(file); if (key.length !== 32) throw new Error("The form signing key is not ready."); return key; }
    throw error;
  }
}

export async function createFormToken(now = Date.now()) {
  const payload = `${now}.${randomBytes(16).toString("hex")}`;
  return `${payload}.${createHmac("sha256", await signingKey()).update(payload).digest("hex")}`;
}
export async function validFormToken(token: string, now = Date.now()) {
  const parts = token.split(".");
  if (parts.length !== 3 || !/^\d{13}$/.test(parts[0]) || !/^[a-f0-9]{32}$/.test(parts[1]) || !/^[a-f0-9]{64}$/.test(parts[2])) return false;
  const age = now - Number(parts[0]);
  if (age < 1500 || age > 60 * 60 * 1000) return false;
  const expected = createHmac("sha256", await signingKey()).update(`${parts[0]}.${parts[1]}`).digest();
  return timingSafeEqual(expected, Buffer.from(parts[2], "hex"));
}

export async function saveSubmission(payload: SubmissionInput): Promise<StoredSubmission> {
  const directory = await submissionDirectory();
  const reference = `EBA-${payload.kind === "article" ? "A" : "C"}-${randomUUID().toUpperCase()}`;
  const record: StoredSubmission = { reference, kind: payload.kind, status: "in-review", receivedAt: new Date().toISOString(), payload };
  const temporary = path.join(directory, `.${reference}.tmp`);
  const final = path.join(directory, `${reference}.json`);
  const handle = await open(temporary, "wx", 0o600);
  try { await handle.writeFile(JSON.stringify(record, null, 2), "utf8"); await handle.sync(); }
  finally { await handle.close(); }
  try { await rename(temporary, final); }
  catch (error) { await unlink(temporary).catch(() => {}); throw error; }
  return record;
}

// Call only from trusted server administration or an authenticated reviewer route.
export async function loadSubmissions(limit = 100): Promise<StoredSubmission[]> {
  const directory = await submissionDirectory();
  const names = (await readdir(directory)).filter(name => /^EBA-[AC]-[A-F0-9-]{36}\.json$/.test(name));
  const records: StoredSubmission[] = [];
  for (const name of names) {
    const value = JSON.parse(await readFile(path.join(directory, name), "utf8"));
    if (value.reference === name.slice(0, -5) && value.status === "in-review" && value.payload && typeof value.receivedAt === "string") records.push(value);
  }
  return records.sort((a, b) => b.receivedAt.localeCompare(a.receivedAt)).slice(0, limit);
}
