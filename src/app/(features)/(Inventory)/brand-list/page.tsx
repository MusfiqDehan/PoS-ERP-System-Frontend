"use client";

import { useState, useCallback } from "react";
import AddBrandModal from "@/components/Inventory/brand-list/AddBrandModal";
import BrandListTable from "@/components/Inventory/brand-list/BrandListTable";
import EditBrandModal from "@/components/Inventory/brand-list/EditBrandModal";
import DeleteBrandModal from "@/components/Inventory/brand-list/DeleteBrandModal";
import PageHeader from "@/components/Inventory/brand-list/PageHeader";
import CommonFooter from "@/core/common/footer/commonFooter";
import { useBrandList } from "@/hooks/inventory/useBrandList";
import type { Brand } from "@/lib/inventory";

export default function BrandList() {
  const { dataSource, loading, error, addBrand, editBrand, removeBrand } =
    useBrandList();

  const [selectedForEdit, setSelectedForEdit] = useState<Brand | null>(null);
  const [selectedForDelete, setSelectedForDelete] = useState<Brand | null>(null);

  const handleSelectForEdit = useCallback((record: Brand) => {
    setSelectedForEdit(record);
  }, []);

  const handleSelectForDelete = useCallback((record: Brand) => {
    setSelectedForDelete(record);
  }, []);

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <BrandListTable
            dataSource={dataSource}
            loading={loading}
            error={error}
            onSelectForEdit={handleSelectForEdit}
            onSelectForDelete={handleSelectForDelete}
          />
        </div>
        <CommonFooter />
      </div>
      <AddBrandModal onAddBrand={addBrand} />
      <EditBrandModal brand={selectedForEdit} onEditBrand={editBrand} />
      <DeleteBrandModal brand={selectedForDelete} onDeleteBrand={removeBrand} />
    </div>
  );
}
