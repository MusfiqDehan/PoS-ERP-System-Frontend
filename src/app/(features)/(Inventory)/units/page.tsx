"use client";

import { useState, useCallback } from "react";
import { PermissionGuard } from "@/components/auth/PermissionGuard";
import AddUnitModal from "@/components/Inventory/units/AddUnitModal";
import EditUnitModal from "@/components/Inventory/units/EditUnitModal";
import DeleteUnitModal from "@/components/Inventory/units/DeleteUnitModal";
import PageHeader from "@/components/Inventory/units/PageHeader";
import UnitsTable from "@/components/Inventory/units/UnitsTable";
import CommonFooter from "@/core/common/footer/commonFooter";
import { useUnits } from "@/hooks/inventory/useUnits";
import type { Unit } from "@/lib/inventory";

export default function Units() {
  const { dataSource, loading, error, addUnit, editUnit, removeUnit } = useUnits();

  const [selectedForEdit, setSelectedForEdit] = useState<Unit | null>(null);
  const [selectedForDelete, setSelectedForDelete] = useState<Unit | null>(null);

  const handleSelectForEdit = useCallback((record: Unit) => setSelectedForEdit(record), []);
  const handleSelectForDelete = useCallback((record: Unit) => setSelectedForDelete(record), []);

  return (
    <PermissionGuard featureKey="units">
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <UnitsTable
            dataSource={dataSource}
            loading={loading}
            error={error}
            onSelectForEdit={handleSelectForEdit}
            onSelectForDelete={handleSelectForDelete}
          />
        </div>
        <CommonFooter />
      </div>
      <AddUnitModal onAddUnit={addUnit} />
      <EditUnitModal unit={selectedForEdit} onEditUnit={editUnit} />
      <DeleteUnitModal unit={selectedForDelete} onDeleteUnit={removeUnit} />
    </PermissionGuard>
  );
}
