import { describe, expect, it, vi, beforeEach } from "vitest";

function mockFetchSuccess(data: unknown) {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        data,
      }),
    }),
  );
}

function mockFetchError(message: string) {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({
        success: false,
        message,
      }),
    }),
  );
}

describe("billing API client", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("createPlatformPackage", () => {
    it("sends POST to billing/packages/ with payload", async () => {
      const mockPkg = { id: "uuid-1", name: "Starter", slug: "starter" };
      mockFetchSuccess(mockPkg);

      const { createPlatformPackage } = await import("./billing");
      const result = await createPlatformPackage(
        {
          software_product: "prod-uuid",
          name: "Starter",
          slug: "starter",
          price_monthly: "9.99",
        },
        "test-token",
      );

      expect(result.ok).toBe(true);
      expect(result.body.success).toBe(true);

      const fetchCall = (fetch as any).mock.calls[0];
      expect(fetchCall[0]).toContain("billing/packages/");
      expect(fetchCall[1].method).toBe("POST");

      const body = JSON.parse(fetchCall[1].body);
      expect(body.name).toBe("Starter");
      expect(body.software_product).toBe("prod-uuid");
    });

    it("returns error on failure", async () => {
      mockFetchError("Slug already exists.");

      const { createPlatformPackage } = await import("./billing");
      const result = await createPlatformPackage(
        { software_product: "p", name: "X", slug: "x" },
        "test-token",
      );

      expect(result.ok).toBe(false);
    });
  });

  describe("fetchPlatformFeatures", () => {
    it("fetches from platform-owner/features/", async () => {
      const mockFeatures = [
        { id: "f1", key: "pos", name: "POS", scope: "tenant" },
        { id: "f2", key: "inventory", name: "Inventory", scope: "tenant" },
      ];
      mockFetchSuccess(mockFeatures);

      const { fetchPlatformFeatures } = await import("./billing");
      const result = await fetchPlatformFeatures("test-token");

      expect(result.ok).toBe(true);

      const fetchCall = (fetch as any).mock.calls[0];
      expect(fetchCall[0]).toContain("platform-owner/features/");
    });
  });

  describe("fetchPackageFeatures", () => {
    it("fetches from billing/packages/<id>/features/", async () => {
      mockFetchSuccess({ package_id: "pkg-1", feature_ids: ["f1", "f2"] });

      const { fetchPackageFeatures } = await import("./billing");
      const result = await fetchPackageFeatures("pkg-1", "test-token");

      expect(result.ok).toBe(true);

      const fetchCall = (fetch as any).mock.calls[0];
      expect(fetchCall[0]).toContain("billing/packages/pkg-1/features/");
    });
  });

  describe("updatePackageFeatures", () => {
    it("sends PUT to billing/packages/<id>/features/", async () => {
      mockFetchSuccess({ feature_count: 3 });

      const { updatePackageFeatures } = await import("./billing");
      const result = await updatePackageFeatures(
        "pkg-1",
        ["f1", "f2", "f3"],
        "test-token",
      );

      expect(result.ok).toBe(true);

      const fetchCall = (fetch as any).mock.calls[0];
      expect(fetchCall[0]).toContain("billing/packages/pkg-1/features/");
      expect(fetchCall[1].method).toBe("PUT");

      const body = JSON.parse(fetchCall[1].body);
      expect(body.feature_ids).toEqual(["f1", "f2", "f3"]);
    });
  });
});
