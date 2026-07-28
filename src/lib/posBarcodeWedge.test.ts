import { describe, expect, it } from "vitest";
import {
  isRapidWedgeInput,
  isScanTerminatorKey,
  POS_SCAN_MIN_LENGTH,
  shouldResetWedgeBuffer,
} from "./posBarcodeWedge";

describe("posBarcodeWedge", () => {
  it("requires minimum scan length constant", () => {
    expect(POS_SCAN_MIN_LENGTH).toBeGreaterThanOrEqual(3);
  });

  it("resets buffer when keystrokes are too slow for a wedge scanner", () => {
    expect(shouldResetWedgeBuffer(1000, 1060, 50)).toBe(true);
    expect(shouldResetWedgeBuffer(1000, 1030, 50)).toBe(false);
    expect(shouldResetWedgeBuffer(0, 2000, 50)).toBe(false);
  });

  it("detects rapid wedge input in search field", () => {
    expect(isRapidWedgeInput(200, 13)).toBe(true);
    expect(isRapidWedgeInput(2000, 13)).toBe(false);
    expect(isRapidWedgeInput(200, 2)).toBe(false);
  });

  it("detects terminator keys including legacy keyCode", () => {
    expect(
      isScanTerminatorKey({ key: "Enter", keyCode: 13 } as KeyboardEvent),
    ).toBe(true);
    expect(
      isScanTerminatorKey({ key: "Unidentified", keyCode: 13 } as KeyboardEvent),
    ).toBe(true);
    expect(
      isScanTerminatorKey({ key: "a", keyCode: 65 } as KeyboardEvent),
    ).toBe(false);
  });
});
