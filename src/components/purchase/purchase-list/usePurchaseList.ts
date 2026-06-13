import { purchaseslist } from "@/core/json/purchaselistdata";
import type { PurchaseListRecord } from "./types";

export function usePurchaseList() {
  const dataSource = purchaseslist as PurchaseListRecord[];

  return { dataSource };
}
