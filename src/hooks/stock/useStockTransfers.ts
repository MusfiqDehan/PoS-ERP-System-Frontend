import { StockTransferData } from "@/core/json/stocktransferdata";
import type { StockTransferRecord } from "@/components/stock/stock-transfer/types";

export function useStockTransfers() {
  const dataSource = StockTransferData as StockTransferRecord[];

  return { dataSource };
}
