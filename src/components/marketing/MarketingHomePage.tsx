import { HeroSection } from "@/components/marketing/hero/HeroSection";
import { IntegrationsSection } from "@/components/marketing/integrations/IntegrationsSection";
import { ToolsSection } from "@/components/marketing/tools/ToolsSection";
import { DashboardPreviewSection } from "@/components/marketing/dashboard/DashboardPreviewSection";
import { TestimonialSection } from "@/components/marketing/testimonials/TestimonialSection";
import { PricingSection } from "@/components/marketing/pricing/PricingSection";
import { BlogSection } from "@/components/marketing/blog/BlogSection";
import { ResourcesInsightsSection } from "@/components/marketing/blog/ResourcesInsightsSection";
import { IndustrySection } from "@/components/marketing/industry/IndustrySection";
import { CtaSection } from "@/components/marketing/cta/CtaSection";
import { FeaturesScroll } from "@/components/marketing/features/FeaturesScroll";
import { Footer } from "@/components/marketing/layout/Footer";
import { Header } from "@/components/marketing/layout/Header";
import { MarketingFontLoader } from "@/components/marketing/MarketingFontLoader";

export default function MarketingHomePage() {
  return (
    <div className="marketing-site min-h-full flex flex-col antialiased">
      <MarketingFontLoader />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <IntegrationsSection />
        <ToolsSection />
        <FeaturesScroll />
        <DashboardPreviewSection />
        <TestimonialSection />
        <PricingSection />
        <BlogSection />
        <ResourcesInsightsSection />
        <IndustrySection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
