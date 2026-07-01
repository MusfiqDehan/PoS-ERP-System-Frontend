"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import PredefinedDateRanges from "@/core/common/daterangepicker/datePicker";
import Link from "next/link";
import Table from "@/core/common/pagination/datatable";
import { fetchPlatformTenants, type PlatformTenant } from "@/lib/platform";
import { getAccessToken } from "@/lib/auth-session";
import { cacheGet, cacheSet, CACHE_KEYS } from "@/lib/api-cache";

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

type TenantRow = {
  id: string;
  CompanyName: string;
  Email: string;
  AccountURL: string;
  Plan: string;
  CreatedDate: string;
  Image: string;
  Status: string;
};

function mapTenant(t: PlatformTenant): TenantRow {
  return {
    id: t.id,
    CompanyName: t.name,
    Email: t.owner_email || t.billing_email || "---",
    AccountURL: t.domains && t.domains.length > 0 ? t.domains[0] : "---",
    Plan: t.plan || "---",
    CreatedDate: formatDate(t.created_at),
    Image: "company-01.svg",
    Status: t.is_enabled ? "Active" : "Inactive",
  };
}

const columns = [
  {
    title: "Company Name",
    dataIndex: "CompanyName",
    render: function(text: any, record: any) {
      return (
        <div className="flex items-center gap-2">
          <Link
            href="#"
            className="w-10 h-10 rounded-full border border-[#f1f1f1] overflow-hidden flex items-center justify-center shrink-0"
          >
            <img
              src={"assets/img/company/" + record.Image}
              className="w-full h-full object-cover"
              alt="img"
            />
          </Link>
          <h6 className="m-0 text-[15px] font-medium">
            <Link href="#" className="text-[#212B36] hover:text-[#0ac79e]">
              {text}
            </Link>
          </h6>
        </div>
      );
    },
    sorter: function(a: any, b: any) { return a.CompanyName.length - b.CompanyName.length; },
  },
  {
    title: "Email",
    dataIndex: "Email",
    sorter: function(a: any, b: any) { return a.Email.length - b.Email.length; },
  },
  {
    title: "Account URL",
    dataIndex: "AccountURL",
    sorter: function(a: any, b: any) { return a.AccountURL.length - b.AccountURL.length; },
  },
  {
    title: "Plan",
    dataIndex: "Plan",
    render: function(text: any) {
      return (
        <div className="flex items-center justify-between gap-2">
          <p className="m-0">{text}</p>
          <Link
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#upgrade_info"
            className="inline-flex items-center px-2 py-[3px] rounded text-[11px] font-medium bg-[#F2EDFE] text-[#6938EF] hover:bg-[#6938EF] hover:text-white transition-colors"
          >
            Upgrade
          </Link>
        </div>
      );
    },
    sorter: function(a: any, b: any) { return a.Plan.length - b.Plan.length; },
  },
  {
    title: "Created Date",
    dataIndex: "CreatedDate",
    sorter: function(a: any, b: any) { return a.CreatedDate.length - b.CreatedDate.length; },
  },
  {
    title: "Status",
    dataIndex: "Status",
    render: function(text: any) {
      return (
        <span
          className={"inline-flex items-center gap-1 px-2 py-[3px] rounded text-[11px] font-medium " +
            (text === "Active"
              ? "bg-[#E7FBF7] text-[#0ac79e]"
              : "bg-[#fff0f0] text-[#c80000]")}
        >
          <i className="ti ti-point-filled" />
          {text}
        </span>
      );
    },
    sorter: function(a: any, b: any) { return a.Status.length - b.Status.length; },
  },
  {
    title: "",
    dataIndex: "actions",
    render: function() {
      return (
        <div className="inline-flex items-center gap-2">
          {[
            { icon: "ti ti-eye", target: "#company_detail" },
            { icon: "ti ti-edit", target: "#edit_company" },
            { icon: "ti ti-trash", target: "#delete_modal" },
          ].map(function(action) {
            return (
              <Link
                key={action.target}
                href="#"
                data-bs-toggle="modal"
                data-bs-target={action.target}
                className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#0ac79e] hover:border-[#0ac79e] transition-colors"
              >
                <i className={action.icon} />
              </Link>
            );
          })}
        </div>
      );
    },
  },
];

const filterDropdowns = [
  { label: "Select Plan", items: ["Advanced", "Basic", "Enterprise"] },
  { label: "Select Status", items: ["Active", "Inactive"] },
  {
    label: "Sort By : Last 7 Days",
    items: ["Recently Added", "Ascending", "Descending", "Last Month", "Last 7 Days"],
  },
];

export default function CompaniesTable({ searchText }: { searchText: string }) {
  const [rows, setRows] = useState<TenantRow[]>(function() {
    // Hydrate from cache on first render — no flash
    const cached = cacheGet<TenantRow[]>(CACHE_KEYS.COMPANIES);
    return cached ?? [];
  });

  // Fetch fresh data in background, then update cache
  useEffect(function() {
    const token = getAccessToken();
    if (!token) return;

    fetchPlatformTenants(token).then(function(result) {
      if (result.ok && result.body.success && result.body.data && Array.isArray(result.body.data)) {
        const fresh = result.body.data.map(mapTenant);
        cacheSet(CACHE_KEYS.COMPANIES, fresh);
        setRows(fresh);
      }
    });
  }, []);

  const data = rows;

  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <div className="flex items-center justify-between flex-wrap gap-3 p-4 border-b border-[#f1f1f1]">
        <h5 className="m-0 text-[16px] font-semibold text-[#212B36]">
          Companies List
        </h5>
        <div className="flex items-center flex-wrap gap-2">
          <div className="relative">
            <PredefinedDateRanges />
          </div>
          {filterDropdowns.map(function(dd) {
            return (
              <div key={dd.label} className="dropdown">
                <button
                  type="button"
                  data-bs-toggle="dropdown"
                  className="inline-flex items-center gap-2 px-3 py-2 border border-[#e7e7e7] rounded text-[14px] text-[#646B72] bg-white hover:border-[#0ac79e]"
                >
                  {dd.label}
                  <i className="ti ti-chevron-down text-[14px]" />
                </button>
                <ul className="dropdown-menu dropdown-menu-end p-2">
                  {dd.items.map(function(item) {
                    return (
                      <li key={item}>
                        <Link href="#" className="dropdown-item rounded-1">
                          {item}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table columns={columns} dataSource={data} searchText={searchText} />
      </div>
    </div>
  );
}
