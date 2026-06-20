import type { Metadata } from "next";

import { AboutPage } from "@/components/about";
import { createPageMetadata } from "@/lib";

export const metadata: Metadata = createPageMetadata({
  title: "About | The Daffodil Group",
  description:
    "Learn about The Daffodil Group, its purpose, vision, mission, portfolio, and growing global presence.",
  path: "/about/",
});

export default function AboutRoute() {
  return <AboutPage />;
}
