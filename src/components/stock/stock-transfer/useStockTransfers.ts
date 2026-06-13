import { StockTransferData } from "@/core/json/stocktransferdata";
import type { StockTransferRecord } from "./types";

export function useStockTransfers() {
  const dataSource = StockTransferData as StockTransferRecord[];

  return { dataSource };
}
