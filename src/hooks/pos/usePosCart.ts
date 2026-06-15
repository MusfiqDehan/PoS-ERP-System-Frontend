"use client";

import { useCallback, useMemo, useState } from "react";
import { parseCurrency } from "@/lib/currency";
import {
  formatOrderCurrency,
  type OrderDetailItem,
} from "@/components/pos-module/pos/orderDetailsData";
import type { PosProduct } from "@/components/pos-module/pos/posProductsData";
import type { CreateCustomerInput } from "@/components/pos-module/pos/PosCreateCustomerModal";
import {
  calculateOrderTotals,
  resolveLoyaltyForOrder,
  type LoyaltyMode,
} from "@/components/pos-module/pos/posLoyaltyConfig";
import {
  defaultTransactionCustomer,
  transactionCustomers,
  transactionPaymentMethods,
  type TransactionCustomer,
} from "@/components/pos-module/pos/transactionDetailsData";

const TAX_RATE = 0.12;

export type PosCartSummary = {
  subtotal: number;
  tax: number;
  discount: number;
  shipping: number;
  totalPayable: number;
  taxRate: number;
  discountRate: number;
  discountPercent: number;
  loyaltyMode: LoyaltyMode;
  pointsRedeemed: number;
  pointsToEarn: number;
};

export type PosSummaryLine = {
  id: string;
  label: string;
  value: string;
  variant?: "default" | "discount";
};

export type PosReceiptSnapshot = {
  totalPayable: number;
  paymentLabel: string;
  invoiceId: string;
};

export function parseProductPrice(price: string): number {
  return parseCurrency(price);
}

export function parseStockLimit(
  stockLabel: string,
  stockStatus: string,
): number | null {
  if (stockStatus === "out-of-stock") {
    return 0;
  }

  const match = stockLabel.match(/(\d+)\s*left/i);
  return match ? Number(match[1]) : null;
}

export function productToOrderItem(product: PosProduct): OrderDetailItem {
  return {
    id: product.id,
    name: product.name,
    sku: product.sku,
    price: parseProductPrice(product.price),
    quantity: 1,
    stockLabel: product.stockLabel,
    stockStatus: product.stockStatus,
  };
}

export function buildSummaryLines(summary: PosCartSummary): PosSummaryLine[] {
  const taxPercent = Math.round(summary.taxRate * 100);
  const discountPercent = Math.round(summary.discountPercent);

  const lines: PosSummaryLine[] = [
    {
      id: "subtotal",
      label: "Sub Total",
      value: formatOrderCurrency(summary.subtotal),
    },
  ];

  if (summary.discountPercent > 0) {
    const pointsNote =
      summary.pointsRedeemed > 0 ? ` · −${summary.pointsRedeemed} pts` : "";
    lines.push({
      id: "discount",
      label: `Discount (${discountPercent}%)${pointsNote}`,
      value: formatOrderCurrency(summary.discount),
      variant: "discount",
    });
  }

  lines.push(
    {
      id: "tax",
      label: `Tax (${taxPercent}%)`,
      value: formatOrderCurrency(summary.tax),
    },
    {
      id: "shipping",
      label: "Shipping",
      value: formatOrderCurrency(summary.shipping),
    },
  );

  return lines;
}

