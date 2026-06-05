import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { VentureDetailPage } from "@/components/ventures";
import { getVentureBySlug, ventures } from "@/data/ventures";
import { createPageMetadata } from "@/lib";

export function generateStaticParams() {
  return ventures.map((venture) => ({ slug: venture.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const venture = getVentureBySlug(params.slug);

  if (!venture) {
    return createPageMetadata({
      title: "Venture | The Daffodil Group",
      description: "Explore ventures from The Daffodil Group.",
      path: `/ventures/${params.slug}/`,
    });
  }

  return createPageMetadata({
    title: `${venture.name} | The Daffodil Group`,
    description: venture.tagline,
    path: `/ventures/${venture.slug}/`,
  });
}

export default function VentureDetailRoute({
  params,
}: {
  params: { slug: string };
}) {
  const venture = getVentureBySlug(params.slug);

  if (!venture) {
    notFound();
  }

  return (
    <main>
      <VentureDetailPage venture={venture} />
    </main>
  );
}
