import { CouponData } from "@/core/json/coupons";
import type { CouponRecord } from "@/components/promo/coupons/types";

export function useCoupons() {
  const dataSource = CouponData as CouponRecord[];

  return { dataSource };
}
