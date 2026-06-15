import { lowstockdata } from "@/core/json/lowstockdata";
import type { LowStockRecord } from "@/components/Inventory/low-stocks/types";

export function useLowStocks() {
  const dataSource = lowstockdata as LowStockRecord[];

  return {
    dataSource,
  };
}
