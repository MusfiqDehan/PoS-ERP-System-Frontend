import type { Metadata } from "next";

import MarketingContactPage from "@/components/marketing/MarketingContactPage";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Sortorium. Talk to sales, email us, or send a message and we'll get back to you.",
};

export default function ContactPage() {
  return <MarketingContactPage />;
}
