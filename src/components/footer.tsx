import { Newsletter } from "@/components/newsletter";
import { ArrowUpRight, ArrowUp, Mail, MapPin, Clock3 } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/components/shared/brand-logo";

export default function Footer() {
  return <><Newsletter/><footer className="site-footer">
    <div className="footer-shell">
      <div className="footer-grid">
        <div className="footer-brand">
          <BrandLogo/>
          <p>Brand architecture, strategic communications and experiences that make your story matter.</p>
          <span className="footer-tag">VISIBILITY. CREDIBILITY. IMPACT.</span>
          <Link className="footer-brand-link" href="/about/our-story">Get to know EBA <ArrowUpRight size={15}/></Link>
        </div>
        <nav className="footer-column" aria-label="Explore EBA"><h3>Explore EBA</h3>
          <Link href="/about/meet-the-founder">Meet the Founder</Link>
          <Link href="/case-studies">Our Work</Link><Link href="/events">Events</Link><Link href="/about/faqs">FAQs</Link><Link href="/stories">Stories</Link>
          <Link href="/shop">EBA Shop</Link>
          <Link href="mailto:admin@enibrand.com?subject=Careers%20at%20EBA">Careers</Link>
        </nav>
        <nav className="footer-column" aria-label="Our expertise"><h3>Our Expertise</h3>
          <Link href="/services/brand-and-reputation">Brand Strategy &amp; Positioning</Link>
          <Link href="/services/pr-and-strategic-communications">PR &amp; Communications</Link>
          <Link href="/services/content-and-creative">Content &amp; Creative</Link>
          <Link href="/services/experiences-and-activations">Events &amp; Production</Link>
          <Link href="/services">Websites &amp; Digital Experiences</Link>
          <Link href="/services/b2b">B2B Solutions</Link>
        </nav>
        <div className="footer-column footer-contact"><h3>Get in Touch</h3>
          <Link href="mailto:info@enibrand.com"><Mail size={16}/><span>info@enibrand.com</span></Link>
          <p><MapPin size={16}/><span>Lagos, Nigeria</span></p>
          <p><Clock3 size={16}/><span>Monday – Friday<br/>9:00am – 6:00pm WAT</span></p>
          <span className="footer-location-note">Rooted in Africa.<br/>Built for a wider conversation.</span>
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Eni Brand Architect. All rights reserved.</span><span>Strategy. Story. Lasting impact.</span><Link href="#site-top">Back to top <ArrowUp size={14}/></Link></div>
    </div>
  </footer></>;
}







