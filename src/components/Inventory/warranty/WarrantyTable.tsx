"use client";
import { useMemo } from "react";
import Table from "@/core/common/pagination/datatable";
import WarrantyFilters from "./WarrantyFilters";
import { makeWarrantyColumns } from "./columns";
import type { WarrantyRecord } from "./types";

type Props = { dataSource: WarrantyRecord[]; loading: boolean; error: string | null; onSelectForEdit: (r: WarrantyRecord) => void; onSelectForDelete: (r: WarrantyRecord) => void; };

export default function WarrantyTable({ dataSource, loading, error, onSelectForEdit, onSelectForDelete }: Props) {
  const columns = useMemo(() => makeWarrantyColumns({ onSelectForEdit, onSelectForDelete }), [onSelectForEdit, onSelectForDelete]);
  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <WarrantyFilters />
      <div className="overflow-x-auto">
        {error ? <div className="p-6 text-center text-[#646B72]"><i className="ti ti-alert-circle text-[#dc3545] text-2xl mb-2 block" /><p>{error}</p></div> : <Table columns={columns} dataSource={dataSource} props={{ loading }} />}
      </div>
    </div>
  );
}
