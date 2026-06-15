import { purchasesreturn } from "@/core/json/purchasereturn";
import type { PurchaseReturnRecord } from "@/components/purchase/purchase-returns/types";

export function usePurchaseReturns() {
  const dataSource = purchasesreturn as PurchaseReturnRecord[];

  return { dataSource };
}
