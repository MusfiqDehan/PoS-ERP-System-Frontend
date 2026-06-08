import { unitsdata } from "@/core/json/unitsdata";
import type { UnitRecord } from "./types";

export function useUnits() {
  const dataSource = unitsdata as UnitRecord[];

  return { dataSource };
}
