import { DemoHero } from "@/components/marketing/demo/DemoHero";
import { DemoMainSection } from "@/components/marketing/demo/DemoMainSection";
import { Footer } from "@/components/marketing/layout/Footer";
import { Header } from "@/components/marketing/layout/Header";
import { MarketingFontLoader } from "@/components/marketing/MarketingFontLoader";

export default function MarketingDemoPage() {
  return (
    <div className="marketing-site min-h-full antialiased">
      <MarketingFontLoader />
      <Header />
      <DemoHero />
      <DemoMainSection />
      <Footer />
    </div>
  );
}
