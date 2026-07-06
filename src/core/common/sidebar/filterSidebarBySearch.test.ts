import { describe, expect, it } from "vitest";

import { filterSidebarBySearch } from "./filterSidebarBySearch";

const sampleSidebar = [
  {
    label: "Main",
    submenuItems: [
      {
        label: "Dashboard",
        submenuItems: [
          { label: "Admin Dashboard", link: "/admin-dashboard" },
          { label: "Sales Dashboard", link: "/sales-dashboard" },
        ],
      },
      {
        label: "Inventory",
        submenuItems: [
          { label: "Products", link: "/products" },
          { label: "Stock", link: "/stock" },
        ],
      },
    ],
  },
  {
    label: "Settings",
    submenuItems: [{ label: "General Settings", link: "/settings" }],
  },
];

describe("filterSidebarBySearch", () => {
  it("returns the original sidebar when the query is empty", () => {
    expect(filterSidebarBySearch(sampleSidebar, "")).toEqual(sampleSidebar);
    expect(filterSidebarBySearch(sampleSidebar, "   ")).toEqual(sampleSidebar);
  });

  it("matches nested menu labels and keeps ancestor items", () => {
    const result = filterSidebarBySearch(sampleSidebar, "sales");

    expect(result).toHaveLength(1);
    expect(result[0].label).toBe("Main");
    expect(result[0].submenuItems).toHaveLength(1);
    expect(result[0].submenuItems?.[0].label).toBe("Dashboard");
    expect(result[0].submenuItems?.[0].submenuItems).toEqual([
      { label: "Sales Dashboard", link: "/sales-dashboard" },
    ]);
  });

  it("matches parent labels and keeps their children", () => {
    const result = filterSidebarBySearch(sampleSidebar, "inventory");

    expect(result).toHaveLength(1);
    expect(result[0].submenuItems?.[0].label).toBe("Inventory");
    expect(result[0].submenuItems?.[0].submenuItems).toHaveLength(2);
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterSidebarBySearch(sampleSidebar, "billing")).toEqual([]);
  });
});
