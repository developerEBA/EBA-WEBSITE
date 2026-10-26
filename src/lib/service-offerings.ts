import { serviceDetails } from "@/lib/services";

// One source for navigation, the six overview nodes and dedicated service pages.
export const allServiceOfferings = [...serviceDetails, {
  slug: "b2b",
  title: "B2B Solutions",
  line: "Build credibility. Connect with the right businesses.",
  intro: "Connect your business with the organisations, partners and decision-makers that matter.",
  description: "We bring strategy, communications and marketing together to help businesses explain their value, build trust and develop relevant business relationships.",
  items: [["Business positioning & messaging", "Clarify your offer and communicate its value to business audiences."], ["B2B marketing & communications", "Plan campaigns, thought leadership and content around your audience and business objectives."], ["Partnerships & business engagement", "Shape communications and experiences that support conversations with partners and industry stakeholders."]],
  outcome: "A clear business narrative and a coordinated direction for reaching relevant organisations and decision-makers.",
}, {
  slug: "social-media-and-community",
  title: "Social Media & Community",
  line: "Build a presence people want to come back to.",
  intro: "We build platforms and communities that spark relevant conversations, strengthen engagement and grow brand loyalty.",
  description: "We connect your brand voice, content and community care around the people you want to reach. Platform strategy and everyday conversations work together, rather than treating social media as a posting schedule.",
  items: [["Social strategy", "Set the role, audience and editorial direction for each platform."], ["Content planning & publishing", "Build a consistent content calendar around your brand and community."], ["Community management", "Support conversations, respond thoughtfully and track what your audience cares about."]],
  outcome: "A clear social direction, a practical content plan and an engaged community around your brand.",
}].map(service => ({
  slug: service.slug,
  title: service.title,
  short: service.title,
  intro: service.line,
  description: service.intro,
  deliverables: service.items.map(([title]) => title),
  approach: service.description,
  items: service.items,
  outcome: service.outcome,
}));

const primaryOrder = ["brand-and-reputation", "pr-and-strategic-communications", "marketing-and-amplification", "social-media-and-community", "content-and-creative", "experiences-and-activations"];
export const serviceOfferings = primaryOrder.map(slug => allServiceOfferings.find(service => service.slug === slug)!);
export const navigationServiceOfferings = [...serviceOfferings, allServiceOfferings.find(service => service.slug === "b2b")!];
