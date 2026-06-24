"use client";

import Table from "@/core/common/pagination/datatable";
import type { ReactNode } from "react";
import { lowStockColumns } from "./columns";
import { useLowStocks } from "@/hooks/inventory/useLowStocks";

type LowStocksTableCardProps = {
  filters: ReactNode;
};

export default function LowStocksTableCard({ filters }: LowStocksTableCardProps) {
  const { dataSource } = useLowStocks();

  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <div className="flex items-center justify-end flex-wrap gap-2 p-4 border-b border-[#f1f1f1]">
        {filters}
      </div>
      <div className="overflow-x-auto">
        <Table columns={lowStockColumns} dataSource={dataSource} />
      </div>
    </div>
  );
}
