"use client";

import Link from "next/link";
import { formatOrderCurrency } from "./orderDetailsData";
import type { PosSummaryLine } from "./usePosCart";

type TransactionPaymentSummaryProps = {
  summaryLines: PosSummaryLine[];
  totalPayable: number;
};

export default function TransactionPaymentSummary({
  summaryLines,
  totalPayable,
}: TransactionPaymentSummaryProps) {
  return (
    <div className="pos-transaction-details__section">
      <h3 className="pos-transaction-details__section-title">Payment Summary</h3>

      <Link
        href="#"
        className="pos-transaction-details__bill-discount"
        data-bs-toggle="modal"
        data-bs-target="#discount"
      >
        Bill Discount
      </Link>

      <div className="pos-transaction-details__summary-lines">
        {summaryLines.map((line) => (
          <div key={line.id} className="pos-transaction-details__summary-row">
            <span className="pos-transaction-details__summary-label">
              {line.label}
            </span>
            <span
              className={`pos-transaction-details__summary-value${
                line.variant === "discount"
                  ? " pos-transaction-details__summary-value--discount"
                  : ""
              }`}
            >
              {line.value}
            </span>
          </div>
        ))}
      </div>

      <div className="pos-transaction-details__total-bar">
        <span>Total Payable</span>
        <span>{formatOrderCurrency(totalPayable)}</span>
      </div>
    </div>
  );
}
