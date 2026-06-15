"use client";

import Table from "@/core/common/pagination/datatable";
import DiscountFilters from "./DiscountFilters";
import { discountColumns } from "./columns";
import { useDiscounts } from "@/hooks/promo/useDiscounts";

export default function DiscountTable() {
  const { dataSource } = useDiscounts();

  return (
    <div className="card table-list-card">
      <DiscountFilters />
      <div className="card-body">
        <div className="table-responsive">
          <Table columns={discountColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
