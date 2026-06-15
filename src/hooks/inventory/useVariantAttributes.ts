import { variantattributesdata } from "@/core/json/variantattributesdata";
import type { VariantAttributeRecord } from "@/components/Inventory/variant-attributes/types";

export function useVariantAttributes() {
  const dataSource = variantattributesdata as VariantAttributeRecord[];

  return { dataSource };
}
