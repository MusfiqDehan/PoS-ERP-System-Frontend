import type { LowStockFilterOption } from "./types";

export const sortFilterOptions: LowStockFilterOption[] = [
  { id: "-quantity", name: "Quantity High-Low" },
  { id: "quantity", name: "Quantity Low-High" },
  { id: "name", name: "Product A-Z" },
  { id: "-name", name: "Product Z-A" },
];
