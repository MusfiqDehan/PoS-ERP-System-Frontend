"use client";

import { useCallback, useState } from "react";
import CommonFooter from "@/core/common/footer/commonFooter";
import AddPlanModal from "@/components/SuperAdmin/packages/AddPlanModal";
import DeletePackageModal from "@/components/SuperAdmin/packages/DeletePackageModal";
import EditPlanModal from "@/components/SuperAdmin/packages/EditPlanModal";
import PackagesTable from "@/components/SuperAdmin/packages/PackagesTable";
import PageHeader from "@/components/SuperAdmin/packages/PageHeader";
import StatsCards from "@/components/SuperAdmin/packages/StatsCards";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function Package() {
  const [searchText, setSearchText] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [deletingPackage, setDeletingPackage] = useState<{ id: string; name: string } | null>(null);
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);

  const handleDelete = useCallback(function (id: string, name: string) {
    setDeletingPackage({ id, name });
  }, []);

  const handleDeleted = useCallback(function () {
    setDeletingPackage(null);
    setRefreshKey(function (k) { return k + 1; });
    // Close the Bootstrap modal
    if (typeof window !== "undefined") {
      const modalEl = document.getElementById("delete_modal");
      if (modalEl) {
        const modal = (window as any).bootstrap?.Modal?.getInstance(modalEl);
        if (modal) modal.hide();
      }
    }
  }, []);

  const handleEdit = useCallback(function (id: string) {
    setEditingPackageId(id);
  }, []);

  const handleCreated = useCallback(function () {
    setRefreshKey(function (k) { return k + 1; });
  }, []);

  return (
    <PermissionGuard featureKey="platform.packages">
      <div className="page-wrapper">
        <div className="content">
          <PageHeader searchText={searchText} onSearchChange={setSearchText} />
          <StatsCards refreshKey={refreshKey} />
          <PackagesTable
            searchText={searchText}
            onDeletePackage={handleDelete}
            onEditPackage={handleEdit}
            refreshKey={refreshKey}
          />
        </div>
        <CommonFooter />
      </div>
      <AddPlanModal onCreated={handleCreated} />
      <EditPlanModal
        packageId={editingPackageId}
        onUpdated={function () {
          setEditingPackageId(null);
          setRefreshKey(function (k) { return k + 1; });
          if (typeof window !== "undefined") {
            const modalEl = document.getElementById("edit_plans");
            if (modalEl) {
              const modal = (window as any).bootstrap?.Modal?.getInstance(modalEl);
              if (modal) modal.hide();
            }
          }
        }}
      />
      <DeletePackageModal
        packageId={deletingPackage?.id ?? null}
        packageName={deletingPackage?.name}
        onDeleted={handleDeleted}
      />
    </PermissionGuard>
  );
}
