import { purchasereportdata } from "@/core/json/purchasereportdata";
import type { PurchaseOrderReportRecord } from "@/components/purchase/purchase-order-report/types";

export function usePurchaseOrderReport() {
  const dataSource = purchasereportdata as PurchaseOrderReportRecord[];

  return { dataSource };
}
