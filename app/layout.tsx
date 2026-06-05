import type { Metadata } from "next";

import { createPageMetadata, sharedMetadata } from "@/lib/metadata";
import { CustomCursor } from "@/components/global/CustomCursor";
import { Footer } from "@/components/global/Footer";
import { Navbar } from "@/components/global/Navbar";
import { PageTransition } from "@/components/global/PageTransition";
import { NavbarThemeProvider } from "@/context/NavbarThemeContext";

import "./globals.css";

export const metadata: Metadata = {
  ...sharedMetadata,
  ...createPageMetadata({
    title: "The Daffodil Group",
    description:
      "Premium corporate website for The Daffodil Group, a multi-sector holding company with ventures across emerging global markets.",
    path: "/",
  }),
  icons: {
    icon: "/images/favicon-tight.png",
    shortcut: "/images/favicon-tight.png",
    apple: "/images/favicon-tight.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavbarThemeProvider>
          <CustomCursor />
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </NavbarThemeProvider>
      </body>
    </html>
  );
}
