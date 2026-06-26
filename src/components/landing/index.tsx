import LandingFooter from "@/components/landing/LandingFooter";
import LandingHero from "@/components/landing/LandingHero";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingPricing from "@/components/landing/LandingPricing";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <LandingNavbar />
      <main>
        <LandingHero />
        <LandingPricing />
      </main>
      <LandingFooter />
    </div>
  );
}
