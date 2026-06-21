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
    id: "sector-advisory",
    number: "01",
    name: "Business Advisory & Strategic Consulting",
    tagline: "Growth, transformation, and market expansion with strategic clarity.",
    icon: "ti-layout-2",
    bodyPara1:
      "Empowering organizations to navigate growth, transformation, and market expansion through strategic planning, corporate structuring, governance frameworks, operational excellence, investment advisory, and business intelligence.",
    bodyPara2:
      "We partner with businesses, investors, and institutions to unlock opportunities, mitigate risks, and build sustainable pathways to long-term success.",
    ventures: [],
    stats: [],
    image: "/images/sector-advisory.jpg",
    imageAlt:
      "A premium executive office with a world map wall, skyline view, and refined advisory setting.",
    bgColor: "cream",
    contentSide: "left",
  },
  {
    id: "sector-interiors",
    number: "02",
    name: "Interior Architecture & Fit-Out",
    tagline: "Design, functionality, and innovation brought together end to end.",
    icon: "ti-building",
    bodyPara1:
      "Creating inspiring environments that seamlessly blend design, functionality, and innovation. From luxury residences and hospitality destinations to corporate offices and commercial developments, we deliver end-to-end solutions including interior architecture, space planning, turnkey fit-out, project management, and procurement.",
    bodyPara2:
      "",
    ventures: [],
    stats: [],
    image: "/images/hayat-living-room-wide.jpg",
    imageAlt:
      "A refined built environment with clean architectural lines and warm golden-hour light.",
    bgColor: "white",
    contentSide: "right",
  },
  {
    id: "sector-procurement",
    number: "03",
    name: "Global Procurement",
    tagline: "Trusted sourcing and supply coordination across markets.",
    icon: "ti-cpu",
    bodyPara1:
      "Connecting businesses with trusted suppliers, manufacturers, and service providers across international and regional markets.",
    bodyPara2:
      "Our procurement solutions encompass strategic sourcing, supplier management, contract negotiation, logistics coordination, FF&E procurement, and supply chain optimization to ensure efficiency, quality, and value at every stage.",
    ventures: [],
    stats: [],
    image: "/images/sector-procurement.jpg",
    imageAlt:
      "A global procurement boardroom with a world map wall, logistics model ship, and warm strategic atmosphere.",
    bgColor: "cream",
    contentSide: "left",
  },
  {
    id: "sector-digital",
    number: "04",
    name: "Entertainment, Technology & Digital Solutions",
    tagline: "Smart systems, digital innovation, and connected experiences.",
    icon: "ti-shopping-bag",
    bodyPara1:
      "Driving digital innovation through smart technologies, digital transformation, automation systems, content creation, and technology-enabled experiences.",
    bodyPara2:
      "We develop solutions that enhance connectivity, improve operational efficiency, and create engaging experiences for businesses, brands, and communities in an increasingly digital world.",
    ventures: [],
    stats: [],
    image: "/images/sector-digital.jpg",
    imageAlt:
      "A cinematic digital production studio with editing screens, camera setup, and warm technology-led ambiance.",
    bgColor: "white",
    contentSide: "right",
  },
  {
    id: "sector-fmcg",
    number: "05",
    name: "FMCG & Consumer Brands",
    tagline: "Consumer-first brands built through quality, innovation, and scale.",
    icon: "ti-scissors",
    bodyPara1:
      "Building and scaling consumer-focused brands that deliver quality, innovation, and value.",
    bodyPara2:
      "From food and beverage products to lifestyle and wellness offerings, we focus on product development, brand strategy, distribution, retail expansion, and customer engagement to meet evolving consumer needs and market trends.",
    ventures: [],
    stats: [],
    image: "/images/yellow-saffron-products.jpg",
    imageAlt:
      "A premium consumer product flatlay with saffron tones, clean packaging, and editorial styling.",
    bgColor: "cream",
    contentSide: "left",
  },
  {
    id: "sector-education",
    number: "06",
    name: "Education & Learning",
    tagline: "Accessible, engaging, and impactful learning experiences.",
    icon: "ti-briefcase",
    bodyPara1:
      "Creating innovative educational platforms, learning resources, literacy initiatives, and skill development programs that inspire curiosity and lifelong learning.",
    bodyPara2:
      "Our focus is on empowering future generations through accessible, engaging, and impactful educational experiences that foster knowledge, creativity, and personal growth.",
    ventures: [],
    stats: [],
    image: "/images/reading-box-library.jpg",
    imageAlt:
      "A bright editorial learning space with books, tactile materials, and an inviting premium atmosphere.",
    bgColor: "white",
    contentSide: "right",
  },
  {
    id: "sector-wellness",
    number: "07",
    name: "Wellness & Lifestyle",
    tagline: "Products and experiences that support balanced living.",
    icon: "ti-device-tv",
    bodyPara1:
      "Promoting holistic well-being through wellness-focused brands, self-care solutions, and lifestyle experiences.",
    bodyPara2:
      "We are committed to supporting healthier, more balanced living by developing products and services that enhance physical, emotional, and overall well-being while encouraging sustainable lifestyle choices.",
    ventures: [],
    stats: [],
    image: "/images/bronze-vase-still-life.jpg",
    imageAlt:
      "An editorial still life in warm earthy tones that evokes premium wellness and lifestyle direction.",
    bgColor: "cream",
    contentSide: "left",
  },
];
