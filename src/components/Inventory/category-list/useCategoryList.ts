import { categorylist } from "@/core/json/categorylistdata";
import type { CategoryRecord } from "./types";

export function useCategoryList() {
  const dataSource = categorylist as CategoryRecord[];

  return { dataSource };
}