export function usePosCart() {
  const [items, setItems] = useState<OrderDetailItem[]>([]);
  const [customers, setCustomers] =
    useState<TransactionCustomer[]>(transactionCustomers);
  const [selectedCustomer, setSelectedCustomer] =
    useState<TransactionCustomer>(defaultTransactionCustomer);
  const [invoiceSeq, setInvoiceSeq] = useState(3001);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(
    null,
  );
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [receiptSnapshot, setReceiptSnapshot] =
    useState<PosReceiptSnapshot | null>(null);
  const [loyaltyMode, setLoyaltyMode] = useState<LoyaltyMode>("accumulate");

  const invoiceId = `#INV-${invoiceSeq}`;

  const subtotal = useMemo(
    () =>
      items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const loyaltyResolution = useMemo(
    () =>
      resolveLoyaltyForOrder(
        selectedCustomer.id,
        selectedCustomer.points,
        subtotal,
        loyaltyMode,
      ),
    [selectedCustomer.id, selectedCustomer.points, subtotal, loyaltyMode],
  );

  const summary = useMemo((): PosCartSummary => {
    const shipping = 0;
    const totals = calculateOrderTotals(
      subtotal,
      loyaltyResolution.effectiveDiscountPercent,
      TAX_RATE,
      shipping,
    );

    return {
      subtotal: totals.subtotal,
      tax: totals.tax,
      discount: totals.loyaltyDiscount,
      shipping: totals.shipping,
      totalPayable: totals.totalPayable,
      taxRate: TAX_RATE,
      discountRate: totals.discountRate,
      discountPercent: totals.discountPercent,
      loyaltyMode,
      pointsRedeemed: loyaltyResolution.pointsToRedeem,
      pointsToEarn: loyaltyResolution.pointsToEarn,
    };
  }, [loyaltyMode, loyaltyResolution, subtotal]);

  const summaryLines = useMemo(
    () => buildSummaryLines(summary),
    [summary],
  );

  const cartProductIds = useMemo(
    () => new Set(items.map((item) => item.id)),
    [items],
  );

  const showStatus = useCallback((message: string) => {
    setStatusMessage(message);
    window.setTimeout(() => setStatusMessage(null), 2200);
  }, []);

  const addProduct = useCallback(
    (product: PosProduct) => {
      if (product.stockStatus === "out-of-stock") {
        showStatus(`${product.name} is out of stock`);
        return false;
      }

      let added = false;

      setItems((current) => {
        const existing = current.find((item) => item.id === product.id);
        const stockLimit = parseStockLimit(
          product.stockLabel,
          product.stockStatus,
        );

        if (existing) {
          const nextQty = existing.quantity + 1;
          if (stockLimit !== null && nextQty > stockLimit) {
            showStatus(`Only ${stockLimit} left in stock`);
            return current;
          }

          added = true;
          return current.map((item) =>
            item.id === product.id
              ? { ...item, quantity: nextQty }
              : item,
          );
        }

        added = true;
        return [...current, productToOrderItem(product)];
      });

      if (added) {
        showStatus(`${product.name} added to order`);
      }

      return added;
    },
    [showStatus],
  );

  const increaseQuantity = useCallback(
    (id: string) => {
      setItems((current) =>
        current.map((item) => {
          if (item.id !== id) {
            return item;
          }

          const stockLimit = parseStockLimit(item.stockLabel, item.stockStatus);
          const nextQty = item.quantity + 1;

          if (stockLimit !== null && nextQty > stockLimit) {
            showStatus(`Only ${stockLimit} left in stock`);
            return item;
          }

          return { ...item, quantity: nextQty };
        }),
      );
    },
    [showStatus],
  );

  const decreaseQuantity = useCallback((id: string) => {
    setItems((current) => {
      const item = current.find((entry) => entry.id === id);
      if (!item) {
        return current;
      }

      if (item.quantity <= 1) {
        return current.filter((entry) => entry.id !== id);
      }

      return current.map((entry) =>
        entry.id === id
          ? { ...entry, quantity: entry.quantity - 1 }
          : entry,
      );
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setSelectedPaymentId(null);
    setLoyaltyMode("accumulate");
    showStatus("Order cleared");
  }, [showStatus]);

  const startNewOrder = useCallback(() => {
    setItems([]);
    setSelectedPaymentId(null);
    setLoyaltyMode("accumulate");
    setInvoiceSeq((current) => current + 1);
    showStatus("New order started");
  }, [showStatus]);

  const holdOrder = useCallback(() => {
    if (items.length === 0) {
      showStatus("Nothing to hold");
      return;
    }

    const heldInvoiceId = invoiceId;
    const heldOrders = JSON.parse(
      sessionStorage.getItem("pos-held-orders") ?? "[]",
    ) as Array<{
      invoiceId: string;
      items: OrderDetailItem[];
      summary: PosCartSummary;
      heldAt: string;
    }>;

    heldOrders.push({
      invoiceId: heldInvoiceId,
      items,
      summary,
      heldAt: new Date().toISOString(),
    });

    sessionStorage.setItem("pos-held-orders", JSON.stringify(heldOrders));
    setItems([]);
    setSelectedPaymentId(null);
    setInvoiceSeq((current) => current + 1);
    showStatus(`Order ${heldInvoiceId} held`);
  }, [invoiceId, items, showStatus, summary]);

  const saveDraft = useCallback(() => {
    if (items.length === 0) {
      showStatus("Add items before saving a draft");
      return;
    }

    sessionStorage.setItem(
      "pos-draft-order",
      JSON.stringify({
        invoiceId,
        items,
        summary,
        savedAt: new Date().toISOString(),
      }),
    );
    showStatus("Draft saved");
  }, [invoiceId, items, showStatus, summary]);

  const canCheckout = items.length > 0 && selectedPaymentId !== null;

  const applyLoyaltySettlement = useCallback(
    (
      customerId: string,
      pointsDelta: number,
    ) => {
      if (pointsDelta === 0) {
        return;
      }

      setCustomers((current) =>
        current.map((customer) => {
          if (customer.id !== customerId) {
            return customer;
          }

          return {
            ...customer,
            points: Math.max(0, customer.points + pointsDelta),
          };
        }),
      );

      setSelectedCustomer((current) => {
        if (current.id !== customerId) {
          return current;
        }

        return {
          ...current,
          points: Math.max(0, current.points + pointsDelta),
        };
      });
    },
    [],
  );

  const selectCustomer = useCallback((customer: TransactionCustomer) => {
    setSelectedCustomer(customer);
    setLoyaltyMode("accumulate");
  }, []);

  const completeOrder = useCallback(() => {
    if (items.length === 0 || selectedPaymentId === null) {
      return;
    }

    const paymentLabel =
      transactionPaymentMethods.find(
        (method) => method.id === selectedPaymentId,
      )?.label ?? "Payment";

    const completedCustomerId = selectedCustomer.id;
    const settlement = loyaltyResolution;

    setReceiptSnapshot({
      totalPayable: summary.totalPayable,
      paymentLabel,
      invoiceId,
    });

    if (settlement.applyDiscount && settlement.pointsToRedeem > 0) {
      applyLoyaltySettlement(
        completedCustomerId,
        -settlement.pointsToRedeem,
      );
      showStatus(
        `Payment completed · ${settlement.pointsToRedeem} pts exchanged for ${settlement.effectiveDiscountPercent}% off · ${settlement.pointsAfterRedeem} pts left`,
      );
    } else if (settlement.pointsToEarn > 0) {
      applyLoyaltySettlement(completedCustomerId, settlement.pointsToEarn);
      showStatus(`Payment completed · +${settlement.pointsToEarn} points earned`);
    } else {
      showStatus("Payment completed");
    }

    setItems([]);
    setSelectedPaymentId(null);
    setLoyaltyMode("accumulate");
    setInvoiceSeq((current) => current + 1);
  }, [
    applyLoyaltySettlement,
    invoiceId,
    items.length,
    loyaltyResolution,
    selectedCustomer.id,
    selectedPaymentId,
    showStatus,
    summary.totalPayable,
  ]);

  const clearReceiptSnapshot = useCallback(() => {
    setReceiptSnapshot(null);
  }, []);

  const createCustomer = useCallback(
    (input: CreateCustomerInput) => {
      const newCustomer: TransactionCustomer = {
        id: `customer-${Date.now()}`,
        name: input.name,
        phone: input.phone,
        points: 0,
      };

      setCustomers((current) => [...current, newCustomer]);
      setSelectedCustomer(newCustomer);
      setLoyaltyMode("accumulate");
      showStatus(`${newCustomer.name} added`);
    },
    [showStatus],
  );

  return {
    items,
    invoiceId,
    summary,
    summaryLines,
    cartProductIds,
    selectedPaymentId,
    setSelectedPaymentId,
    statusMessage,
    canCheckout,
    addProduct,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    startNewOrder,
    holdOrder,
    saveDraft,
    completeOrder,
    receiptSnapshot,
    clearReceiptSnapshot,
    customers,
    selectedCustomer,
    selectCustomer,
    loyaltyMode,
    setLoyaltyMode,
    subtotal,
    createCustomer,
  };
}
