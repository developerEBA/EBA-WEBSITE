import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { ActionLink } from "@/components/shared/action-link";
import { Entrance, Reveal } from "@/components/shared/motion";

const photo = (n: number) => `/images/events/swing-for-autism/moment-${n}.${n === 6 ? "jpg" : "webp"}`;

const impact = [
  ["12", "months of planning"],
  ["40", "masterclass participants across two cohorts"],
  ["69", "tournament golfers"],
  ["200+", "people in attendance"],
  ["120,000+", "campaign impressions"],
  ["20+", "brand partners"],
];

const initiatives = [
  { number: "01", title: "Golf Masterclass", text: "Two cohorts introduced 40 participants to golf, opening a new route into sport and the campaign’s autism-awareness community.", image: 1, alt: "Golfers learning and spending time together at Play With Stephen" },
  { number: "02", title: "Autism awareness press conference", text: "Timed for Autism Awareness Month, the press conference brought media, partners and stakeholders into the conversation ahead of the tournament.", image: 3, alt: "Guests and campaign community gathered at the event" },
  { number: "03", title: "The Spectrum Series", text: "Eighteen episodes carried autism education and personal stories across the year, helping the conversation continue between events.", image: 5, alt: "A participant in the Swing for Autism campaign" },
  { number: "04", title: "Public awareness vox pops", text: "Street interviews brought public understanding of autism into focus and made space for accessible, open conversation.", image: 4, alt: "People connecting at the Play With Stephen event" },
];

