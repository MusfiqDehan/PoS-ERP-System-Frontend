import { describe, expect, it } from "vitest";
import { decimalToTaxPercent, taxPercentToDecimal } from "./posConfigUtils";

describe("posConfigUtils", () => {
  it("converts decimal tax rate to percentage", () => {
    expect(decimalToTaxPercent("0.12")).toBe(12);
    expect(decimalToTaxPercent(0.075)).toBe(7.5);
  });

  it("converts percentage to decimal tax rate string", () => {
    expect(taxPercentToDecimal(12)).toBe("0.12");
    expect(taxPercentToDecimal(7.5)).toBe("0.075");
  });
});
