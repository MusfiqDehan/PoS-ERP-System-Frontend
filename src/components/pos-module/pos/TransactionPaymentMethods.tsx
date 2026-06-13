"use client";
/* eslint-disable @next/next/no-img-element */

import { transactionPaymentMethods } from "./transactionDetailsData";

type TransactionPaymentMethodsProps = {
  selectedPaymentId: string | null;
  onSelectPayment: (paymentId: string) => void;
};

export default function TransactionPaymentMethods({
  selectedPaymentId,
  onSelectPayment,
}: TransactionPaymentMethodsProps) {
  const topRow = transactionPaymentMethods.filter((m) => m.width !== "half");
  const bottomRow = transactionPaymentMethods.filter((m) => m.width === "half");

  return (
    <div className="pos-transaction-details__section pos-transaction-details__section--payment">
      <h3 className="pos-transaction-details__section-title">Select Payment</h3>

      <div className="pos-transaction-details__payment-grid">
        <div className="pos-transaction-details__payment-row">
          {topRow.map((method) => (
            <button
              key={method.id}
              type="button"
              className={`pos-transaction-details__payment-btn${
                selectedPaymentId === method.id
                  ? " pos-transaction-details__payment-btn--selected"
                  : ""
              }`}
              style={{ backgroundColor: method.bgColor }}
              data-bs-toggle={method.modalTarget ? "modal" : undefined}
              data-bs-target={method.modalTarget}
              onClick={() => onSelectPayment(method.id)}
            >
              <img
                src={method.iconSrc}
                alt=""
                className="pos-transaction-details__payment-icon"
                width={18}
                height={18}
              />
              <span>{method.label}</span>
            </button>
          ))}
        </div>

        <div className="pos-transaction-details__payment-row">
          {bottomRow.map((method) => (
            <button
              key={method.id}
              type="button"
              className={`pos-transaction-details__payment-btn pos-transaction-details__payment-btn--half${
                selectedPaymentId === method.id
                  ? " pos-transaction-details__payment-btn--selected"
                  : ""
              }`}
              style={{ backgroundColor: method.bgColor }}
              data-bs-toggle={method.modalTarget ? "modal" : undefined}
              data-bs-target={method.modalTarget}
              onClick={() => onSelectPayment(method.id)}
            >
              <img
                src={method.iconSrc}
                alt=""
                className="pos-transaction-details__payment-icon"
                width={18}
                height={18}
              />
              <span>{method.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
