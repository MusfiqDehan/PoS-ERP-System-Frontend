import { productlistdata } from "@/core/json/productlistdata";
import type { ProductListRecord } from "@/components/Inventory/productList/types";

export function useProductList() {
  const dataSource = productlistdata as ProductListRecord[];

  return {
    dataSource,
  };
}
