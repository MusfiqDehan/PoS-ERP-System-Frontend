import { warrentydata } from "@/core/json/waarrentydata";
import type { WarrantyRecord } from "@/components/Inventory/warranty/types";

export function useWarranties() {
  const dataSource = warrentydata as WarrantyRecord[];

  return { dataSource };
}
