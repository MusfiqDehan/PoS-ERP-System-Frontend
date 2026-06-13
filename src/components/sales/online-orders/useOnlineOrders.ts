import { onlineOrderData } from "@/core/json/onlineOrderData";
import type { OnlineOrderRecord } from "./types";

export function useOnlineOrders() {
  const dataSource = onlineOrderData as OnlineOrderRecord[];

  return { dataSource };
}
