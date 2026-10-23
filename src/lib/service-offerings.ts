import { serviceDetails } from "@/lib/services";

// One source for navigation, the six overview nodes and dedicated service pages.
export const allServiceOfferings = [...serviceDetails, {
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
