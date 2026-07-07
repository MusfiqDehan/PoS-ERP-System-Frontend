import TenantLandingFeatures from "@/components/tenant-landing/TenantLandingFeatures";
import TenantLandingFooter from "@/components/tenant-landing/TenantLandingFooter";
import TenantLandingHero from "@/components/tenant-landing/TenantLandingHero";
import TenantLandingNavbar from "@/components/tenant-landing/TenantLandingNavbar";
import {
  normalizeLandingPage,
  type PublicTenantLanding,
} from "@/lib/tenant-landing";

type Props = {
  data: PublicTenantLanding;
};

export default function TenantLandingPage({ data }: Props) {
  const page = normalizeLandingPage(data.landing_page);

  return (
    <div className="tenant-landing">
      <TenantLandingNavbar data={data} />
      <main>
        <TenantLandingHero data={{ ...data, landing_page: page }} />
        <TenantLandingFeatures highlights={page.feature_highlights} />
      </main>
      <TenantLandingFooter
        tenantName={data.name}
        socialLinks={page.social_links}
        footerLinks={page.footer_links}
      />
    </div>
  );
}
