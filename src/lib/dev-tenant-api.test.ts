import { afterEach, describe, expect, it, vi } from "vitest";

import {
  buildDevTenantRequestHeaders,
  getDevTenantHostHint,
  isDevTenantLocalhostHost,
  resolveHostAwareApiBase,
} from "@/lib/dev-tenant-api";

describe("dev-tenant-api", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("detects tenant *.localhost hosts in development", () => {
    vi.stubEnv("NODE_ENV", "development");
    expect(isDevTenantLocalhostHost("acme.localhost")).toBe(true);
    expect(isDevTenantLocalhostHost("localhost")).toBe(false);
    expect(isDevTenantLocalhostHost("sortorium.com")).toBe(false);
  });

  it("returns subdomain hint for tenant localhost hosts", () => {
    vi.stubEnv("NODE_ENV", "development");
    expect(getDevTenantHostHint("acme.localhost")).toEqual({
      subdomain: "acme",
    });
    expect(getDevTenantHostHint("localhost")).toBeNull();
  });

  it("builds X-Tenant-Subdomain header in dev", () => {
    vi.stubEnv("NODE_ENV", "development");
    expect(buildDevTenantRequestHeaders("acme.localhost")).toEqual({
      "X-Tenant-Subdomain": "acme",
    });
    expect(buildDevTenantRequestHeaders("localhost")).toEqual({});
  });

  it("keeps configured API base on tenant localhost", () => {
    vi.stubEnv("NODE_ENV", "development");
    expect(
      resolveHostAwareApiBase(
        "http://localhost:8002/api/v1",
        "acme.localhost",
      ),
    ).toBe("http://localhost:8002/api/v1");
  });
});
