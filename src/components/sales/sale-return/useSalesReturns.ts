import { salersretrunsdata } from "@/core/json/salesreturn";
import type { SalesReturnRecord } from "./types";

export function useSalesReturns() {
  const dataSource = salersretrunsdata as SalesReturnRecord[];

  return { dataSource };
}
