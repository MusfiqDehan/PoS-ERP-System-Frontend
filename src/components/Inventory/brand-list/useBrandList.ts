import { brandlistdata } from "@/core/json/brandlistdata";
import type { BrandRecord } from "./types";

export function useBrandList() {
  const dataSource = brandlistdata as BrandRecord[];

  return { dataSource };
}
