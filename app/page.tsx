import type { Metadata } from "next";

import { HomePage } from "@/components/home/page";
import { createPageMetadata } from "@/lib";

export const metadata: Metadata = createPageMetadata({
  title: "The Daffodil Group",
  description:
    "Explore The Daffodil Group, a premium multi-sector holding company building ventures across design, technology, FMCG, advisory, and global markets.",
  path: "/",
});

export default function HomeRoute() {
  return <HomePage />;
}
