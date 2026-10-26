import { SubmissionReview } from "@/components/stories/submission-review";
import "../../stories/stories.css";
import "../../stories/submit/submit.css";
export const metadata = { title: "Private Editorial Review | EBA", robots: { index: false, follow: false } };
export default function ReviewPage() {
  return <main className="journal-page journal-submit-page"><div className="journal-shell"><header className="journal-submit-heading"><span className="journal-eyebrow">EBA Editorial</span><h1>Submission <em>review.</em></h1></header><SubmissionReview /></div></main>;
}
