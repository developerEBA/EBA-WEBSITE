import { z } from "zod";

const text = (min: number, max: number) => z.string().trim().min(min).max(max).refine(value => !/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value), "Remove unsupported control characters.");
const optionalText = (max: number) => z.string().trim().max(max).refine(value => !/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value), "Remove unsupported control characters.").default("");
const links = z.string().trim().max(4000).default("").refine(value => !value || value.split(/\s+/).every(link => { try { return new URL(link).protocol === "https:"; } catch { return false; } }), "Use full HTTPS links, separated by spaces or new lines.");
const common = {
  name: text(2, 120), email: z.email().max(254), organisation: optionalText(180),
  supportingLinks: links, consent: z.literal(true, { error: "Please consent to editorial review." }),
  website: z.string().max(0),
};
export const articleSchema = z.object({
  ...common, kind: z.literal("article"), title: text(3, 200), category: text(2, 100),
  summary: text(30, 2000), content: text(100, 50000), biography: optionalText(2000),
  originalWork: z.literal(true, { error: "Please confirm that you have the rights to submit this work." }),
}).strict();
export const campaignSchema = z.object({
  ...common, kind: z.literal("campaign"), campaignName: text(3, 200), title: text(3, 200),
  category: text(2, 100), description: text(30, 12000),
  termsAccepted: z.literal(true, { error: "Please confirm that you have checked the campaign’s terms." }),
}).strict();
export const submissionSchema = z.discriminatedUnion("kind", [articleSchema, campaignSchema]);
export type SubmissionInput = z.infer<typeof submissionSchema>;
