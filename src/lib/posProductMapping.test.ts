import { describe, expect, it } from "vitest";
import { buildCartLineKey, apiRowToPosProduct } from "./posProductMapping";
import type { PosProductRow } from "./pos";

const baseRow: PosProductRow = {
  id: "prod-1",
  name: "Test Product",
  sku: "SKU-1",
  barcode: "123",
  price: "10.00",
  available_stock: "12",
  category_id: "cat-1",
  category_name: "Category",
  image: "",
  tax_type: "exclusive",
  unit_name: "pcs",
  selling_type: "retail",
  entity_type: "product",
  variant_id: null,
  package_id: null,
  unit_quantity: 1,
};

describe("buildCartLineKey", () => {
  it("uses package id when present", () => {
    expect(
      buildCartLineKey({
        productId: "prod-1",
        variantId: "var-1",
        packageId: "pkg-1",
      }),
    ).toBe("pkg:pkg-1");
  });

  it("uses variant id when package is absent", () => {
    expect(
      buildCartLineKey({
        productId: "prod-1",
        variantId: "var-1",
        packageId: null,
      }),
    ).toBe("var:var-1");
  });

  it("uses product id for base product lines", () => {
    expect(
      buildCartLineKey({
        productId: "prod-1",
        variantId: null,
        packageId: null,
      }),
    ).toBe("prod:prod-1");
  });
});

describe("apiRowToPosProduct", () => {
  it("preserves variant and package ids from scan rows", () => {
    const row: PosProductRow = {
      ...baseRow,
      entity_type: "variant",
      variant_id: "var-9",
      package_id: null,
    };

    const product = apiRowToPosProduct(row);

    expect(product.productId).toBe("prod-1");
    expect(product.variantId).toBe("var-9");
    expect(product.packageId).toBeNull();
    expect(product.entityType).toBe("variant");
  });
});
