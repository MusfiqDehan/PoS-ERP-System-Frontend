"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Table from "@/core/common/pagination/datatable";
import { fetchPlatformPackages, type Package } from "@/lib/billing";
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

function planTypeFromPkg(pkg: Package): string {
  const hasMonthly = pkg.price_monthly && parseFloat(pkg.price_monthly) > 0;
  const hasYearly = pkg.price_yearly && parseFloat(pkg.price_yearly) > 0;
  if (hasMonthly && hasYearly) return "Monthly & Yearly";
  if (hasYearly) return "Yearly";
  return "Monthly";
}

type PackRow = {
  id: string;
  Plan_Name: string;
  Plan_Type: string;
  Total_Subscribers: string;
  Price: string;
  Created_Date: string;
  Status: string;
};

function mapPkg(pkg: Package): PackRow {
  const price = pkg.price_monthly && parseFloat(pkg.price_monthly) > 0
    ? "$" + pkg.price_monthly
    : pkg.price_yearly && parseFloat(pkg.price_yearly) > 0
      ? "$" + pkg.price_yearly
      : "---";
  return {
    id: pkg.id,
    Plan_Name: pkg.name,
    Plan_Type: planTypeFromPkg(pkg),
    Total_Subscribers: "---",
    Price: price,
    Created_Date: formatDate(pkg.created_at),
    Status: pkg.is_active ? "Active" : "Inactive",
  };
}

const columns = [
  {
    title: "Plan Name",
    dataIndex: "Plan_Name",
    render: function(text: any) {
      return (
        <h6 className="m-0 text-[15px] font-medium">
          <Link href="#" className="text-[#212B36] hover:text-[#0ac79e]">
            {text}
          </Link>
        </h6>
      );
    },
    sorter: function(a: any, b: any) { return a.Plan_Name.length - b.Plan_Name.length; },
  },
  {
    title: "Plan Type",
    dataIndex: "Plan_Type",
    sorter: function(a: any, b: any) { return a.Plan_Type.length - b.Plan_Type.length; },
  },
  {
    title: "Total Subscribers",
    dataIndex: "Total_Subscribers",
    sorter: function(a: any, b: any) { return a.Total_Subscribers.length - b.Total_Subscribers.length; },
  },
  {
    title: "Price",
    dataIndex: "Price",
    render: function(text: any) { return <span className="font-semibold text-[#212B36]">{text}</span>; },
    sorter: function(a: any, b: any) { return a.Price.length - b.Price.length; },
  },
  {
    title: "Created Date",
    dataIndex: "Created_Date",
    sorter: function(a: any, b: any) { return a.Created_Date.length - b.Created_Date.length; },
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
          <Link
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#edit_plans"
            className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#0ac79e] hover:border-[#0ac79e] transition-colors"
          >
            <i className="ti ti-edit" />
          </Link>
          <Link
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#delete_modal"
            className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#c80000] hover:border-[#c80000] transition-colors"
          >
            <i className="ti ti-trash" />
          </Link>
        </div>
      );
    },
  },
];

const filterDropdowns = [
  { label: "Select Status", items: ["Active", "Inactive"] },
  {
    label: "Sort By : Last 7 Days",
    items: ["Recently Added", "Ascending", "Descending", "Last Month", "Last 7 Days"],
  },
];

export default function PackagesTable({ searchText }: { searchText: string }) {
  const [rows, setRows] = useState<PackRow[]>(function() {
    const cached = cacheGet<PackRow[]>(CACHE_KEYS.PACKAGES);
    return cached ?? [];
  });

  useEffect(function() {
    const token = getAccessToken();
    if (!token) return;

    fetchPlatformPackages(token).then(function(result) {
      if (result.ok && result.body.success && result.body.data && Array.isArray(result.body.data)) {
        const fresh = result.body.data.map(mapPkg);
        cacheSet(CACHE_KEYS.PACKAGES, fresh);
        setRows(fresh);
      }
    });
  }, []);

  const data = rows;

  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <div className="flex items-center justify-between flex-wrap gap-3 p-4 border-b border-[#f1f1f1]">
        <h5 className="m-0 text-[16px] font-semibold text-[#212B36]">Plan List</h5>
        <div className="flex items-center flex-wrap gap-2">
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
        <Table dataSource={data} columns={columns} searchText={searchText} />
      </div>
    </div>
  );
}
