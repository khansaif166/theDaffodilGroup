export type SectorRecord = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  capabilities: string[];
};

export const sectors = [
  {
    slug: "design-interior-architecture",
    name: "Design & Interior Architecture",
    summary: "Spaces shaped through atmosphere, tactility, and everyday elegance.",
    description:
      "We approach interior architecture as a business of experience as much as a discipline of form. Our work blends aesthetic restraint with the operational realities of premium residential, hospitality, and mixed-use environments.",
    capabilities: ["Spatial Concepting", "Interior Architecture", "Material Direction"],
  },
  {
    slug: "construction-fitout",
    name: "Construction & Fitout",
    summary: "Execution systems that preserve design intent without losing commercial discipline.",
    description:
      "Our fitout and construction interests focus on translating concepts into precise delivery. We prioritize quality control, vendor coordination, and project stewardship to protect both timelines and outcomes.",
    capabilities: ["Turnkey Delivery", "Site Coordination", "Project Governance"],
  },
  {
    slug: "technology-digital",
    name: "Technology & Digital",
    summary: "Products and platforms designed for relevance, scale, and clarity.",
    description:
      "Digital ventures within the group bridge storytelling, systems, and market reach. We favor businesses that can build defensible audience value while remaining adaptable to fast-moving shifts in media and technology.",
    capabilities: ["Digital Platforms", "Content Systems", "Audience Growth"],
  },
  {
    slug: "fmcg",
    name: "FMCG",
    summary: "Consumer-facing brands with trust, repeatability, and premium recall.",
    description:
      "We see FMCG as a category where execution details matter deeply: packaging, product clarity, and route-to-market precision. Our focus is on building brands that can scale while maintaining consistency and desirability.",
    capabilities: ["Brand Positioning", "Product Launch", "Distribution Design"],
  },
  {
    slug: "textile-fashion",
    name: "Textile & Fashion",
    summary: "Material-led ventures that balance cultural taste and commercial rigor.",
    description:
      "Our interest in textile and fashion lies in ventures with strong identity, repeatable quality, and room for thoughtful brand-building. We back businesses where craft, sourcing, and presentation can compound over time.",
    capabilities: ["Category Development", "Sourcing Strategy", "Brand Curation"],
  },
  {
    slug: "business-advisory",
    name: "Business Advisory",
    summary: "Strategic guidance built around governance, scale, and operator confidence.",
    description:
      "Advisory sits at the heart of how the group works. We support founders and enterprises with strategic frameworks, market entry thinking, and decision architecture that improves long-term resilience.",
    capabilities: ["Growth Strategy", "Market Entry", "Operating Model Design"],
  },
  {
    slug: "entertainment",
    name: "Entertainment",
    summary: "Narrative and culture-led ventures built for attention and longevity.",
    description:
      "We explore entertainment through brands and stories that can connect across mediums while maintaining commercial potential. The emphasis is on durable cultural connection rather than short-term novelty.",
    capabilities: ["Story Development", "Media Strategy", "Audience Experience"],
  },
] satisfies SectorRecord[];
