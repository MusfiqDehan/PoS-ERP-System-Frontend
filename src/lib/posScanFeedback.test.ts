import { describe, expect, it } from "vitest";
import {
  scanAddedMessage,
  scanNotFoundMessage,
  scanOutOfStockMessage,
  scanStockLimitMessage,
} from "./posScanFeedback";

describe("posScanFeedback messages", () => {
  it("formats product added message", () => {
    expect(scanAddedMessage("Lux Soap")).toBe(
      "Scan successful — Lux Soap added to order",
    );
  });

  it("formats not found message", () => {
    expect(scanNotFoundMessage()).toBe(
      "Scan complete — no product available for this barcode",
    );
  });

  it("formats out of stock message", () => {
    expect(scanOutOfStockMessage("Meril Soap")).toBe(
      "Scan successful — Meril Soap is out of stock at this branch",
    );
  });

  it("formats stock limit message", () => {
    expect(scanStockLimitMessage("Cola")).toBe(
      "Scan successful — Cola cannot be added (stock limit reached)",
    );
  });
});
