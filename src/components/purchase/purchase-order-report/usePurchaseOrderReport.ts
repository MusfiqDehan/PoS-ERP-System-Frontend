import { purchasereportdata } from "@/core/json/purchasereportdata";
import type { PurchaseOrderReportRecord } from "./types";

export function usePurchaseOrderReport() {
  const dataSource = purchasereportdata as PurchaseOrderReportRecord[];

  return { dataSource };
}
