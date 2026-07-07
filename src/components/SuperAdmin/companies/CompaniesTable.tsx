"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useState } from "react";
import Table from "@/core/common/pagination/datatable";
import {
  fetchPlatformTenants,
  updatePlatformTenant,
  type PlatformTenant,
} from "@/lib/platform";
import { getAccessToken } from "@/lib/auth-session";
import ActionDropdown from "./ActionDropdown";

function formatDate(iso: string | undefined | null): string {
  if (!iso) return "---";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso.slice(0, 10);
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function statusBadge(tenant: PlatformTenant) {
  if (!tenant.is_enabled) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-[3px] rounded text-[11px] font-medium bg-[#fff0f0] text-[#c80000]">
        <i className="ti ti-point-filled" />
        Inactive
      </span>
    );
  }
  const label = tenant.status === "trial" ? "Trial" : tenant.status === "active" ? "Active" : tenant.status;
  const cls =
    tenant.status === "active"
      ? "bg-[#E7FBF7] text-[#0ac79e]"
      : tenant.status === "trial"
        ? "bg-[#F2EDFE] text-[#6938EF]"
        : tenant.status === "suspended"
          ? "bg-[#FFF3CD] text-[#856404]"
          : "bg-[#f0f0f0] text-[#646B72]";
  return (
    <span
      className={
        "inline-flex items-center gap-1 px-2 py-[3px] rounded text-[11px] font-medium capitalize " +
        cls
      }
    >
      <i className="ti ti-point-filled" />
      {label}
    </span>
  );
}

type Props = {
  searchText: string;
  statusFilter: string;
  onViewDetails: (tenant: PlatformTenant) => void;
  onEdit: (tenant: PlatformTenant) => void;
  onUploadLogo: (tenant: PlatformTenant) => void;
  onManageFeatures: (tenant: PlatformTenant) => void;
  onDelete: (tenant: PlatformTenant) => void;
  refreshKey: number;
};

export default function CompaniesTable({
  searchText,
  statusFilter,
  onViewDetails,
  onEdit,
  onUploadLogo,
  onManageFeatures,
  onDelete,
  refreshKey,
}: Props) {
  const [tenants, setTenants] = useState<PlatformTenant[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTenants = useCallback(async () => {
    const token = getAccessToken();
    if (!token) return;
    setLoading(true);
    const result = await fetchPlatformTenants(token, {
      search: searchText,
      status: statusFilter,
    });
    if (
      result.ok &&
      result.body.success &&
      result.body.data &&
      Array.isArray(result.body.data)
    ) {
      setTenants(result.body.data);
    }
    setLoading(false);
  }, [searchText, statusFilter]);

  useEffect(() => {
    loadTenants();
  }, [loadTenants, refreshKey]);

  async function handleToggleActive(tenant: PlatformTenant) {
    const token = getAccessToken();
    if (!token) return;
    const newEnabled = !tenant.is_enabled;
    const payload = newEnabled
      ? { is_enabled: true, status: "active" as const }
      : { is_enabled: false };
    const result = await updatePlatformTenant(token, tenant.id, payload);
    if (result.ok && result.body.success) {
      loadTenants();
    }
  }

  const columns = [
    {
      title: "Company Name",
      dataIndex: "name",
      render: (_: unknown, record: PlatformTenant) => (
        <div className="flex items-center gap-2">
          <span className="w-10 h-10 rounded-full border border-[#f1f1f1] overflow-hidden flex items-center justify-center shrink-0 bg-[#f6f6f6]">
            {record.logo_url ? (
              <img
                src={record.logo_url}
                className="w-full h-full object-cover"
                alt={record.name}
              />
            ) : (
              <i className="ti ti-building text-[18px] text-[#94A3B8]" />
            )}
          </span>
          <h6 className="m-0 text-[15px] font-medium text-[#212B36]">
            {record.name}
          </h6>
        </div>
      ),
      sorter: (a: PlatformTenant, b: PlatformTenant) =>
        a.name.localeCompare(b.name),
    },
    {
      title: "Admin",
      dataIndex: "admin_name",
      render: (_: unknown, record: PlatformTenant) => (
        <div>
          <p className="m-0 text-[13px] font-medium text-[#212B36]">
            {record.admin_name || "---"}
          </p>
          <p className="m-0 text-[12px] text-[#94A3B8]">
            {record.admin_email || record.owner_email || "---"}
          </p>
        </div>
      ),
    },
    {
      title: "Account URL",
      dataIndex: "domains",
      render: (_: unknown, record: PlatformTenant) => (
        <span className="text-[13px] text-[#646B72]">
          {record.domains?.[0] || "---"}
        </span>
      ),
    },
    {
      title: "Plan",
      dataIndex: "plan",
      render: (text: string) => (
        <span className="inline-flex items-center px-2 py-[3px] rounded text-[11px] font-medium bg-[#F2EDFE] text-[#6938EF] capitalize">
          {text || "---"}
        </span>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      render: (text: string) => (
        <span className="text-[13px] text-[#646B72]">{formatDate(text)}</span>
      ),
      sorter: (a: PlatformTenant, b: PlatformTenant) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_: unknown, record: PlatformTenant) => statusBadge(record),
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_: unknown, record: PlatformTenant) => (
        <ActionDropdown
          tenant={record}
          onViewDetails={onViewDetails}
          onEdit={onEdit}
          onUploadLogo={onUploadLogo}
          onManageFeatures={onManageFeatures}
          onToggleActive={handleToggleActive}
          onDelete={onDelete}
        />
      ),
    },
  ];

  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <div className="flex items-center justify-between flex-wrap gap-3 p-4 border-b border-[#f1f1f1]">
        <h5 className="m-0 text-[16px] font-semibold text-[#212B36]">
          Companies List
        </h5>
        {loading && (
          <span className="text-[12px] text-[#94A3B8]">Loading...</span>
        )}
      </div>
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={tenants}
          searchText=""
        />
      </div>
    </div>
  );
}
