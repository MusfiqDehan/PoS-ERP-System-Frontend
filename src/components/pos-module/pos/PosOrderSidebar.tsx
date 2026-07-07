"use client";

import type { LoyaltyMode } from "./posLoyaltyConfig";
import type { TransactionCustomer, TransactionPaymentMethod } from "./transactionDetailsData";
import type { PosSummaryLine } from "@/hooks/pos/usePosCart";
import TransactionActions from "./TransactionActions";
import TransactionCustomerSection from "./TransactionCustomerSection";
import TransactionDetailsHeader from "./TransactionDetailsHeader";
import TransactionPaymentMethods from "./TransactionPaymentMethods";
import TransactionPaymentSummary from "./TransactionPaymentSummary";

type PosOrderSidebarProps = {
  invoiceId: string;
  summaryLines: PosSummaryLine[];
  totalPayable: number;
  selectedPaymentId: string | null;
  canCheckout: boolean;
  onSelectPayment: (paymentId: string) => void;
  onHold: () => void;
  onNew: () => void;
  onClear: () => void;
  onSaveDraft: () => void;
  onPayAndPrint: () => void;
  customers: TransactionCustomer[];
  selectedCustomer: TransactionCustomer;
  onSelectCustomer: (customer: TransactionCustomer) => void;
  loyaltyMode: LoyaltyMode;
  onLoyaltyModeChange: (mode: LoyaltyMode) => void;
  cartSubtotal: number;
  paymentMethods?: TransactionPaymentMethod[];
};

export default function PosOrderSidebar({
  invoiceId,
  summaryLines,
  totalPayable,
  selectedPaymentId,
  canCheckout,
  onSelectPayment,
  onHold,
  onNew,
  onClear,
  onSaveDraft,
  onPayAndPrint,
  customers,
  selectedCustomer,
  onSelectCustomer,
  loyaltyMode,
  onLoyaltyModeChange,
  cartSubtotal,
  paymentMethods,
}: Readonly<PosOrderSidebarProps>) {
  return (
    <div className="pos-transaction-details__col">
      <section className="pos-transaction-details">
        <TransactionDetailsHeader
          invoiceId={invoiceId}
          onHold={onHold}
          onNew={onNew}
          onClear={onClear}
        />
        <TransactionCustomerSection
          customers={customers}
          selectedCustomer={selectedCustomer}
          onSelectCustomer={onSelectCustomer}
          loyaltyMode={loyaltyMode}
          onLoyaltyModeChange={onLoyaltyModeChange}
          cartSubtotal={cartSubtotal}
        />
        <TransactionPaymentSummary
          summaryLines={summaryLines}
          totalPayable={totalPayable}
        />
        <TransactionPaymentMethods
          selectedPaymentId={selectedPaymentId}
          onSelectPayment={onSelectPayment}
          methods={paymentMethods}
        />
        <TransactionActions
          totalPayable={totalPayable}
          canCheckout={canCheckout}
          onSaveDraft={onSaveDraft}
          onPayAndPrint={onPayAndPrint}
        />
      </section>
    </div>
  );
}
