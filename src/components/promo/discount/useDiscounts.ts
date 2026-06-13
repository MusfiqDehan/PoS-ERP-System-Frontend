import { discountData } from "@/core/json/discountData";
import type { DiscountRecord } from "./types";

export function useDiscounts() {
  const dataSource = discountData as DiscountRecord[];

  return { dataSource };
}