export function PlayWithStephenCaseStudy() {
  return <main className="case-page pws-case-study">
    <section className="pws-hero">
      <Image className="pws-hero-image" src={photo(6)} alt="Golfers taking part in Play With Stephen Swing for Autism" fill priority sizes="100vw"/>
      <div className="pws-hero-shade"/>
      <div className="section-shell pws-hero-content">
        <Entrance><Link className="pws-back" href="/case-studies"><ArrowRight size={14}/> All case studies</Link><span className="pws-eyebrow">PLAY WITH STEPHEN × OLSTON FOUNDATION</span><h1>From golf tournament<br/>to a <em>year-round</em><br/>autism campaign.</h1><p>12 months of strategy. Four connected initiatives. More than 120,000 impressions. One participant’s journey from beginner to champion.</p><div className="pws-hero-actions"><ActionLink href="#pws-results" variant="yellow">Explore the results <ArrowDown size={15}/></ActionLink><a href="#pws-story" className="pws-text-link">Read the story <ArrowRight size={15}/></a></div></Entrance>
      </div>
      <span className="pws-hero-caption">SPORT WITH PURPOSE · SWING FOR AUTISM</span>
    </section>

    <section className="pws-impact" id="pws-results" aria-label="Campaign impact">
      <div className="section-shell"><div className="pws-impact-heading"><span className="pws-eyebrow">THE CAMPAIGN AT A GLANCE</span><p>One connected effort, built to keep its purpose moving all year.</p></div><div className="pws-impact-grid">{impact.map(([value, label], i) => <Reveal key={label} className="pws-impact-item"><span>0{i + 1}</span><strong>{value}</strong><p>{label}</p></Reveal>)}</div></div>
    </section>

    <section className="pws-story section-shell" id="pws-story">
      <Entrance className="pws-story-copy"><span className="pws-eyebrow">THE OPPORTUNITY</span><h2>A tournament could<br/>start a bigger story.</h2><p>Play With Stephen already brought golfers together for an important cause. The opportunity was to build beyond tournament day: make golf more accessible, keep autism awareness visible, create value for partners and turn attention into participation.</p><p>EBA began planning 12 months ahead, connecting campaign strategy, public relations, digital marketing, content, partnerships and event production around one clear idea.</p><div className="pws-flow"><span>Educate</span><i/><span>Engage</span><i/><span>Participate</span><i/><span>Amplify</span></div></Entrance>
      <Entrance direction="right" className="pws-story-visual"><Image src={photo(2)} alt="A golfer on the course during the Play With Stephen tournament" fill sizes="(max-width:760px) 90vw, 48vw"/><span>More than a date on the calendar.</span></Entrance>
    </section>

    <section className="pws-initiatives">
      <div className="section-shell"><Reveal className="pws-section-heading"><span className="pws-eyebrow">FOUR CONNECTED INITIATIVES</span><h2>Each one moved<br/><em>the campaign forward.</em></h2><p>Education, participation and visibility worked together to keep the purpose present throughout the year.</p></Reveal>
        <div className="pws-initiative-grid">{initiatives.map((item, i) => <Entrance as="article" key={item.number} className="pws-initiative-card" delay={(i % 2) * .08}><div className="pws-initiative-image"><Image src={photo(item.image)} alt={item.alt} fill sizes="(max-width:760px) 90vw, 44vw"/><span>{item.number}</span></div><div className="pws-initiative-copy"><span className="pws-card-kicker">CAMPAIGN PILLAR</span><h3>{item.title}</h3><p>{item.text}</p></div></Entrance>)}</div>
      </div>
    </section>

    <section className="pws-champion section-shell">
      <div className="pws-champion-image"><Image src={photo(7)} alt="The Play With Stephen golf community together at the tournament" fill sizes="(max-width:760px) 90vw, 52vw"/><span>A pathway from first swing to tournament day.</span></div>
      <div className="pws-champion-copy"><span className="pws-eyebrow">THE MOMENT THAT MADE IT REAL</span><h2>From second-to-last<br/>to <em>champion.</em></h2><p>In 2025, a participant learned golf through the Masterclass and finished second-to-last at the tournament. He returned in 2026 and won first place in the male category.</p><p>That journey shows what happens when an event becomes a pathway: a new golfer, a new advocate and a growing connection to the autism-awareness community.</p><div className="pws-champion-steps"><div><span>2025</span><strong>Learned golf</strong></div><ArrowRight size={16}/><div><span>2025</span><strong>Finished second-to-last</strong></div><ArrowRight size={16}/><div><span>2026</span><strong>Male-category champion</strong></div></div></div>
    </section>

    <section className="pws-partners">
      <div className="section-shell pws-partners-inner"><div><span className="pws-eyebrow">A COMMUNITY BEHIND THE CAUSE</span><h2>Partners made<br/>more possible.</h2><p>More than 20 brands and organisations supported the campaign, helping bring the tournament, content and awareness work to life.</p></div><div className="pws-partner-wall" aria-label="Campaign partners"><span>Indomie</span><span>The Singleton</span><span>GUINNESS</span><span>MTN</span><span>PEPSI</span><span>Aquafina</span><span>FORTRESS CAPITAL</span><span>DEVTRACO</span><small>Partner names supplied in the campaign brief</small></div></div>
    </section>

    <section className="pws-gallery section-shell"><div><span className="pws-eyebrow">THE PEOPLE. THE GAME. THE PURPOSE.</span><h2>A campaign carried<br/><em>by its community.</em></h2></div><div className="pws-gallery-grid"><div><Image src={photo(3)} alt="Community and guests at Swing for Autism" fill sizes="(max-width:760px) 90vw, 35vw"/></div><div><Image src={photo(4)} alt="An event moment from Play With Stephen" fill sizes="(max-width:760px) 90vw, 35vw"/></div><div><Image src={photo(5)} alt="A golfer enjoying the tournament" fill sizes="(max-width:760px) 90vw, 35vw"/></div></div></section>

    <section className="pws-closing"><div className="section-shell pws-closing-inner"><span className="pws-eyebrow">THE EBA DIFFERENCE</span><h2>We didn’t simply publicise a golf tournament.</h2><p>We connected autism education, participation, partnerships and event production in a year-round campaign built to make progress visible.</p><ActionLink href="/consultation?service=experiences-and-activations" variant="yellow">Build a campaign with EBA <ArrowUpRight size={16}/></ActionLink></div></section>
  </main>;
}
