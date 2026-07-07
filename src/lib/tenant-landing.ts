/** Public tenant landing page API (host-resolved). */

import { hostAwareApiGet, type ApiResult } from "./api";
import type { AssetSummary } from "./branding";

export const PUBLIC_TENANT_LANDING_PATH = "tenancy/public/landing/";

export type LandingCta = {
  label: string;
  url: string;
};

export type LandingHighlight = {
  title: string;
  description: string;
};

export type LandingFooterLink = {
  label: string;
  url: string;
};

export type LandingPageContent = {
  headline: string;
  description: string;
  primary_cta: LandingCta;
  secondary_cta: LandingCta | null;
  feature_highlights: LandingHighlight[];
  social_links: Record<string, string>;
  footer_links: LandingFooterLink[];
};

export const DEFAULT_LANDING_PAGE_CONTENT: LandingPageContent = {
  headline: "",
  description: "",
  primary_cta: { label: "Sign In", url: "/signin" },
  secondary_cta: null,
  feature_highlights: [],
  social_links: {},
  footer_links: [],
};

/** Ensure nested arrays/objects exist after partial API payloads. */
export function normalizeLandingPage(
  input?: Partial<LandingPageContent> | null,
): LandingPageContent {
  const base = DEFAULT_LANDING_PAGE_CONTENT;
  if (!input) return { ...base };

  return {
    headline: input.headline ?? base.headline,
    description: input.description ?? base.description,
    primary_cta: {
      label: input.primary_cta?.label ?? base.primary_cta.label,
      url: input.primary_cta?.url ?? base.primary_cta.url,
    },
    secondary_cta: input.secondary_cta ?? base.secondary_cta,
    feature_highlights: Array.isArray(input.feature_highlights)
      ? input.feature_highlights
      : base.feature_highlights,
    social_links:
      input.social_links && typeof input.social_links === "object"
        ? input.social_links
        : base.social_links,
    footer_links: Array.isArray(input.footer_links)
      ? input.footer_links
      : base.footer_links,
  };
}

export function normalizeTenantLandingSettings(
  input: Partial<{
    landing_page_enabled: boolean;
    landing_page: Partial<LandingPageContent>;
    hero_image: AssetSummary | null;
  }>,
): {
  landing_page_enabled: boolean;
  landing_page: LandingPageContent;
  hero_image: AssetSummary | null;
} {
  return {
    landing_page_enabled: Boolean(input.landing_page_enabled),
    landing_page: normalizeLandingPage(input.landing_page),
    hero_image: input.hero_image ?? null,
  };
}

export type PublicTenantLanding = {
  name: string;
  slug: string;
  company_logo: AssetSummary | null;
  hero_image: AssetSummary | null;
  landing_page: LandingPageContent;
};

export function fetchPublicTenantLanding(): Promise<ApiResult<PublicTenantLanding>> {
  return hostAwareApiGet<PublicTenantLanding>(PUBLIC_TENANT_LANDING_PATH);
}
