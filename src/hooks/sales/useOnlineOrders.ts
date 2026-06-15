import { onlineOrderData } from "@/core/json/onlineOrderData";
import type { OnlineOrderRecord } from "@/components/sales/online-orders/types";

export function useOnlineOrders() {
  const dataSource = onlineOrderData as OnlineOrderRecord[];

  return { dataSource };
}
