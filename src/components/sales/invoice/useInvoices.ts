import { invoicereportdata } from "@/core/json/invoicereportdata";
import type { InvoiceRecord } from "./types";

export function useInvoices() {
  const dataSource = invoicereportdata as InvoiceRecord[];

  return { dataSource };
}
