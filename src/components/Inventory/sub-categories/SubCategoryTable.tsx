"use client";

import { useMemo } from "react";
import Table from "@/core/common/pagination/datatable";
import SubCategoryFilters from "./SubCategoryFilters";
import { makeSubCategoryColumns } from "./columns";
import type { SubCategoryRecord } from "./types";

type Props = {
  dataSource: SubCategoryRecord[];
  loading: boolean;
  error: string | null;
  onSelectForEdit: (record: SubCategoryRecord) => void;
  onSelectForDelete: (record: SubCategoryRecord) => void;
};

export default function SubCategoryTable({
  dataSource,
  loading,
  error,
  onSelectForEdit,
  onSelectForDelete,
}: Props) {
  const columns = useMemo(
    () => makeSubCategoryColumns({ onSelectForEdit, onSelectForDelete }),
    [onSelectForEdit, onSelectForDelete],
  );

  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <SubCategoryFilters />
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
