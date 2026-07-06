"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { parseCurrency } from "@/lib/currency";
import {
  formatOrderCurrency,
  getOrderItemStockMax,
  parseOrderStockMax,
  type OrderDetailItem,
} from "@/components/pos-module/pos/orderDetailsData";
import type { PosProduct } from "@/components/pos-module/pos/posProductsData";
import type { CreateCustomerInput } from "@/components/pos-module/pos/PosCreateCustomerModal";
import { buildCartLineKey } from "@/lib/posProductMapping";
import {
  calculateOrderTotals,
  resolveLoyaltyForOrder,
  type LoyaltyMode,
} from "@/components/pos-module/pos/posLoyaltyConfig";
import {
  defaultTransactionCustomer,
  transactionPaymentMethods,
  type TransactionCustomer,
  type TransactionPaymentMethod,
} from "@/components/pos-module/pos/transactionDetailsData";
import {
  fetchPosConfig,
  fetchPosCustomers,
  createPosCustomer,
  fetchPaymentMethods,
  type PosCustomer,
  type PaymentMethod,
} from "@/lib/pos";
import { getAccessToken } from "@/lib/auth-session";

const DEFAULT_TAX_RATE = 0;

const WALK_IN_CUSTOMER_ID = "walk-in";

const PAYMENT_ICONS: Record<string, { iconSrc: string; bgColor: string }> = {
  card: { iconSrc: "assets/img/pos/transaction-details/card.svg", bgColor: "#4687f4" },
  cash: { iconSrc: "assets/img/pos/transaction-details/cash.png", bgColor: "#f5805a" },
  giftcard: { iconSrc: "assets/img/pos/transaction-details/giftcard.svg", bgColor: "#fe9f43" },
  cheque: { iconSrc: "assets/img/pos/transaction-details/cheque.png", bgColor: "#0bdbae" },
  "mobile-banking": { iconSrc: "assets/img/pos/transaction-details/mobile-banking.png", bgColor: "#d8526e" },
  mobile_banking: { iconSrc: "assets/img/pos/transaction-details/mobile-banking.png", bgColor: "#d8526e" },
};

const DEFAULT_ICON = { iconSrc: "assets/img/pos/transaction-details/card.svg", bgColor: "#888" };

function posCustomerToTransaction(c: PosCustomer): TransactionCustomer {
  return {
    id: c.id,
    name: c.name,
    phone: c.phone ?? "",
    points: c.points ?? 0,
  };
}

function paymentMethodToTransaction(m: PaymentMethod & { color?: string; modal_target?: string; width?: string }): TransactionPaymentMethod {
  const visual = PAYMENT_ICONS[m.code] ?? PAYMENT_ICONS[m.label.toLowerCase().replace(/\s+/g, "-")] ?? DEFAULT_ICON;
  return {
    id: m.id,
    code: m.code,
    label: m.label,
    iconSrc: m.icon ?? visual.iconSrc,
    bgColor: m.color ?? visual.bgColor,
    width: m.width === "half" ? "half" : undefined,
  };
}

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
  saleId?: string;
  receipt?: unknown;
  receiptRender?: string;
};

export function parseProductPrice(price: string): number {
  return parseCurrency(price);
}

export function parseStockLimit(
  stockLabel: string,
  stockStatus: string,
): number {
  return parseOrderStockMax(
    stockLabel,
    stockStatus as OrderDetailItem["stockStatus"],
  );
}

