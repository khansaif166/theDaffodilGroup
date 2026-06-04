export type VentureRecord = {
  slug: string;
  name: string;
  sector: string;
  geography: string;
  yearFounded: string;
  tagline: string;
  image: string;
  about: [string, string];
  offerings: string[];
  website: string;
};

export const ventures: VentureRecord[] = [
  {
    slug: "la-daffodil-business-solutions",
    name: "La' Daffodil Business Solutions",
    sector: "Business Advisory",
    geography: "India, UAE",
    yearFounded: "2020",
    tagline:
      "Advisory-led platforms helping companies structure growth with commercial clarity.",
    image: "[IMAGE: executive strategy session in refined boardroom setting]",
    about: [
      "La' Daffodil Business Solutions supports growth-stage companies and family enterprises with strategic planning, operating frameworks, and investment readiness. Its work sits at the intersection of execution discipline and market ambition.",
      "The venture is designed to be an active partner rather than a passive consultant, building systems that help founders, operators, and stakeholders make better long-horizon decisions.",
    ],
    offerings: ["Growth Strategy", "Market Entry Advisory", "Operating Model Design"],
    website: "https://example.com/la-daffodil-business-solutions",
  },
  {
    slug: "hayat-home",
    name: "Hayat Home",
    sector: "Design & Interior Architecture",
    geography: "India, Saudi Arabia",
    yearFounded: "2021",
    tagline:
      "Interior experiences shaped by texture, warmth, and contemporary restraint.",
    image:
      "[IMAGE: luxury living room with sculptural furniture and warm daylight]",
    about: [
      "Hayat Home brings a refined design language to interiors, fit-outs, and curated residential environments. The brand balances emotive styling with operational rigor to deliver spaces that feel elevated and enduring.",
      "Its perspective is rooted in editorial clarity, material intelligence, and a deep understanding of how contemporary clients live, host, and work.",
    ],
    offerings: ["Interior Design", "Turnkey Fitout", "Furniture & Styling"],
    website: "https://example.com/hayat-home",
  },
  {
    slug: "yellow-saffron",
    name: "Yellow Saffron",
    sector: "FMCG",
    geography: "India, West Africa",
    yearFounded: "2022",
    tagline:
      "A modern FMCG venture built around trusted quality and memorable everyday products.",
    image:
      "[IMAGE: premium packaged food arrangement with warm editorial styling]",
    about: [
      "Yellow Saffron develops consumer products with a focus on quality perception, packaging elegance, and scalable distribution. The brand is structured to compete with clarity in crowded everyday categories.",
      "Its portfolio strategy is grounded in consistency, recall, and a distinctive premium sensibility that translates across touchpoints.",
    ],
    offerings: ["Brand Development", "Product Launch", "Distribution Strategy"],
    website: "https://example.com/yellow-saffron",
  },
  {
    slug: "daffodil-stories",
    name: "Daffodil Stories",
    sector: "Technology & Digital",
    geography: "UAE, India",
    yearFounded: "2023",
    tagline:
      "Digital storytelling systems that connect strategy, content, and audience growth.",
    image:
      "[IMAGE: creative studio workspace with screens, notes, and cinematic lighting]",
    about: [
      "Daffodil Stories creates content ecosystems for brands navigating digital relevance, combining narrative design, performance thinking, and modern production standards.",
      "The venture exists to help companies communicate with greater depth and consistency across emerging media formats and platforms.",
    ],
    offerings: ["Content Strategy", "Digital Production", "Brand Storytelling"],
    website: "https://example.com/daffodil-stories",
  },
  {
    slug: "the-reading-box",
    name: "The Reading Box",
    sector: "Education & EdTech",
    geography: "India",
    yearFounded: "2024",
    tagline:
      "A thoughtful learning venture making reading more curated, tactile, and accessible.",
    image:
      "[IMAGE: elegant reading corner with books, child learning tools, and soft light]",
    about: [
      "The Reading Box brings together educational design, curation, and child-friendly engagement to make learning experiences more inviting and more consistent.",
      "Its model is built to support families, schools, and communities with products that feel intelligent, calm, and genuinely useful.",
    ],
    offerings: ["Learning Kits", "Reading Programs", "Educational Curation"],
    website: "https://example.com/the-reading-box",
  },
];

export function getVentureBySlug(slug: string) {
  return ventures.find((venture) => venture.slug === slug);
}
