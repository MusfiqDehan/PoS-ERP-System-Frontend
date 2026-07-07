import type { LowStockRow } from "@/lib/inventory";

export type LowStockRecord = LowStockRow & {
  id: string;
  branch_name: string | null;
  warehouse_name: string | null;
  category_id: string | null;
  category_name: string | null;
};

export type LowStockFilterOption = { id: string; name: string };

export type LowStockFiltersState = {
  warehouse?: string;
  branch?: string;
  category?: string;
  product?: string;
  ordering?: string;
};

export type LowStockTab = "low" | "out";
