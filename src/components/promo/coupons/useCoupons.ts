import { CouponData } from "@/core/json/coupons";
import type { CouponRecord } from "./types";

export function useCoupons() {
  const dataSource = CouponData as CouponRecord[];

  return { dataSource };
}
