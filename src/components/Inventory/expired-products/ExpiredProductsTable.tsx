"use client";

import Table from "@/core/common/pagination/datatable";
import { expiredProductColumns } from "./columns";
import ExpiredProductsFilters from "./ExpiredProductsFilters";
import { useExpiredProducts } from "@/hooks/inventory/useExpiredProducts";

export default function ExpiredProductsTable() {
  const { dataSource } = useExpiredProducts();

  return (
            <div className="card table-list-card">
              <ExpiredProductsFilters />
              <div className="card-body">
                <div className="table-responsive">
                  <Table columns={expiredProductColumns} dataSource={dataSource} />
                </div>
              </div>
            </div>
  );
}
