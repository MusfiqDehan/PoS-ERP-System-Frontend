"use client";

import Table from "@/core/common/pagination/datatable";
import CategoryListFilters from "./CategoryListFilters";
import { categoryListColumns } from "./columns";
import { useCategoryList } from "./useCategoryList";

export default function CategoryListTable() {
  const { dataSource } = useCategoryList();

  return (
    <div className="card table-list-card">
      <CategoryListFilters />
      <div className="card-body">
        <div className="table-responsive category-table">
          <Table columns={categoryListColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
