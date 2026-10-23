import { AtlasImage } from "@/components/about-shared";
import { Entrance } from "@/components/shared/motion";
import { ActionLink } from "@/components/shared/action-link";

export function HomeFounder() {
  return <section className="founder-editorial section-shell" id="founder" aria-labelledby="founder-editorial-title">
    <Entrance direction="left" className="founder-editorial-portrait"><AtlasImage source="founder" x={243} y={50} w={173} h={241} label="Eniola Omoniyi, founder of Eni Brand Architect"/><div className="founder-editorial-caption"><span>THE VISION BEHIND EBA</span><strong>Eniola Omoniyi</strong><p>Founder &amp; Chief Executive Officer</p></div></Entrance>
    <div className="founder-editorial-content"><Entrance className="founder-editorial-quote"><span className="eyebrow">FROM THE FOUNDER</span><h2 id="founder-editorial-title">“I thought I needed to work harder. What I needed was <em>structure.</em>”</h2><p>A lesson learned in the quiet moments between milestones.</p></Entrance><Entrance delay={.1} className="founder-editorial-story"><span className="eyebrow">THE STORY</span><p>The founder’s journey began with a familiar mistake: mistaking busyness for progress. It took a quiet pause to realise that the real breakthrough wasn’t about adding more hours, but about building a system that made every hour count. That insight became the foundation of the work we do today.</p><ActionLink href="/about/meet-the-founder" variant="green">Read More</ActionLink></Entrance></div>
  </section>;
}
