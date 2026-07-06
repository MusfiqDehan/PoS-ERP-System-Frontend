import { describe, expect, it } from "vitest";
import { buildProductPayload } from "./buildProductPayload";
import { defaultProductFormValues } from "./productFormTypes";

describe("buildProductPayload", () => {
  it("includes branch, warehouse, manufacturer, discount, and date fields", () => {
    const payload = buildProductPayload({
      ...defaultProductFormValues,
      name: "Test Product",
      slug: "test-product",
      sku: "SKU-001",
      categoryId: "cat-1",
      unitId: "unit-1",
      branchId: "branch-1",
      warehouseId: "wh-1",
      manufacturer: "Acme",
      discountType: "percentage",
      discountValue: "10",
      manufacturedAt: "2026-01-01",
      expiresAt: "2027-01-01",
      barcode: "SRT123",
      barcodeSymbology: "code128",
      description: "A test product",
    });

    expect(payload.branch).toBe("branch-1");
    expect(payload.warehouse).toBe("wh-1");
    expect(payload.manufacturer).toBe("Acme");
    expect(payload.discount_type).toBe("percentage");
    expect(payload.discount_value).toBe("10");
    expect(payload.manufactured_at).toBe("2026-01-01");
    expect(payload.expires_at).toBe("2027-01-01");
    expect(payload.barcode_symbology).toBe("code128");
  });

  it("uses sub-category id when provided", () => {
    const payload = buildProductPayload({
      ...defaultProductFormValues,
      name: "Test",
      slug: "test",
      sku: "SKU-002",
      categoryId: "parent-cat",
      subCategoryId: "sub-cat",
      unitId: "unit-1",
    });

    expect(payload.category).toBe("sub-cat");
  });

  it("includes variants for variable products", () => {
    const payload = buildProductPayload({
      ...defaultProductFormValues,
      name: "Variable",
      slug: "variable",
      sku: "VAR-P",
      categoryId: "cat-1",
      unitId: "unit-1",
      productType: "variable",
      variants: [
        {
          sku: "VAR-1",
          barcode: "",
          barcode_symbology: "code128",
          price: "19.99",
          cost: "10",
          attributes: { color: "red" },
        },
      ],
    });

    expect(payload.variants).toHaveLength(1);
    expect(payload.variants?.[0].sku).toBe("VAR-1");
    expect(payload.variants?.[0].attributes).toEqual({ color: "red" });
  });
});
