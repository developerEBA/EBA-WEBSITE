import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SubmissionPortal } from "@/components/stories/submission-portal";
import "../stories.css";
import "./submit.css";
export const metadata: Metadata = { title: "Submit to EBA | Stories", description: "Submit an original article or campaign entry privately for EBA’s review." };
export default function SubmitPage() {
  return <main className="journal-page journal-submit-page"><div className="journal-shell"><Link className="journal-back" href="/stories"><ArrowLeft size={16} aria-hidden="true" /> Back to Stories</Link><header className="journal-submit-heading"><span className="journal-eyebrow">Your contribution</span><h1>Submit to <em>EBA.</em></h1><p>Choose an article or campaign entry below, fill in your details and send your work to the EBA team for review.</p></header><SubmissionPortal /><aside className="journal-submit-help"><h2>What happens next?</h2><p>After a successful submission, you’ll receive a reference number. Your entry is stored privately for EBA to review; it is not automatically published or approved.</p><p>For a campaign entry, follow the relevant campaign’s published eligibility, deadline and terms. Questions? Contact <a href="mailto:hello@enibrand.com">hello@enibrand.com</a>.</p></aside><Link className="journal-back" href="/stories"><ArrowLeft size={16} aria-hidden="true" /> Back to Stories</Link></div></main>;
}
