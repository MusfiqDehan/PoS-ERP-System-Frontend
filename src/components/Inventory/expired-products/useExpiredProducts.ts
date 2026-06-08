import { expiredproduct } from "@/core/json/expiredproductdata";
import type { ExpiredProductRecord } from "./types";

export function useExpiredProducts() {
  const dataSource = expiredproduct as ExpiredProductRecord[];

  return {
    dataSource,
  };
}
