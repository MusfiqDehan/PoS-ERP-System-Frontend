import { quotationlistdata } from "@/core/json/quotationlistdata";
import type { QuotationRecord } from "./types";

export function useQuotations() {
  const dataSource = quotationlistdata as QuotationRecord[];

  return { dataSource };
}
