"use client";
import { useState, useCallback } from "react";
import AddVariantAttributeModal from "@/components/Inventory/variant-attributes/AddVariantAttributeModal";
import EditVariantAttributeModal from "@/components/Inventory/variant-attributes/EditVariantAttributeModal";
import DeleteVariantAttributeModal from "@/components/Inventory/variant-attributes/DeleteVariantAttributeModal";
import PageHeader from "@/components/Inventory/variant-attributes/PageHeader";
import VariantAttributeTable from "@/components/Inventory/variant-attributes/VariantAttributeTable";
import CommonFooter from "@/core/common/footer/commonFooter";
import { useVariantAttributes } from "@/hooks/inventory/useVariantAttributes";
import type { VariantAttribute } from "@/lib/inventory";

export default function VariantAttributes() {
  const { dataSource, loading, error, addVariantAttribute, editVariantAttribute, removeVariantAttribute } = useVariantAttributes();
  const [e, setE] = useState<VariantAttribute | null>(null);
  const [d, setD] = useState<VariantAttribute | null>(null);
  return (
    <div>
      <div className="page-wrapper"><div className="content"><PageHeader /><VariantAttributeTable dataSource={dataSource} loading={loading} error={error} onSelectForEdit={useCallback(r => setE(r), [])} onSelectForDelete={useCallback(r => setD(r), [])} /></div><CommonFooter /></div>
      <AddVariantAttributeModal onAdd={addVariantAttribute} />
      <EditVariantAttributeModal attr={e} onEdit={editVariantAttribute} />
      <DeleteVariantAttributeModal attr={d} onDelete={removeVariantAttribute} />
    </div>
  );
}
