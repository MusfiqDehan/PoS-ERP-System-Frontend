import { productlistdata } from "@/core/json/productlistdata";
import type { ProductListRecord } from "./types";

export function useProductList() {
  const dataSource = productlistdata as ProductListRecord[];

  return {
    dataSource,
  };
}
