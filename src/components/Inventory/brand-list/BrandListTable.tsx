"use client";

import Table from "@/core/common/pagination/datatable";
import BrandListFilters from "./BrandListFilters";
import { brandListColumns } from "./columns";
import { useBrandList } from "@/hooks/inventory/useBrandList";

export default function BrandListTable() {
  const { dataSource } = useBrandList();

  return (
    <div className="card table-list-card">
      <BrandListFilters />
      <div className="card-body">
        <div className="table-responsive brand-table">
          <Table columns={brandListColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
