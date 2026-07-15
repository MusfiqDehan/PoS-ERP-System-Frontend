import { BlogCtaSection } from "@/components/marketing/blog/BlogCtaSection";
import { BlogHeroSection } from "@/components/marketing/blog/BlogHeroSection";
import { BlogResourcesSection } from "@/components/marketing/blog/BlogResourcesSection";
import { FeaturedBlogsSection } from "@/components/marketing/blog/FeaturedBlogsSection";
import { Footer } from "@/components/marketing/layout/Footer";
import { Header } from "@/components/marketing/layout/Header";
import { MarketingFontLoader } from "@/components/marketing/MarketingFontLoader";

export default function MarketingBlogPage() {
  return (
    <div className="marketing-site min-h-full antialiased">
      <MarketingFontLoader />
      <Header />
      <BlogHeroSection />
      <FeaturedBlogsSection />
      <BlogResourcesSection />
      <BlogCtaSection />
      <Footer />
    </div>
  );
}
