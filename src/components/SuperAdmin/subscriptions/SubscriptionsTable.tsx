"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import PredefinedDateRanges from "@/core/common/daterangepicker/datePicker";
import Link from "next/link";
import Table from "@/core/common/pagination/datatable";
import { fetchPlatformInvoices, type SubscriptionInvoice } from "@/lib/billing";
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

function gatewayLabel(slug: string): string {
  if (!slug) return "---";
  const map: Record<string, string> = {
    stripe: "Credit Card",
    paypal: "PayPal",
    sslcommerz: "SSLCommerz",
    manual: "Manual",
  };
  return map[slug] || slug;
}

type InvoiceRow = {
  id: string;
  CompanyName: string;
  Plan: string;
  BillCycle: string;
  PaymentMethod: string;
  Amount: string;
  CreatedDate: string;
  ExpiringDate: string;
  Image: string;
  Status: string;
};

function mapInvoice(inv: SubscriptionInvoice): InvoiceRow {
  return {
    id: inv.id,
    CompanyName: inv.tenant_name || inv.tenant_schema || "---",
    Plan: inv.package_slug || "---",
    BillCycle: String(inv.billing_cycle || 0),
    PaymentMethod: gatewayLabel(inv.gateway_slug),
    Amount: inv.currency ? inv.currency + " " + inv.amount : "$" + inv.amount,
    CreatedDate: formatDate(inv.created_at),
    ExpiringDate: formatDate(inv.period_end),
    Image: "company-01.svg",
    Status: inv.status === "success" ? "Paid" : inv.status === "failed" ? "Unpaid" : inv.status === "pending" ? "Pending" : inv.status,
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
    title: "Plan",
    dataIndex: "Plan",
    sorter: function(a: any, b: any) { return a.Plan.length - b.Plan.length; },
  },
  {
    title: "Billing Cycle",
    dataIndex: "BillCycle",
    render: function(text: any) { return <span>{text} Days</span>; },
    sorter: function(a: any, b: any) { return a.BillCycle.length - b.BillCycle.length; },
  },
  {
    title: "Payment Method",
    dataIndex: "PaymentMethod",
    sorter: function(a: any, b: any) { return a.PaymentMethod.length - b.PaymentMethod.length; },
  },
  {
    title: "Amount",
    dataIndex: "Amount",
    render: function(text: any) { return <span className="font-semibold text-[#212B36]">{text}</span>; },
    sorter: function(a: any, b: any) { return a.Amount.length - b.Amount.length; },
  },
  {
    title: "Created Date",
    dataIndex: "CreatedDate",
    sorter: function(a: any, b: any) { return a.CreatedDate.length - b.CreatedDate.length; },
  },
  {
    title: "Expired On",
    dataIndex: "ExpiringDate",
    sorter: function(a: any, b: any) { return a.ExpiringDate.length - b.ExpiringDate.length; },
  },
  {
    title: "Status",
    dataIndex: "Status",
    render: function(text: any) {
      return (
        <span
          className={"inline-flex items-center gap-1 px-2 py-[3px] rounded text-[11px] font-medium " +
            (text === "Paid"
              ? "bg-[#E7FBF7] text-[#0ac79e]"
              : text === "Pending"
                ? "bg-[#FFF8E7] text-[#d4a017]"
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
            data-bs-target="#view_invoice"
            className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#0ac79e] hover:border-[#0ac79e] transition-colors"
          >
            <i className="ti ti-file-invoice" />
          </Link>
          <Link
            href="#"
            className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#0ac79e] hover:border-[#0ac79e] transition-colors"
          >
            <i className="ti ti-download" />
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
  { label: "Select Plan", items: ["Advanced (Monthly)", "Basic (Yearly)", "Enterprise (Monthly)"] },
  { label: "Select Status", items: ["Paid", "Unpaid"] },
  {
    label: "Sort By : Last 7 Days",
    items: ["Recently Added", "Ascending", "Descending", "Last Month", "Last 7 Days"],
  },
];

export default function SubscriptionsTable({ searchText }: { searchText: string }) {
  const [rows, setRows] = useState<InvoiceRow[]>(function() {
    const cached = cacheGet<InvoiceRow[]>(CACHE_KEYS.INVOICES_TABLE);
    return cached ?? [];
  });

  useEffect(function() {
    const token = getAccessToken();
    if (!token) return;

    fetchPlatformInvoices(token).then(function(result) {
      if (result.ok && result.body.success && result.body.data && result.body.data.items) {
        const fresh = result.body.data.items.map(mapInvoice);
        cacheSet(CACHE_KEYS.INVOICES_TABLE, fresh);
        setRows(fresh);
      }
    });
  }, []);

  const data = rows;

  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <div className="flex items-center justify-between flex-wrap gap-3 p-4 border-b border-[#f1f1f1]">
        <h5 className="m-0 text-[16px] font-semibold text-[#212B36]">
          Subscription List
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
