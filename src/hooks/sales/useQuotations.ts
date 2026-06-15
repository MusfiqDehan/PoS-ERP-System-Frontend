import { quotationlistdata } from "@/core/json/quotationlistdata";
import type { QuotationRecord } from "@/components/sales/quotation/types";

export function useQuotations() {
  const dataSource = quotationlistdata as QuotationRecord[];

  return { dataSource };
}
