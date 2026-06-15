import { unitsdata } from "@/core/json/unitsdata";
import type { UnitRecord } from "@/components/Inventory/units/types";

export function useUnits() {
  const dataSource = unitsdata as UnitRecord[];

  return { dataSource };
}
