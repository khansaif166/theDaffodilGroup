export type SectorStat = {
  value: string;
  label: string;
};

export type SectorRecord = {
  id: string;
  number: string;
  name: string;
  tagline: string;
  icon: string;
  bodyPara1: string;
  bodyPara2: string;
  ventures: string[];
  stats: SectorStat[];
  image: string;
  imageAlt: string;
  bgColor: "cream" | "white";
  contentSide: "left" | "right";
};

export const sectors: SectorRecord[] = [
  {
    id: "sector-design",
    number: "01",
    name: "Design & Interior Architecture",
    tagline: "Spaces that tell stories.",
    icon: "ti-layout-2",
    bodyPara1:
      "Interior architecture is where the physical world meets human experience. The Daffodil Group operates in this sector through a deep belief that thoughtfully designed spaces create lasting value for residents, businesses, and communities alike.",
    bodyPara2:
      "From concept to completion, our ventures in this space deliver bespoke, design-led solutions for residential, commercial, and hospitality environments across the Gulf and South Asia.",
    ventures: ["hayat-home"],
    stats: [
      { value: "12+", label: "Projects" },
      { value: "3", label: "Markets" },
      { value: "2022", label: "Est." },
    ],
    image: "/images/hayat-sunlit-lounge.jpg",
    imageAlt:
      "A premium interior with warm neutral tones, sculptural seating, and soft architectural light.",
    bgColor: "cream",
    contentSide: "left",
  },
  {
    id: "sector-construction",
    number: "02",
    name: "Construction & Fitout",
    tagline: "Building with precision and permanence.",
    icon: "ti-building",
    bodyPara1:
      "Construction is the foundation of every physical venture and the Daffodil Group approaches it with the same rigour it applies to strategy. Our fitout and construction interests span residential, commercial, and institutional projects in high-growth urban markets.",
    bodyPara2:
      "We partner with master developers, architects, and project managers to deliver end-to-end built environments on time and to specification.",
    ventures: ["hayat-home"],
    stats: [
      { value: "End-to-end", label: "Delivery" },
      { value: "On-time", label: "Execution" },
      { value: "UAE · KSA", label: "Markets" },
    ],
    image: "/images/hayat-living-room-wide.jpg",
    imageAlt:
      "A refined built environment with clean architectural lines and warm golden-hour light.",
    bgColor: "white",
    contentSide: "right",
  },
  {
    id: "sector-technology",
    number: "03",
    name: "Technology & Digital",
    tagline: "Platforms built for the next decade.",
    icon: "ti-cpu",
    bodyPara1:
      "Digital infrastructure is no longer a support function. It is the product. The Daffodil Group invests in technology and digital ventures that have clear product-market fit, scalable architecture, and strong distribution potential.",
    bodyPara2:
      "From content platforms to business tools, our technology interests focus on building digital assets that serve real audiences in real markets.",
    ventures: ["daffodil-stories"],
    stats: [
      { value: "2", label: "Platforms" },
      { value: "Digital-first", label: "Model" },
      { value: "Global", label: "Reach" },
    ],
    image: "/images/digital-laptop-desk.jpg",
    imageAlt:
      "A clean technology workspace with a laptop, screens, and warm editorial studio lighting.",
    bgColor: "cream",
    contentSide: "left",
  },
  {
    id: "sector-fmcg",
    number: "04",
    name: "FMCG",
    tagline: "Brands built for the modern consumer.",
    icon: "ti-shopping-bag",
    bodyPara1:
      "Fast-moving consumer goods remain one of the most resilient and scalable sectors across emerging markets. The Daffodil Group enters FMCG not as a distributor, but as a brand builder developing products with distinct identity, premium positioning, and high repeat-purchase potential.",
    bodyPara2:
      "Our FMCG ventures are engineered for markets where quality and trust drive purchasing decisions with a focus on the Middle East, India, and West Africa.",
    ventures: ["yellow-saffron"],
    stats: [
      { value: "Premium", label: "Tier" },
      { value: "3", label: "Markets" },
      { value: "2023", label: "Est." },
    ],
    image: "/images/yellow-saffron-products.jpg",
    imageAlt:
      "A premium consumer product flatlay with saffron tones, clean packaging, and editorial styling.",
    bgColor: "white",
    contentSide: "right",
  },
  {
    id: "sector-textile",
    number: "05",
    name: "Textile & Fashion",
    tagline: "Design-forward. Globally positioned.",
    icon: "ti-scissors",
    bodyPara1:
      "Textile and fashion represent a significant opportunity in markets where the Daffodil Group operates. We are building textile ventures that combine craftsmanship with contemporary design and are positioned for both domestic consumption and export.",
    bodyPara2:
      "Our approach in this sector prioritises sustainable sourcing, quality manufacturing partnerships, and brand differentiation in competitive retail environments.",
    ventures: [],
    stats: [
      { value: "In development", label: "Status" },
      { value: "India · UAE", label: "Markets" },
      { value: "2025", label: "Launch" },
    ],
    image: "/images/bronze-vase-still-life.jpg",
    imageAlt:
      "An editorial still life in warm earthy tones that evokes premium textile and fashion direction.",
    bgColor: "cream",
    contentSide: "left",
  },
  {
    id: "sector-advisory",
    number: "06",
    name: "Business Advisory",
    tagline: "Strategy that travels across borders.",
    icon: "ti-briefcase",
    bodyPara1:
      "Advisory is the founding capability of the Daffodil Group. Before we built ventures, we built strategies for businesses looking to expand across India, the Gulf, and Africa. That institutional knowledge now powers every venture we own.",
    bodyPara2:
      "La' Daffodil Business Solutions offers cross-border market entry strategy, governance advisory, and expansion planning to organisations operating in or entering high-growth international markets.",
    ventures: ["la-daffodil-business-solutions"],
    stats: [
      { value: "Cross-border", label: "Focus" },
      { value: "4", label: "Markets" },
      { value: "2021", label: "Est." },
    ],
    image: "/images/advisory-boardroom-skyline.jpg",
    imageAlt:
      "A warm, minimal boardroom with strategy documents and a skyline view.",
    bgColor: "white",
    contentSide: "right",
  },
  {
    id: "sector-entertainment",
    number: "07",
    name: "Entertainment & EdTech",
    tagline: "Content and learning for a new generation.",
    icon: "ti-device-tv",
    bodyPara1:
      "Media consumption and early education are two of the fastest-evolving sectors globally. The Daffodil Group has identified both as long-term structural opportunities and has built ventures with distinct positioning in each.",
    bodyPara2:
      "Daffodil Stories brings together digital storytelling and content creation for modern audiences. The Reading Box develops early learning experiences that nurture lifelong curiosity in children.",
    ventures: ["daffodil-stories", "the-reading-box"],
    stats: [
      { value: "2", label: "Ventures" },
      { value: "Digital + Physical", label: "Model" },
      { value: "2023", label: "Est." },
    ],
    image: "/images/reading-box-library.jpg",
    imageAlt:
      "A bright editorial learning space with books, tactile materials, and an inviting premium atmosphere.",
    bgColor: "cream",
    contentSide: "left",
  },
];
