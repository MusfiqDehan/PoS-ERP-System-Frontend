import { ManageStocksdata } from "@/core/json/managestocks_data";
import type { ManageStockRecord } from "@/components/stock/managestock/types";

export function useManageStocks() {
  const dataSource = ManageStocksdata as ManageStockRecord[];

  return { dataSource };
}
