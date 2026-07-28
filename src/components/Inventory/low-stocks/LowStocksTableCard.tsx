"use client";

import type { ReactNode } from "react";
import Table from "@/core/common/pagination/datatable";
import { lowStockColumns } from "./columns";
import type { LowStockRecord } from "./types";

type Props = {
  filters: ReactNode;
  dataSource: LowStockRecord[];
  loading: boolean;
  error: string | null;
  emptyMessage: string;
};

export default function LowStocksTableCard({
  filters,
  dataSource,
  loading,
  error,
  emptyMessage,
}: Props) {
  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <div className="flex items-center justify-end flex-wrap gap-2 p-4 border-b border-[#f1f1f1]">
        {filters}
      </div>
      <div className="overflow-x-auto">
        {error ? (
          <div className="p-6 text-center text-[#646B72]">
            <i className="ti ti-alert-circle text-[#dc3545] text-2xl mb-2 block" />
            <p>{error}</p>
          </div>
        ) : !loading && dataSource.length === 0 ? (
          <div className="p-6 text-center text-[#646B72]">
            <p>{emptyMessage}</p>
          </div>
        ) : (
          <Table
            columns={lowStockColumns}
            dataSource={dataSource}
            props={{ loading }}
          />
        )}
      </div>
    </div>
  );
}
