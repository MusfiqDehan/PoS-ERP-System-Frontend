import { ContactHero } from "@/components/marketing/contact/ContactHero";
import { ContactMainSection } from "@/components/marketing/contact/ContactMainSection";
import { Footer } from "@/components/marketing/layout/Footer";
import { Header } from "@/components/marketing/layout/Header";
import { MarketingFontLoader } from "@/components/marketing/MarketingFontLoader";

export default function MarketingContactPage() {
  return (
    <div className="marketing-site min-h-full antialiased">
      <MarketingFontLoader />
      <Header />
      <ContactHero />
      <ContactMainSection />
      <Footer />
    </div>
  );
}
