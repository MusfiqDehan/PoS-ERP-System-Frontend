import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import HomeRouter from "@/components/HomeRouter";
import { fetchPublicTenantLanding } from "@/lib/tenant-landing";

const replaceMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: replaceMock }),
}));

vi.mock("@/lib/tenant-landing", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/tenant-landing")>();
  return {
    ...actual,
    fetchPublicTenantLanding: vi.fn(),
  };
});

vi.mock("@/components/landing", () => ({
  default: () => <div>Platform Landing</div>,
}));

vi.mock("@/components/tenant-landing", () => ({
  default: ({ data }: { data: { name: string } }) => (
    <div>Tenant Landing: {data.name}</div>
  ),
}));

describe("HomeRouter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders platform landing when API returns 404", async () => {
    vi.mocked(fetchPublicTenantLanding).mockResolvedValue({
      ok: false,
      status: 404,
      body: { success: false, message: "No tenant context." },
    });

    render(<HomeRouter />);
    await waitFor(() => {
      expect(screen.getByText("Platform Landing")).toBeInTheDocument();
    });
  });

  it("renders tenant landing when API succeeds", async () => {
    vi.mocked(fetchPublicTenantLanding).mockResolvedValue({
      ok: true,
      status: 200,
      body: {
        success: true,
        data: {
          name: "Acme Retail",
          slug: "acme",
          company_logo: null,
          hero_image: null,
          landing_page: {
            headline: "Hi",
            description: "",
            primary_cta: { label: "Sign In", url: "/signin" },
            secondary_cta: null,
            feature_highlights: [],
            social_links: {},
            footer_links: [],
          },
        },
      },
    });

    render(<HomeRouter />);
    await waitFor(() => {
      expect(screen.getByText("Tenant Landing: Acme Retail")).toBeInTheDocument();
    });
  });

  it("redirects to signin when landing is disabled", async () => {
    vi.mocked(fetchPublicTenantLanding).mockResolvedValue({
      ok: false,
      status: 403,
      body: { success: false, message: "Forbidden" },
    });

    render(<HomeRouter />);
    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith("/signin");
    });
  });
});
