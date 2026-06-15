"use client";

import Table from "@/core/common/pagination/datatable";
import QuotationFilters from "./QuotationFilters";
import { quotationColumns } from "./columns";
import { useQuotations } from "@/hooks/sales/useQuotations";

export default function QuotationTable() {
  const { dataSource } = useQuotations();

  return (
    <div className="card table-list-card">
      <QuotationFilters />
      <div className="card-body">
        <div className=" table-responsive">
          <Table columns={quotationColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
