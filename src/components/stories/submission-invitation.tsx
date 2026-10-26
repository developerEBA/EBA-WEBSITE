import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SubmissionInvitation() {
  return (
    <aside className="journal-submission-invitation">
      <div>
        <span className="journal-eyebrow">Contribute to the conversation</span>
        <p>Have an article or campaign entry to share?</p>
      </div>
      <Link className="pill green" href="/stories/submit">
        Submit to EBA <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
    </aside>
  );
}
