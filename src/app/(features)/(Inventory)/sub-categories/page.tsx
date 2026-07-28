"use client";

import { useState, useCallback } from "react";
import { PermissionGuard } from "@/components/auth/PermissionGuard";
import AddSubCategoryModal from "@/components/Inventory/sub-categories/AddSubCategoryModal";
import EditSubCategoryModal from "@/components/Inventory/sub-categories/EditSubCategoryModal";
import DeleteSubCategoryModal from "@/components/Inventory/sub-categories/DeleteSubCategoryModal";
import PageHeader from "@/components/Inventory/sub-categories/PageHeader";
import SubCategoryTable from "@/components/Inventory/sub-categories/SubCategoryTable";
import CommonFooter from "@/core/common/footer/commonFooter";
import { useSubCategories } from "@/hooks/inventory/useSubCategories";
import type { SubCategory } from "@/lib/inventory";

export default function SubCategories() {
  const {
    dataSource,
    parents,
    loading,
    error,
    addSubCategory,
    editSubCategory,
    removeSubCategory,
  } = useSubCategories();

  const [selectedForEdit, setSelectedForEdit] = useState<SubCategory | null>(null);
  const [selectedForDelete, setSelectedForDelete] = useState<SubCategory | null>(null);

  const handleSelectForEdit = useCallback((record: SubCategory) => {
    setSelectedForEdit(record);
  }, []);

  const handleSelectForDelete = useCallback((record: SubCategory) => {
    setSelectedForDelete(record);
  }, []);

  return (
    <PermissionGuard featureKey="sub_categories">
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <SubCategoryTable
            dataSource={dataSource}
            loading={loading}
            error={error}
            onSelectForEdit={handleSelectForEdit}
            onSelectForDelete={handleSelectForDelete}
          />
        </div>
        <CommonFooter />
      </div>
      <AddSubCategoryModal
        parentCategories={parents}
        onAddSubCategory={addSubCategory}
      />
      <EditSubCategoryModal
        subCategory={selectedForEdit}
        parentCategories={parents}
        onEditSubCategory={editSubCategory}
      />
      <DeleteSubCategoryModal
        subCategory={selectedForDelete}
        onDeleteSubCategory={removeSubCategory}
      />
    </PermissionGuard>
  );
}
