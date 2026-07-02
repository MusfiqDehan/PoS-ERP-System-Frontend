"use client";

import { useMemo } from "react";
import Table from "@/core/common/pagination/datatable";
import { makeProductListColumns } from "./columns";
import ProductListFilters from "./ProductListFilters";
import type { ProductListRecord } from "./types";

type Props = { dataSource: ProductListRecord[]; loading: boolean; error: string | null; onSelectForDelete: (r: ProductListRecord) => void };

export default function ProductListTable({ dataSource, loading, error, onSelectForDelete }: Props) {
  const columns = useMemo(() => makeProductListColumns({ onSelectForDelete }), [onSelectForDelete]);
  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <ProductListFilters />
      <div className="overflow-x-auto">
        {error ? <div className="p-6 text-center text-[#646B72]"><i className="ti ti-alert-circle text-[#dc3545] text-2xl mb-2 block" /><p>{error}</p></div> : <Table columns={columns} dataSource={dataSource} props={{ loading }} />}
      </div>
    </div>
  );
}
