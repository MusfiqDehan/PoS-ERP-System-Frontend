"use client";

import Table from "@/core/common/pagination/datatable";
import type { ReactNode } from "react";
import { lowStockColumns } from "./columns";
import { useLowStocks } from "./useLowStocks";

type LowStocksTableCardProps = {
  filters: ReactNode;
};

export default function LowStocksTableCard({ filters }: LowStocksTableCardProps) {
  const { dataSource } = useLowStocks();

  return (
                <div className="card table-list-card">
                  <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                    <div className="search-set"></div>
                    {filters}
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <Table columns={lowStockColumns} dataSource={dataSource} />
                    </div>
                  </div>
                </div>
  );
}
