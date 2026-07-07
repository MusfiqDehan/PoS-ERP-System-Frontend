"use client";

import { useCallback, useState } from "react";
import CommonFooter from "@/core/common/footer/commonFooter";
import CompaniesTable from "@/components/SuperAdmin/companies/CompaniesTable";
import CompanyDetailModal from "@/components/SuperAdmin/companies/CompanyDetailModal";
import DeleteCompanyModal from "@/components/SuperAdmin/companies/DeleteCompanyModal";
import EditCompanyModal from "@/components/SuperAdmin/companies/EditCompanyModal";
import InviteCompanyModal from "@/components/SuperAdmin/companies/InviteCompanyModal";
import ManageFeaturesModal from "@/components/SuperAdmin/companies/ManageFeaturesModal";
import PageHeader from "@/components/SuperAdmin/companies/PageHeader";
import PendingInvitesTable from "@/components/SuperAdmin/companies/PendingInvitesTable";
import StatsCards, {
  type StatusFilter,
} from "@/components/SuperAdmin/companies/StatsCards";
import { PermissionGuard } from "@/components/auth/PermissionGuard";
import type { PlatformTenant } from "@/lib/platform";

export default function Companies() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [refreshKey, setRefreshKey] = useState(0);

  const [inviteOpen, setInviteOpen] = useState(false);
  const [editTenant, setEditTenant] = useState<PlatformTenant | null>(null);
  const [featuresTenant, setFeaturesTenant] = useState<PlatformTenant | null>(
    null,
  );
  const [detailTenant, setDetailTenant] = useState<PlatformTenant | null>(null);
  const [deleteTenant, setDeleteTenant] = useState<PlatformTenant | null>(null);

  const refresh = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  function handleUploadLogo(tenant: PlatformTenant) {
    setEditTenant(tenant);
  }

  const apiStatusFilter =
    statusFilter === "all"
      ? ""
      : statusFilter === "active"
        ? "active"
        : statusFilter === "inactive"
          ? "suspended,cancelled"
          : "";

  return (
    <PermissionGuard featureKey="platform.tenants">
      <div className="page-wrapper">
        <div className="content">
          <PageHeader
            searchText={searchText}
            onSearchChange={setSearchText}
            onInviteCompany={() => setInviteOpen(true)}
          />
          <StatsCards
            activeFilter={statusFilter}
            onFilterChange={setStatusFilter}
          />

          {statusFilter === "pending_invites" ? (
            <PendingInvitesTable refreshKey={refreshKey} />
          ) : (
            <CompaniesTable
              searchText={searchText}
              statusFilter={apiStatusFilter}
              onViewDetails={(t) => setDetailTenant(t)}
              onEdit={(t) => setEditTenant(t)}
              onUploadLogo={handleUploadLogo}
              onManageFeatures={(t) => setFeaturesTenant(t)}
              onDelete={(t) => setDeleteTenant(t)}
              refreshKey={refreshKey}
            />
          )}
        </div>
        <CommonFooter />
      </div>

      <InviteCompanyModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        onSuccess={refresh}
      />
      <EditCompanyModal
        tenant={editTenant}
        open={!!editTenant}
        onClose={() => setEditTenant(null)}
        onSuccess={refresh}
      />
      <ManageFeaturesModal
        tenant={featuresTenant}
        open={!!featuresTenant}
        onClose={() => setFeaturesTenant(null)}
        onSuccess={refresh}
      />
      {detailTenant && <CompanyDetailModal />}
      {deleteTenant && <DeleteCompanyModal />}
    </PermissionGuard>
  );
}
