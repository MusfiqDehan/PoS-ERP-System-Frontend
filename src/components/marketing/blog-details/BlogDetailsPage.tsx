import { notFound } from "next/navigation";

import { BlogCtaSection } from "@/components/marketing/blog/BlogCtaSection";
import { Footer } from "@/components/marketing/layout/Footer";
import { Header } from "@/components/marketing/layout/Header";
import { MarketingFontLoader } from "@/components/marketing/MarketingFontLoader";
import { getBlogPostById } from "@/data/blog/posts";

import { BlogDetailBodySection } from "./BlogDetailBodySection";
import { BlogDetailHeroSection } from "./BlogDetailHeroSection";

type BlogDetailsPageProps = Readonly<{
  id: string;
}>;

export default function BlogDetailsPage({ id }: BlogDetailsPageProps) {
  const post = getBlogPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="marketing-site min-h-full antialiased">
      <MarketingFontLoader />
      <Header />
      <BlogDetailHeroSection post={post} />
      <BlogDetailBodySection />
      <BlogCtaSection />
      <Footer />
    </div>
  );
}
