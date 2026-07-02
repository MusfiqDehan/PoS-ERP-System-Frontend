"use client";

import { useState, useCallback } from "react";
import AddCategoryModal from "@/components/Inventory/category-list/AddCategoryModal";
import CategoryListTable from "@/components/Inventory/category-list/CategoryListTable";
import PageHeader from "@/components/Inventory/category-list/PageHeader";
import EditCategoryModal from "@/components/Inventory/category-list/EditCategoryModal";
import DeleteCategoryModal from "@/components/Inventory/category-list/DeleteCategoryModal";
import CommonFooter from "@/core/common/footer/commonFooter";
import { useCategoryList } from "@/hooks/inventory/useCategoryList";
import type { Category } from "@/lib/inventory";

export default function CategoryList() {
  const { dataSource, loading, error, addCategory, editCategory, removeCategory } =
    useCategoryList();

  const [selectedForEdit, setSelectedForEdit] = useState<Category | null>(null);
  const [selectedForDelete, setSelectedForDelete] = useState<Category | null>(null);

  const handleSelectForEdit = useCallback((record: Category) => {
    setSelectedForEdit(record);
  }, []);

  const handleSelectForDelete = useCallback((record: Category) => {
    setSelectedForDelete(record);
  }, []);

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <CategoryListTable
            dataSource={dataSource}
            loading={loading}
            error={error}
            onSelectForEdit={handleSelectForEdit}
            onSelectForDelete={handleSelectForDelete}
          />
        </div>
        <CommonFooter />
      </div>
      <AddCategoryModal onAddCategory={addCategory} />
      <EditCategoryModal
        category={selectedForEdit}
        onEditCategory={editCategory}
      />
      <DeleteCategoryModal
        category={selectedForDelete}
        onDeleteCategory={removeCategory}
      />
    </div>
  );
}
