"use client";

import Table from "@/core/common/pagination/datatable";
import CouponFilters from "./CouponFilters";
import { couponColumns } from "./columns";
import { useCoupons } from "./useCoupons";

export default function CouponTable() {
  const { dataSource } = useCoupons();

  return (
    <div className="card table-list-card">
      <CouponFilters />
      <div className="card-body">
        <div className="table-responsive">
          <Table columns={couponColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
