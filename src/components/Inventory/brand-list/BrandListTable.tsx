"use client";

import { useMemo } from "react";
import Table from "@/core/common/pagination/datatable";
import BrandListFilters from "./BrandListFilters";
import { makeBrandListColumns } from "./columns";
import type { BrandRecord } from "./types";

type Props = {
  dataSource: BrandRecord[];
  loading: boolean;
  error: string | null;
  onSelectForEdit: (record: BrandRecord) => void;
  onSelectForDelete: (record: BrandRecord) => void;
};

export default function BrandListTable({
  dataSource,
  loading,
  error,
  onSelectForEdit,
  onSelectForDelete,
}: Props) {
  const columns = useMemo(
    () => makeBrandListColumns({ onSelectForEdit, onSelectForDelete }),
    [onSelectForEdit, onSelectForDelete],
  );

  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <BrandListFilters />
      <div className="overflow-x-auto">
        {error ? (
          <div className="p-6 text-center text-[#646B72]">
            <i className="ti ti-alert-circle text-[#dc3545] text-2xl mb-2 block" />
            <p>{error}</p>
          </div>
        ) : (
          <Table columns={columns} dataSource={dataSource} props={{ loading }} />
        )}
      </div>
    </div>
  );
}
