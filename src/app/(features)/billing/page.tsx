"use client";

import { useCallback, useState } from "react";
import CommonFooter from "@/core/common/footer/commonFooter";
import SubscriptionSummaryCard from "@/components/tenant-billing/SubscriptionSummaryCard";
import InvoiceHistoryTable from "@/components/tenant-billing/InvoiceHistoryTable";
import ChangePlanModal from "@/components/tenant-billing/ChangePlanModal";
import TenantPaymentGatewayCard from "@/components/tenant-billing/TenantPaymentGatewayCard";

const KNOWN_GATEWAYS = [
  { slug: "paypal", name: "PayPal", icon: "ti ti-brand-paypal", description: "Accept payments globally" },
  { slug: "stripe", name: "Stripe", icon: "ti ti-brand-stripe", description: "Developer-friendly payments" },
  { slug: "sslcommerz", name: "SSLCommerz", icon: "ti ti-building-bank", description: "Bangladesh gateway" },
];

export default function TenantBillingPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  const triggerRefresh = useCallback(function () {
    setRefreshKey(function (k) { return k + 1; });
  }, []);

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header settings-pg-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Billing & Subscription</h4>
                <h6>Manage your plan, track invoices, and configure payment gateways</h6>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#change_plan_modal"
                className="btn btn-secondary"
              >
                <i className="ti ti-exchange me-1" />
                Upgrade Plan
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-[#f6f6f6] rounded-md p-1 mb-4 w-fit">
            {[
              { key: "overview", icon: "ti ti-layout-dashboard", label: "Overview" },
              { key: "invoices", icon: "ti ti-file-invoice", label: "Invoices" },
              { key: "gateways", icon: "ti ti-building-bank", label: "Gateways" },
            ].map(function (tab) {
              return (
                <button
                  key={tab.key}
                  onClick={function () { setActiveTab(tab.key); }}
                  className={
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[13px] font-medium transition-colors " +
                    (activeTab === tab.key
                      ? "bg-white text-[#212B36] shadow-sm"
                      : "text-[#646B72] hover:text-[#212B36]")
                  }
                >
                  <i className={`${tab.icon} text-sm`} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {activeTab === "overview" ? (
            <SubscriptionSummaryCard refreshKey={refreshKey} />
          ) : null}

          {activeTab === "invoices" ? (
            <InvoiceHistoryTable refreshKey={refreshKey} />
          ) : null}

          {activeTab === "gateways" ? (
            <div>
              <div className="mb-3">
                <h5 className="text-[15px] font-semibold text-[#212B36] mb-1">Payment Gateways</h5>
                <p className="text-[13px] text-[#646B72]">Configure credentials for accepting payments</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {KNOWN_GATEWAYS.map(function (gw) {
                  return (
                    <TenantPaymentGatewayCard
                      key={gw.slug}
                      gatewaySlug={gw.slug}
                      gatewayName={gw.name}
                      gatewayIcon={gw.icon}
                      gatewayDescription={gw.description}
                      refreshKey={refreshKey}
                    />
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
        <CommonFooter />
      </div>

      <ChangePlanModal onChanged={triggerRefresh} />
    </>
  );
}
