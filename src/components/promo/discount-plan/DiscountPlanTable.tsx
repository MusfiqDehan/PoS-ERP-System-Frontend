"use client";

import Table from "@/core/common/pagination/datatable";
import DiscountPlanFilters from "./DiscountPlanFilters";
import { discountPlanColumns } from "./columns";
import { useDiscountPlans } from "@/hooks/promo/useDiscountPlans";

export default function DiscountPlanTable() {
  const { dataSource } = useDiscountPlans();

  return (
    <div className="card table-list-card">
      <DiscountPlanFilters />
      <div className="card-body">
        <div className="table-responsive">
          <Table columns={discountPlanColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
