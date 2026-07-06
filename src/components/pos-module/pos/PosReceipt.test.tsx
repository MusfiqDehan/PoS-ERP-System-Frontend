import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PosReceipt, {
  getReceiptFooterMessage,
  shouldDisplayReceiptRender,
} from "./PosReceipt";
import { formatReceiptTime12Hour } from "./posReceiptUtils";
import type { PosReceiptSnapshot } from "@/hooks/pos/usePosCart";

describe("shouldDisplayReceiptRender", () => {
  it("returns false for JSON receipt render bodies", () => {
    expect(shouldDisplayReceiptRender('{"sale_id":"123"}')).toBe(false);
    expect(shouldDisplayReceiptRender('[{"line":1}]')).toBe(false);
  });

  it("returns true for HTML receipt render bodies", () => {
    expect(shouldDisplayReceiptRender("<p>Thank you</p>")).toBe(true);
  });
});

describe("getReceiptFooterMessage", () => {
  it("uses configured footer text when available", () => {
    expect(getReceiptFooterMessage({ footer: { text: "Visit again soon." } })).toBe(
      "Visit again soon.",
    );
  });

  it("falls back to default thank-you message", () => {
    expect(getReceiptFooterMessage({})).toBe("Thank you for your purchase!");
  });
});

describe("formatReceiptTime12Hour", () => {
  it("converts 24-hour times to 12-hour AM/PM", () => {
    expect(formatReceiptTime12Hour("23:07:05")).toBe("11:07:05 PM");
    expect(formatReceiptTime12Hour("00:30:00")).toBe("12:30:00 AM");
    expect(formatReceiptTime12Hour("12:00:00")).toBe("12:00:00 PM");
    expect(formatReceiptTime12Hour("09:15")).toBe("9:15 AM");
  });

  it("returns original value when format is unrecognized", () => {
    expect(formatReceiptTime12Hour("11:07:05 PM")).toBe("11:07:05 PM");
  });
});

describe("PosReceipt", () => {
  const baseSnapshot: PosReceiptSnapshot = {
    totalPayable: 120,
    paymentLabel: "Cash",
    invoiceId: "INV-001",
    saleId: "sale-1",
  };

  it("does not render raw JSON receipt render content in the footer area", () => {
    render(
      <PosReceipt
        snapshot={{
          ...baseSnapshot,
          receiptRender: JSON.stringify({ sale_id: "sale-1", footer: { text: "Hi" } }),
        }}
        onClose={vi.fn()}
      />,
    );

    expect(screen.queryByText(/"sale_id"/)).not.toBeInTheDocument();
    expect(screen.getByText("Thank you for your purchase!")).toBeInTheDocument();
  });

  it("renders configured footer text from receipt data", () => {
    render(
      <PosReceipt
        snapshot={{
          ...baseSnapshot,
          receipt: { footer: { text: "Visit again soon." } },
        }}
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByText("Visit again soon.")).toBeInTheDocument();
    expect(screen.queryByText("Thank you for your purchase!")).not.toBeInTheDocument();
  });
});
