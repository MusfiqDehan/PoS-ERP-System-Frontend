import { brandlistdata } from "@/core/json/brandlistdata";
import type { BrandRecord } from "@/components/Inventory/brand-list/types";

export function useBrandList() {
  const dataSource = brandlistdata as BrandRecord[];

  return { dataSource };
}
