"use client";

import Table from "@/core/common/pagination/datatable";
import GiftCardFilters from "./GiftCardFilters";
import { giftCardColumns } from "./columns";
import { useGiftCards } from "./useGiftCards";

export default function GiftCardTable() {
  const { dataSource } = useGiftCards();

  return (
    <div className="card table-list-card">
      <GiftCardFilters />
      <div className="card-body">
        <div className="table-responsive">
          <Table columns={giftCardColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
