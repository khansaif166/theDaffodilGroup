import type { Metadata } from "next";

const siteName = "The Daffodil Group";
const siteUrl = "https://www.daffodilgroup.com";
const defaultOgImage = `${siteUrl}/og-default.svg`;

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = defaultOgImage,
}: PageMetadataOptions): Metadata {
  const canonical = `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} | ${siteName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export const sharedMetadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
};
