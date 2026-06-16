import { formatCurrency } from "@/lib/currency";

export type OrderStockStatus = "in-stock" | "low-stock" | "out-of-stock";

export type OrderDetailItem = {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  stockLabel: string;
  stockStatus: OrderStockStatus;
  stockMax: number;
};

export function parseOrderStockMax(
  stockLabel: string,
  stockStatus: OrderStockStatus,
): number {
  if (stockStatus === "out-of-stock") {
    return 0;
  }

  const normalized = stockLabel.trim().toLowerCase();
  if (normalized === "no stock") {
    return 0;
  }

  const leftMatch = normalized.match(/(\d+)\s*left\b/);
  if (leftMatch) {
    return Number(leftMatch[1]);
  }

  const inStockMatch = normalized.match(/(\d+)\s*in\s*stock\b/);
  if (inStockMatch) {
    return Number(inStockMatch[1]);
  }

  const anyNumber = normalized.match(/(\d+)/);
  return anyNumber ? Number(anyNumber[1]) : 0;
}

export function getOrderItemStockMax(item: OrderDetailItem): number {
  return item.stockMax ?? parseOrderStockMax(item.stockLabel, item.stockStatus);
}

const PANEL_IMG = "assets/img/pos/order-details";

export const orderDetailsAssets = {
  minus: `${PANEL_IMG}/minus.svg`,
  plus: `${PANEL_IMG}/plus.svg`,
  remove: `${PANEL_IMG}/remove.svg`,
};

export const initialOrderDetailItems: OrderDetailItem[] = [
  {
    id: "od-1",
    name: "Cold-Pressed Olive Oil",
    sku: "98765478",
    price: 42.33,
    quantity: 2,
    stockLabel: "5 Left",
    stockStatus: "low-stock",
    stockMax: 5,
  },
  {
    id: "od-2",
    name: "Cold-Pressed Olive Oil",
    sku: "98765478",
    price: 42.33,
    quantity: 2,
    stockLabel: "5 Left",
    stockStatus: "low-stock",
    stockMax: 5,
  },
  {
    id: "od-3",
    name: "Cold-Pressed Olive Oil",
    sku: "98765478",
    price: 42.33,
    quantity: 2,
    stockLabel: "5 Left",
    stockStatus: "low-stock",
    stockMax: 5,
  },
  {
    id: "od-4",
    name: "Cold-Pressed Olive Oil",
    sku: "98765478",
    price: 42.33,
    quantity: 2,
    stockLabel: "5 Left",
    stockStatus: "low-stock",
    stockMax: 5,
  },
  {
    id: "od-5",
    name: "Cold-Pressed Olive Oil",
    sku: "98765478",
    price: 42.33,
    quantity: 2,
    stockLabel: "5 Left",
    stockStatus: "low-stock",
    stockMax: 5,
  },
  {
    id: "od-6",
    name: "Cold-Pressed Olive Oil",
    sku: "98765478",
    price: 42.33,
    quantity: 2,
    stockLabel: "5 Left",
    stockStatus: "low-stock",
    stockMax: 5,
  },
  {
    id: "od-7",
    name: "Cold-Pressed Olive Oil",
    sku: "98765478",
    price: 42.33,
    quantity: 2,
    stockLabel: "5 Left",
    stockStatus: "low-stock",
    stockMax: 5,
  },
];

export function formatOrderCurrency(value: number): string {
  return formatCurrency(value);
}

export function getOrderSubtotal(item: OrderDetailItem): number {
  return item.price * item.quantity;
}
