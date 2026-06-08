import { variantattributesdata } from "@/core/json/variantattributesdata";
import type { VariantAttributeRecord } from "./types";

export function useVariantAttributes() {
  const dataSource = variantattributesdata as VariantAttributeRecord[];

  return { dataSource };
}
