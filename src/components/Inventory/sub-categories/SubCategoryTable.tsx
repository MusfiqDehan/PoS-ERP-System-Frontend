"use client";

import Table from "@/core/common/pagination/datatable";
import SubCategoryFilters from "./SubCategoryFilters";
import { subCategoryColumns } from "./columns";
import { useSubCategories } from "./useSubCategories";

export default function SubCategoryTable() {
  const { dataSource } = useSubCategories();

  return (
    <div className="card table-list-card">
      <SubCategoryFilters />
      <div className="card-body">
        <div className="table-responsive sub-category-table">
          <Table columns={subCategoryColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
