import { ManageStocksdata } from "@/core/json/managestocks_data";
import type { ManageStockRecord } from "@/components/stock/managestock/types";

export function useStockAdjustments() {
  const dataSource = ManageStocksdata as ManageStockRecord[];

  return { dataSource };
}
