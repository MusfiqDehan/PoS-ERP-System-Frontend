"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import Link from "next/link";
import { purchase_transaction } from "@/core/json/purchaseTransactionDetails";
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

function statusLabel(status: string): string {
  const map: Record<string, string> = {
    success: "Paid",
    failed: "Unpaid",
    pending: "Pending",
  };
  return map[status] || status;
}

type TxnRow = {
  id: string;
  InvoiceID: string;
  CompanyName: string;
  Email: string;
  CreatedDate: string;
  Amount: string;
  PaymentMethod: string;
  Status: string;
  Image: string;
};

function mapInvoice(inv: SubscriptionInvoice): TxnRow {
  return {
    id: inv.id,
    InvoiceID: inv.tran_id || inv.id.slice(0, 8),
    CompanyName: inv.tenant_name || inv.tenant_schema || "---",
    Email: inv.customer_email || "---",
    CreatedDate: formatDate(inv.created_at),
    Amount: inv.currency ? inv.currency + " " + inv.amount : "$" + inv.amount,
    PaymentMethod: gatewayLabel(inv.gateway_slug),
    Status: statusLabel(inv.status),
    Image: "company-01.svg",
  };
}

const columns = [
  {
    title: "Invoice ID",
    dataIndex: "InvoiceID",
    render: function(text: any) {
      return (
        <Link href="#" className="text-[#646B72] hover:text-[#0ac79e]">
          {text}
        </Link>
      );
    },
    sorter: function(a: any, b: any) { return a.InvoiceID.length - b.InvoiceID.length; },
  },
  {
    title: "Customer",
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
    title: "Created Date",
    dataIndex: "CreatedDate",
    sorter: function(a: any, b: any) { return a.CreatedDate.length - b.CreatedDate.length; },
  },
  {
    title: "Amount",
    dataIndex: "Amount",
    render: function(text: any) { return <span className="font-semibold text-[#212B36]">{text}</span>; },
    sorter: function(a: any, b: any) { return a.Amount.length - b.Amount.length; },
  },
  {
    title: "Payment Method",
    dataIndex: "PaymentMethod",
    sorter: function(a: any, b: any) { return a.PaymentMethod.length - b.PaymentMethod.length; },
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
    dataIndex: "action",
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
  { label: "Payment Method", items: ["Credit Card", "Paypal", "Debit Card"] },
  { label: "Select Status", items: ["Paid", "Unpaid"] },
  {
    label: "Sort By : Last 7 Days",
    items: ["Recently Added", "Ascending", "Descending", "Last Month", "Last 7 Days"],
  },
];

export default function InvoicesTable({ searchText }: { searchText: string }) {
  const [rows, setRows] = useState<TxnRow[]>(function() {
    const cached = cacheGet<TxnRow[]>(CACHE_KEYS.INVOICES_TABLE_TABLE);
    return cached ?? purchase_transaction;
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
          Invoice List
        </h5>
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
