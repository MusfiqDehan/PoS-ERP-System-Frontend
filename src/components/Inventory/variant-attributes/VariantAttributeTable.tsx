"use client";
import { useMemo } from "react";
import Table from "@/core/common/pagination/datatable";
import VariantAttributeFilters from "./VariantAttributeFilters";
import { makeVariantAttributeColumns } from "./columns";
import type { VariantAttributeRecord } from "./types";

type Props = { dataSource: VariantAttributeRecord[]; loading: boolean; error: string | null; onSelectForEdit: (r: VariantAttributeRecord) => void; onSelectForDelete: (r: VariantAttributeRecord) => void; };

export default function VariantAttributeTable({ dataSource, loading, error, onSelectForEdit, onSelectForDelete }: Props) {
  const columns = useMemo(() => makeVariantAttributeColumns({ onSelectForEdit, onSelectForDelete }), [onSelectForEdit, onSelectForDelete]);
  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <VariantAttributeFilters />
      <div className="overflow-x-auto">
        {error ? <div className="p-6 text-center text-[#646B72]"><i className="ti ti-alert-circle text-[#dc3545] text-2xl mb-2 block" /><p>{error}</p></div> : <Table columns={columns} dataSource={dataSource} props={{ loading }} />}
      </div>
    </div>
  );
}
