export type SiteImage = {
  src: string;
  alt: string;
};

export const siteImages = {
  aboutHero: {
    src: "/images/advisory-boardroom-skyline.jpg",
    alt: "A refined boardroom with a city skyline view and a world map artwork.",
  },
  aboutWhoWeAre: {
    src: "/images/digital-laptop-desk.jpg",
    alt: "A premium desk setup with a laptop, notebook, and warm ambient lighting.",
  },
  homeHero: {
    src: "/images/hayat-living-room-wide.jpg",
    alt: "A warm contemporary living room with sculptural seating and soft architectural light.",
  },
  venturesHero: {
    src: "/images/hayat-dark-fireplace-lounge.jpg",
    alt: "A dark-toned interior with a fireplace, warm shadows, and premium residential detailing.",
  },
  sectorsHero: {
    src: "/images/hayat-living-room-wide.jpg",
    alt: "A refined interior scene with sculptural furniture and soft architectural light.",
  },
  partnerCta: {
    src: "/images/hayat-dining-room.jpg",
    alt: "A modern dining room with a large round table, upholstered chairs, and soft daylight.",
  },
  homeVentures: {
    business: {
      src: "/images/advisory-boardroom-skyline.jpg",
      alt: "A luxury boardroom overlooking a city skyline.",
    },
    hayat: {
      src: "/images/hayat-dark-fireplace-lounge.jpg",
      alt: "A dark-toned lounge with a marble fireplace and premium residential detailing.",
    },
    yellowSaffron: {
      src: "/images/yellow-saffron-products.jpg",
      alt: "An editorial arrangement of saffron-toned packaged goods and ingredients.",
    },
    daffodilStories: {
      src: "/images/daffodil-stories-studio.jpg",
      alt: "A cinematic content studio desk with a camera, lighting, and workspace tools.",
    },
    readingBox: {
      src: "/images/reading-box-library.jpg",
      alt: "A calm children's reading nook with bookshelves, soft seating, and natural light.",
    },
  },
  ventures: {
    laDaffodilBusinessSolutions: {
      image: {
        src: "/images/advisory-boardroom-skyline.jpg",
        alt: "A sophisticated boardroom with skyline views suited to cross-border business strategy.",
      },
      listingImage: {
        src: "/images/digital-laptop-desk.jpg",
        alt: "A polished executive desk with a laptop and warm editorial lighting.",
      },
    },
    hayatHome: {
      image: {
        src: "/images/hayat-sunlit-lounge.jpg",
        alt: "A serene, sunlit lounge designed with warm neutrals and contemporary furniture.",
      },
      listingImage: {
        src: "/images/hayat-bedroom-suite.jpg",
        alt: "A refined bedroom suite with soft lighting and calm, neutral finishes.",
      },
    },
    yellowSaffron: {
      image: {
        src: "/images/yellow-saffron-products.jpg",
        alt: "Premium pantry products styled in a rich saffron and bronze palette.",
      },
      listingImage: {
        src: "/images/yellow-saffron-products.jpg",
        alt: "A premium FMCG flatlay of saffron-toned products and ingredients.",
      },
    },
    daffodilStories: {
      image: {
        src: "/images/daffodil-stories-studio.jpg",
        alt: "A moody creative studio setup with camera gear and a storytelling workspace.",
      },
      listingImage: {
        src: "/images/daffodil-stories-studio.jpg",
        alt: "A digital content studio with camera equipment and warm production lighting.",
      },
    },
    theReadingBox: {
      image: {
        src: "/images/reading-box-library.jpg",
        alt: "A bright reading corner for children with books, toys, and soft tactile seating.",
      },
      listingImage: {
        src: "/images/reading-box-library.jpg",
        alt: "An inviting children's library nook with curated books and soft natural light.",
      },
    },
  },
} as const;
