"use client";

import Table from "@/core/common/pagination/datatable";
import CategoryListFilters from "./CategoryListFilters";
import { categoryListColumns } from "./columns";
import { useCategoryList } from "@/hooks/inventory/useCategoryList";

export default function CategoryListTable() {
  const { dataSource } = useCategoryList();

  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <CategoryListFilters />
      <div className="overflow-x-auto">
        <Table columns={categoryListColumns} dataSource={dataSource} />
      </div>
    </div>
  );
}
