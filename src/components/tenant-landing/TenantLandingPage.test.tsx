import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import TenantLandingPage from "@/components/tenant-landing";
import type { PublicTenantLanding } from "@/lib/tenant-landing";

const sample: PublicTenantLanding = {
  name: "Acme Retail",
  slug: "acme",
  company_logo: null,
  hero_image: null,
  landing_page: {
    headline: "Welcome to Acme",
    description: "Your neighborhood store",
    primary_cta: { label: "Shop login", url: "/signin" },
    secondary_cta: { label: "Contact", url: "mailto:hello@acme.test" },
    feature_highlights: [
      { title: "Fast checkout", description: "Quick POS experience" },
    ],
    social_links: { facebook: "https://facebook.com/acme" },
    footer_links: [{ label: "Privacy", url: "/privacy" }],
  },
};

describe("TenantLandingPage", () => {
  it("renders tenant branding and highlights", () => {
    render(<TenantLandingPage data={sample} />);
    expect(screen.getByText("Welcome to Acme")).toBeInTheDocument();
    expect(screen.getByText("Your neighborhood store")).toBeInTheDocument();
    expect(screen.getByText("Fast checkout")).toBeInTheDocument();
    expect(screen.getByText("Facebook")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Privacy" })).toBeInTheDocument();
  });
});
