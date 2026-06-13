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
};

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
  },
  {
    id: "od-2",
    name: "Cold-Pressed Olive Oil",
    sku: "98765478",
    price: 42.33,
    quantity: 2,
    stockLabel: "5 Left",
    stockStatus: "low-stock",
  },
  {
    id: "od-3",
    name: "Cold-Pressed Olive Oil",
    sku: "98765478",
    price: 42.33,
    quantity: 2,
    stockLabel: "5 Left",
    stockStatus: "low-stock",
  },
  {
    id: "od-4",
    name: "Cold-Pressed Olive Oil",
    sku: "98765478",
    price: 42.33,
    quantity: 2,
    stockLabel: "5 Left",
    stockStatus: "low-stock",
  },
  {
    id: "od-5",
    name: "Cold-Pressed Olive Oil",
    sku: "98765478",
    price: 42.33,
    quantity: 2,
    stockLabel: "5 Left",
    stockStatus: "low-stock",
  },
  {
    id: "od-6",
    name: "Cold-Pressed Olive Oil",
    sku: "98765478",
    price: 42.33,
    quantity: 2,
    stockLabel: "5 Left",
    stockStatus: "low-stock",
  },
  {
    id: "od-7",
    name: "Cold-Pressed Olive Oil",
    sku: "98765478",
    price: 42.33,
    quantity: 2,
    stockLabel: "5 Left",
    stockStatus: "low-stock",
  },
];

export function formatOrderCurrency(value: number): string {
  return formatCurrency(value);
}

export function getOrderSubtotal(item: OrderDetailItem): number {
  return item.price * item.quantity;
}
