import { discountPlanData } from "@/core/json/discountPlanData";
import type { DiscountPlanRecord } from "@/components/promo/discount-plan/types";

export function useDiscountPlans() {
  const dataSource = discountPlanData as DiscountPlanRecord[];

  return { dataSource };
}
