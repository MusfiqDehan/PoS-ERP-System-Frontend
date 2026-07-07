import { describe, expect, it } from "vitest";

import {
  DEFAULT_LANDING_PAGE_CONTENT,
  normalizeLandingPage,
  normalizeTenantLandingSettings,
} from "@/lib/tenant-landing";

describe("normalizeLandingPage", () => {
  it("fills missing nested arrays and objects", () => {
    const result = normalizeLandingPage({
      headline: "Hello",
      description: "World",
    });

    expect(result).toEqual({
      headline: "Hello",
      description: "World",
      primary_cta: DEFAULT_LANDING_PAGE_CONTENT.primary_cta,
      secondary_cta: null,
      feature_highlights: [],
      social_links: {},
      footer_links: [],
    });
  });

  it("normalizes tenant settings wrapper", () => {
    const result = normalizeTenantLandingSettings({
      landing_page_enabled: true,
      landing_page: { headline: "Acme" },
      hero_image: null,
    });

    expect(result.landing_page.feature_highlights).toEqual([]);
    expect(result.landing_page.headline).toBe("Acme");
  });
});
