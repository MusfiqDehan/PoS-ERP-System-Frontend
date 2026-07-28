"use client";

import { useCallback, useEffect, useState } from "react";
import Table from "@/core/common/pagination/datatable";
import {
  listTenantInvitations,
  resendTenantInvitation,
  revokeTenantInvitation,
  type TenantInvitation,
} from "@/lib/platform";
import { getAccessToken } from "@/lib/auth-session";

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

function statusBadge(status: string) {
  const map: Record<string, { cls: string; label: string }> = {
    pending: { cls: "bg-[#FFF3CD] text-[#856404]", label: "Pending" },
    accepted: { cls: "bg-[#E7FBF7] text-[#0ac79e]", label: "Accepted" },
    revoked: { cls: "bg-[#fff0f0] text-[#c80000]", label: "Revoked" },
    expired: { cls: "bg-[#f0f0f0] text-[#646B72]", label: "Expired" },
  };
  const info = map[status] || { cls: "bg-[#f0f0f0] text-[#646B72]", label: status };
  return (
    <span
      className={
        "inline-flex items-center gap-1 px-2 py-[3px] rounded text-[11px] font-medium " +
        info.cls
      }
    >
      <i className="ti ti-point-filled" />
      {info.label}
    </span>
  );
}

type Props = {
  refreshKey: number;
};

export default function PendingInvitesTable({ refreshKey }: Props) {
  const [invitations, setInvitations] = useState<TenantInvitation[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    const token = getAccessToken();
    if (!token) return;
    setLoading(true);
    const result = await listTenantInvitations(token);
    if (result.ok && result.body.success && result.body.data) {
      setInvitations(result.body.data.items || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  async function handleResend(inv: TenantInvitation) {
    const token = getAccessToken();
    if (!token) return;
    await resendTenantInvitation(token, inv.id);
    load();
  }

  async function handleRevoke(inv: TenantInvitation) {
    if (!confirm(`Revoke invitation for ${inv.company_name}?`)) return;
    const token = getAccessToken();
    if (!token) return;
    await revokeTenantInvitation(token, inv.id);
    load();
  }

  const columns = [
    {
      title: "Company",
      dataIndex: "company_name",
      sorter: (a: TenantInvitation, b: TenantInvitation) =>
        a.company_name.localeCompare(b.company_name),
    },
    {
      title: "Owner Email",
      dataIndex: "email",
    },
    {
      title: "Subdomain",
      dataIndex: "subdomain",
      render: (text: string) => (
        <span className="text-[13px] text-[#646B72]">{text}</span>
      ),
    },
    {
      title: "Plan",
      dataIndex: "plan",
      render: (text: string) => (
        <span className="inline-flex items-center px-2 py-[3px] rounded text-[11px] font-medium bg-[#F2EDFE] text-[#6938EF] capitalize">
          {text}
        </span>
      ),
    },
    {
      title: "Sent",
      dataIndex: "created_at",
      render: (text: string) => (
        <span className="text-[13px] text-[#646B72]">{formatDate(text)}</span>
      ),
    },
    {
      title: "Expires",
      dataIndex: "expires_at",
      render: (text: string) => (
        <span className="text-[13px] text-[#646B72]">{formatDate(text)}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) => statusBadge(text),
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_: unknown, record: TenantInvitation) => {
        if (record.status !== "pending") return null;
        return (
          <div className="inline-flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleResend(record)}
              className="px-2 py-1 rounded text-[12px] font-medium text-[#0ac79e] border border-[#0ac79e] hover:bg-[#E7FBF7] transition-colors"
            >
              Resend
            </button>
            <button
              type="button"
              onClick={() => handleRevoke(record)}
              className="px-2 py-1 rounded text-[12px] font-medium text-[#dc3545] border border-[#dc3545] hover:bg-[#fff0f0] transition-colors"
            >
              Revoke
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <div className="flex items-center justify-between flex-wrap gap-3 p-4 border-b border-[#f1f1f1]">
        <h5 className="m-0 text-[16px] font-semibold text-[#212B36]">
          Pending Invitations
        </h5>
        {loading && (
          <span className="text-[12px] text-[#94A3B8]">Loading...</span>
        )}
      </div>
      <div className="overflow-x-auto">
        <Table columns={columns} dataSource={invitations} searchText="" />
      </div>
    </div>
  );
}
