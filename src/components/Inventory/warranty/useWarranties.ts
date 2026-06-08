import { warrentydata } from "@/core/json/waarrentydata";
import type { WarrantyRecord } from "./types";

export function useWarranties() {
  const dataSource = warrentydata as WarrantyRecord[];

  return { dataSource };
}
