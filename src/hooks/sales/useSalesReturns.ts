import { salersretrunsdata } from "@/core/json/salesreturn";
import type { SalesReturnRecord } from "@/components/sales/sale-return/types";

export function useSalesReturns() {
  const dataSource = salersretrunsdata as SalesReturnRecord[];

  return { dataSource };
}
