import { describe, expect, it } from "vitest";

import { extractPublicScanCode } from "./extractPublicScanCode";

describe("extractPublicScanCode", () => {
  it("extracts a code from /scan/{code} paths", () => {
    expect(extractPublicScanCode("/scan/PKG-SCAN-001")).toBe("PKG-SCAN-001");
    expect(extractPublicScanCode("/scan/PROD%2F001")).toBe("PROD/001");
  });

  it("returns null for bare /scan or unrelated paths", () => {
    expect(extractPublicScanCode("/scan")).toBeNull();
    expect(extractPublicScanCode("/scan/")).toBeNull();
    expect(extractPublicScanCode("/products")).toBeNull();
    expect(extractPublicScanCode("/scan/index.html")).toBeNull();
  });
});
