"use client";

import Table from "@/core/common/pagination/datatable";
import InvoiceFilters from "./InvoiceFilters";
import { invoiceColumns } from "./columns";
import { useInvoices } from "./useInvoices";

export default function InvoiceTable() {
  const { dataSource } = useInvoices();

  return (
    <div className="card table-list-card">
      <InvoiceFilters />
      <div className="card-body">
        <div className=" table-responsive">
          <Table columns={invoiceColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
