import { incomelists } from "@/core/json/incomelist";
import type { IncomeRecord } from "./types";

export function useIncomeList() {
  const dataSource = incomelists as IncomeRecord[];

  return { dataSource };
}
