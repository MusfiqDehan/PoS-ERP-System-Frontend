import { ManageStocksdata } from "@/core/json/managestocks_data";
import type { ManageStockRecord } from "./types";

export function useManageStocks() {
  const dataSource = ManageStocksdata as ManageStockRecord[];

  return { dataSource };
}
