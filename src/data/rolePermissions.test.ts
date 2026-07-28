import { describe, expect, it } from "vitest";

import {
  deriveAccessTier,
  filterSidebarByAccess,
  type AppTier,
  type TenantAccessPayload,
} from "./rolePermissions";

describe("deriveAccessTier", () => {
  it("returns platform for platform session", () => {
    expect(deriveAccessTier("platform", null)).toBe("platform");
  });

  it("returns owner for tenant admin", () => {
    const access: TenantAccessPayload = {
      role_slugs: ["admin"],
      is_tenant_admin: true,
      permissions: {},
      enabled_features: [],
    };
    expect(deriveAccessTier("tenant", access)).toBe("owner");
  });

  it("returns manager for branch_manager role", () => {
    const access: TenantAccessPayload = {
      role_slugs: ["branch_manager"],
      is_tenant_admin: false,
      permissions: {},
      enabled_features: [],
    };
    expect(deriveAccessTier("tenant", access)).toBe("manager");
  });

  it("returns manager for other tenant roles", () => {
    const access: TenantAccessPayload = {
      role_slugs: ["cashier"],
      is_tenant_admin: false,
      permissions: {},
      enabled_features: [],
    };
    expect(deriveAccessTier("tenant", access)).toBe("manager");
  });
});

describe("filterSidebarByAccess", () => {
  const sections = [
    {
      label: "Main",
      submenuItems: [
        {
          label: "Overview",
          roles: ["platform"] as AppTier[],
          submenuItems: [{ label: "Companies", link: "/companies" }],
        },
        {
          label: "Dashboard",
          roles: ["owner", "manager"] as AppTier[],
          submenuItems: [{ label: "Sales", link: "/sales-dashboard" }],
        },
      ],
    },
  ];

  it("shows platform menus for platform tier", () => {
    const filtered = filterSidebarByAccess(sections, "platform");
    expect(filtered[0]?.submenuItems?.map((n) => n.label)).toEqual(["Overview"]);
  });

  it("shows tenant menus for owner tier", () => {
    const filtered = filterSidebarByAccess(sections, "owner");
    expect(filtered[0]?.submenuItems?.map((n) => n.label)).toEqual(["Dashboard"]);
  });

  it("hides platform menus for manager tier", () => {
    const filtered = filterSidebarByAccess(sections, "manager");
    expect(filtered[0]?.submenuItems?.map((n) => n.label)).toEqual(["Dashboard"]);
  });

  it("filters items by featureKey when permissions are supplied", () => {
    const featureItems = [
      {
        label: "Inventory",
        roles: ["owner"] as AppTier[],
        submenuItems: [
          { label: "Products", link: "/products", featureKey: "products" },
          { label: "Brands", link: "/brands", featureKey: "brands" },
          { label: "Units", link: "/units", featureKey: "units" },
        ],
      },
    ];
    const perms = { products: "view", brands: "none", units: "edit" };
    const filtered = filterSidebarByAccess(featureItems, "owner", perms, false);
    expect(filtered[0]?.submenuItems?.map((n) => n.label)).toEqual(["Products", "Units"]);
  });

  it("skips permission filtering for tenant admins", () => {
    const featureItems = [
      {
        label: "Inventory",
        roles: ["owner"] as AppTier[],
        submenuItems: [
          { label: "Products", link: "/products", featureKey: "products" },
          { label: "Brands", link: "/brands", featureKey: "brands" },
        ],
      },
    ];
    const perms = { products: "none", brands: "none" };
    const filtered = filterSidebarByAccess(featureItems, "owner", perms, true);
    expect(filtered[0]?.submenuItems?.map((n) => n.label)).toEqual(["Products", "Brands"]);
  });
});
