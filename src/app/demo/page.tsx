import type { Metadata } from "next";

import MarketingDemoPage from "@/components/marketing/MarketingDemoPage";

export const metadata: Metadata = {
  title: "Request a Free Demo",
  description:
    "See how Sortorium simplifies sales, inventory, purchases, and branch management. Schedule your personalized demo today.",
};

export default function DemoPage() {
  return <MarketingDemoPage />;
}
