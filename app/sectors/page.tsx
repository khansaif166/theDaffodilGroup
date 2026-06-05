import type { Metadata } from "next";

import { SectorsPage } from "@/components/sectors";
import { createPageMetadata } from "@/lib";

export const metadata: Metadata = createPageMetadata({
  title: "Sectors | The Daffodil Group",
  description:
    "Discover the sectors where The Daffodil Group builds, invests, and operates across design, construction, technology, FMCG, advisory, and more.",
  path: "/sectors/",
});

export default function SectorsRoute() {
  return <SectorsPage />;
}
