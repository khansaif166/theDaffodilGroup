import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

import { createPageMetadata, sharedMetadata } from "@/lib/metadata";
import { CustomCursor } from "@/components/global/CustomCursor";
import { Footer } from "@/components/global/Footer";
import { Navbar } from "@/components/global/Navbar";
import { PageTransition } from "@/components/global/PageTransition";

import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  ...sharedMetadata,
  ...createPageMetadata({
    title: "The Daffodil Group",
    description:
      "Premium corporate website for The Daffodil Group, a multi-sector holding company with ventures across emerging global markets.",
    path: "/",
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <CustomCursor />
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
