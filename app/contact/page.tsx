import type { Metadata } from "next";

import { ContactPage } from "@/components/contact";
import { createPageMetadata } from "@/lib";

export const metadata: Metadata = createPageMetadata({
  title: "Contact | The Daffodil Group",
  description:
    "Connect with The Daffodil Group for partnerships, ventures, and strategic conversations across global markets.",
  path: "/contact",
});

export default function ContactRoute() {
  return <ContactPage />;
}
