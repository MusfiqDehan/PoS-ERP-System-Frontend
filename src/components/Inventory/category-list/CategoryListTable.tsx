"use client";

import { useMemo } from "react";
import Table from "@/core/common/pagination/datatable";
import CategoryListFilters from "./CategoryListFilters";
import { makeCategoryListColumns } from "./columns";
import type { CategoryRecord } from "./types";

type Props = {
  dataSource: CategoryRecord[];
  loading: boolean;
  error: string | null;
  onSelectForEdit: (record: CategoryRecord) => void;
  onSelectForDelete: (record: CategoryRecord) => void;
};

export default function CategoryListTable({
  dataSource,
  loading,
  error,
  onSelectForEdit,
  onSelectForDelete,
}: Props) {
  const columns = useMemo(
    () => makeCategoryListColumns({ onSelectForEdit, onSelectForDelete }),
    [onSelectForEdit, onSelectForDelete],
  );

  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <CategoryListFilters />
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
