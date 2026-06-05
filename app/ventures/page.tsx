import type { Metadata } from "next";

import { VenturesListingPage } from "@/components/ventures";
import { createPageMetadata } from "@/lib";

export const metadata: Metadata = createPageMetadata({
  title: "Ventures | The Daffodil Group",
  description:
    "Browse the venture portfolio of The Daffodil Group across advisory, interiors, FMCG, digital, and education.",
  path: "/ventures",
});

export default function VenturesRoute() {
  return (
    <main>
      <VenturesListingPage />
    </main>
  );
}
