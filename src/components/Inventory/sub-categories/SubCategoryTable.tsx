"use client";

import Table from "@/core/common/pagination/datatable";
import SubCategoryFilters from "./SubCategoryFilters";
import { subCategoryColumns } from "./columns";
import { useSubCategories } from "@/hooks/inventory/useSubCategories";

export default function SubCategoryTable() {
  const { dataSource } = useSubCategories();

  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <SubCategoryFilters />
      <div className="overflow-x-auto">
        <Table columns={subCategoryColumns} dataSource={dataSource} />
      </div>
    </div>
  );
}
