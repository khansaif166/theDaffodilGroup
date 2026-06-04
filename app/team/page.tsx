import type { Metadata } from "next";

import { createPageMetadata } from "@/lib";

export const metadata: Metadata = createPageMetadata({
  title: "Team | The Daffodil Group",
  description:
    "Meet the leadership and stewardship culture behind The Daffodil Group.",
  path: "/team",
});

export default function TeamRoute() {
  return (
    <main className="content-section section-white">
      <div className="section-inner">
        <p className="eyebrow">Team</p>
        <h2>Leadership profiles will be introduced here in a later phase.</h2>
        <p>
          This placeholder route keeps the leadership teaser connected while the
          full team page is still being developed.
        </p>
      </div>
    </main>
  );
}