export function productToOrderItem(product: PosProduct): OrderDetailItem {
  const stockMax = parseOrderStockMax(product.stockLabel, product.stockStatus);
  const productId = product.productId ?? product.id;
  const variantId = product.variantId ?? null;
  const packageId = product.packageId ?? null;

  return {
    id: buildCartLineKey({ productId, variantId, packageId }),
    productId,
    variantId,
    packageId,
    name: product.name,
    sku: product.sku,
    price: parseProductPrice(product.price),
    quantity: 1,
    stockLabel: product.stockLabel,
    stockStatus: product.stockStatus,
    stockMax,
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
    useState<TransactionCustomer[]>([defaultTransactionCustomer]);
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
  const [taxRate, setTaxRate] = useState(DEFAULT_TAX_RATE);
  const [taxEnabled, setTaxEnabled] = useState(false);
  const [paymentMethods, setPaymentMethods] =
    useState<TransactionPaymentMethod[]>(transactionPaymentMethods);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const token = getAccessToken();
      const [configRes, customersRes, methodsRes] = await Promise.all([
        fetchPosConfig(token),
        fetchPosCustomers(undefined, token),
        fetchPaymentMethods({ active: true }, token),
      ]);

      if (cancelled) return;

      if (configRes.ok && configRes.body.data) {
        const cfg = configRes.body.data;
        const rate = parseFloat(cfg.tax_rate);
        setTaxRate(isNaN(rate) ? DEFAULT_TAX_RATE : rate);
        setTaxEnabled(cfg.tax_enabled ?? true);
      }

      if (customersRes.ok && customersRes.body.data) {
        const raw = customersRes.body.data;
        const list: PosCustomer[] = Array.isArray(raw)
          ? raw
          : (raw as { items?: PosCustomer[] }).items ?? [];
        const mapped = list.map(posCustomerToTransaction);
        setCustomers([defaultTransactionCustomer, ...mapped]);
      }

      if (methodsRes.ok && methodsRes.body.data) {
        const raw = methodsRes.body.data;
        const list: PaymentMethod[] = Array.isArray(raw)
          ? raw
          : (raw as { items?: PaymentMethod[] }).items ?? [];
        if (list.length > 0) {
          setPaymentMethods(list.map(paymentMethodToTransaction));
        }
      }
    })();
    return () => { cancelled = true; };
  }, []);

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

  const effectiveTaxRate = taxEnabled ? taxRate : 0;

  const summary = useMemo((): PosCartSummary => {
    const shipping = 0;
    const totals = calculateOrderTotals(
      subtotal,
      loyaltyResolution.effectiveDiscountPercent,
      effectiveTaxRate,
      shipping,
    );

    return {
      subtotal: totals.subtotal,
      tax: totals.tax,
      discount: totals.loyaltyDiscount,
      shipping: totals.shipping,
      totalPayable: totals.totalPayable,
      taxRate: effectiveTaxRate,
      discountRate: totals.discountRate,
      discountPercent: totals.discountPercent,
      loyaltyMode,
      pointsRedeemed: loyaltyResolution.pointsToRedeem,
      pointsToEarn: loyaltyResolution.pointsToEarn,
    };
  }, [effectiveTaxRate, loyaltyMode, loyaltyResolution, subtotal]);

  const summaryLines = useMemo(
    () => buildSummaryLines(summary),
    [summary],
  );

  const cartProductIds = useMemo(
    () => new Set(items.map((item) => item.productId)),
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
        const lineKey = buildCartLineKey({
          productId: product.productId ?? product.id,
          variantId: product.variantId,
          packageId: product.packageId,
        });
        const existing = current.find((item) => item.id === lineKey);
        if (existing) {
          const nextQty = existing.quantity + 1;
          const maxStock = getOrderItemStockMax(existing);
          if (nextQty > maxStock) {
            showStatus(`Only ${maxStock} left in stock`);
            return current;
          }

          added = true;
          return current.map((item) =>
            item.id === lineKey
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

          const maxStock = getOrderItemStockMax(item);
          const nextQty = item.quantity + 1;

          if (nextQty > maxStock) {
            showStatus(`Only ${maxStock} left in stock`);
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

  const completeOrder = useCallback(async (branchId?: string | null) => {
    if (items.length === 0 || selectedPaymentId === null) {
      return;
    }

    const selectedMethod = paymentMethods.find(
      (method) => method.id === selectedPaymentId,
    );
    const paymentLabel = selectedMethod?.label ?? "Payment";
    const paymentCode = selectedMethod?.code ?? selectedPaymentId;

    if (branchId) {
      const { posCheckout } = await import("@/lib/pos");
      const { getAccessToken } = await import("@/lib/auth-session");

      const isWalkIn = selectedCustomer.id === WALK_IN_CUSTOMER_ID;
      const payload = {
        branch: branchId,
        customer: isWalkIn ? undefined : selectedCustomer.id,
        lines: items.map((item) => ({
          product: item.productId,
          quantity: item.quantity,
          variant: item.variantId,
          package: item.packageId,
        })),
        payments: [{ method: paymentCode, amount: summary.totalPayable.toFixed(2) }],
        idempotency_key: typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        promotions: [],
        coupons: [],
        vouchers: [],
      } as Parameters<typeof posCheckout>[0];

      const token = getAccessToken();
      const result = await posCheckout(payload, token);

      if (result.ok && result.body.data) {
        const sale = result.body.data;
        const snapshot = {
          totalPayable: summary.totalPayable,
          paymentLabel,
          invoiceId: sale.ref_number || invoiceId,
          saleId: sale.id,
          receipt: sale.receipt,
          receiptRender: (() => {
            const render = sale.receipt_render;
            if (typeof render !== "object" || render === null) {
              return typeof render === "string" ? render : undefined;
            }
            if (render.formatter === "json") return undefined;
            return render.body ?? undefined;
          })(),
        };
        setReceiptSnapshot(snapshot);
        const { saveLastPosReceipt } = await import(
          "@/components/pos-module/pos/posLastReceiptStorage"
        );
        saveLastPosReceipt(branchId, snapshot);
        showStatus("Payment completed");
        setItems([]);
        setSelectedPaymentId(null);
        setLoyaltyMode("accumulate");
        setInvoiceSeq((current) => current + 1);
        return;
      } else {
        const errorMsg = result.body.message ?? "Checkout failed";
        showStatus(errorMsg);
        throw new Error(errorMsg);
      }
    }

    // Fallback local-only checkout (no branchId)
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
    paymentMethods,
    selectedCustomer.id,
    selectedPaymentId,
    showStatus,
    summary.totalPayable,
  ]);

  const clearReceiptSnapshot = useCallback(() => {
    setReceiptSnapshot(null);
  }, []);

  const createCustomer = useCallback(
    async (input: CreateCustomerInput) => {
      const token = getAccessToken();
      const res = await createPosCustomer(
        { name: input.name, phone: input.phone, email: input.email || undefined },
        token,
      );

      if (res.ok && res.body.data) {
        const created = posCustomerToTransaction(res.body.data);
        setCustomers((current) => [...current, created]);
        setSelectedCustomer(created);
        setLoyaltyMode("accumulate");
        showStatus(`${created.name} added`);
      } else {
        const fallback: TransactionCustomer = {
          id: `local-${Date.now()}`,
          name: input.name,
          phone: input.phone,
          points: 0,
        };
        setCustomers((current) => [...current, fallback]);
        setSelectedCustomer(fallback);
        setLoyaltyMode("accumulate");
        showStatus(res.body.message ?? `${fallback.name} added (offline)`);
      }
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
    showStatus,
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
    paymentMethods,
  };
}
