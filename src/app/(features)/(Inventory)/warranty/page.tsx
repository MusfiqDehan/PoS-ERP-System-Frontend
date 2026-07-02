"use client";
import { useState, useCallback } from "react";
import AddWarrantyModal from "@/components/Inventory/warranty/AddWarrantyModal";
import EditWarrantyModal from "@/components/Inventory/warranty/EditWarrantyModal";
import DeleteWarrantyModal from "@/components/Inventory/warranty/DeleteWarrantyModal";
import PageHeader from "@/components/Inventory/warranty/PageHeader";
import WarrantyTable from "@/components/Inventory/warranty/WarrantyTable";
import CommonFooter from "@/core/common/footer/commonFooter";
import { useWarranties } from "@/hooks/inventory/useWarranties";
import type { Warranty } from "@/lib/inventory";

export default function Warranty() {
  const { dataSource, loading, error, addWarranty, editWarranty, removeWarranty } = useWarranties();
  const [e, setE] = useState<Warranty | null>(null);
  const [d, setD] = useState<Warranty | null>(null);
  return (
    <div>
      <div className="page-wrapper"><div className="content"><PageHeader /><WarrantyTable dataSource={dataSource} loading={loading} error={error} onSelectForEdit={useCallback(r => setE(r), [])} onSelectForDelete={useCallback(r => setD(r), [])} /></div><CommonFooter /></div>
      <AddWarrantyModal onAddWarranty={addWarranty} />
      <EditWarrantyModal warranty={e} onEditWarranty={editWarranty} />
      <DeleteWarrantyModal warranty={d} onDeleteWarranty={removeWarranty} />
    </div>
  );
}
