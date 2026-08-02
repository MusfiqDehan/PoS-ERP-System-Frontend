import type { Metadata } from "next";

import MarketingBlogPage from "@/components/marketing/MarketingBlogPage";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical guides, industry trends, and expert advice to help you run a smarter, faster, and more profitable retail operation.",
};

export default function BlogPage() {
  return <MarketingBlogPage />;
}
