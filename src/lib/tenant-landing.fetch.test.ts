import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

import { fetchPublicTenantLanding } from "@/lib/tenant-landing";

describe("fetchPublicTenantLanding", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    vi.stubEnv("NODE_ENV", "development");
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        location: {
          origin: "http://acme.localhost:3002",
          hostname: "acme.localhost",
        },
      },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("sends X-Tenant-Subdomain to configured API base in dev", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      status: 200,
      headers: { get: () => "application/json" },
      json: async () => ({
        success: true,
        data: {
          name: "Acme",
          slug: "acme",
          company_logo: null,
          hero_image: null,
          landing_page: {},
        },
      }),
    } as unknown as Response);

    await fetchPublicTenantLanding();

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/tenancy/public/landing/"),
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          "X-Tenant-Subdomain": "acme",
        }),
      }),
    );
  });
});
