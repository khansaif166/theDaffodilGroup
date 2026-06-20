import type { Metadata } from "next";

import { FounderPage } from "@/components/founder";
import { createPageMetadata } from "@/lib";

export const metadata: Metadata = createPageMetadata({
  title: "Founder | The Daffodil Group",
  description:
    "Discover the journey, purpose, and leadership vision of Santoshi Roopa, Founder of The Daffodil Group.",
  path: "/founder/",
});

export default function FounderRoute() {
  return <FounderPage />;
}
