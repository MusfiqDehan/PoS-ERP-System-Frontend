"use client";

import { useState } from "react";
import CommonFooter from "@/core/common/footer/commonFooter";
import DeleteSubscriptionModal from "@/components/SuperAdmin/subscriptions/DeleteSubscriptionModal";
import PageHeader from "@/components/SuperAdmin/subscriptions/PageHeader";
import StatsCards from "@/components/SuperAdmin/subscriptions/StatsCards";
import SubscriptionsTable from "@/components/SuperAdmin/subscriptions/SubscriptionsTable";
import ViewInvoiceModal from "@/components/SuperAdmin/subscriptions/ViewInvoiceModal";

export default function Subscription() {
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader searchText={searchText} onSearchChange={setSearchText} />
          <StatsCards />
          <SubscriptionsTable searchText={searchText} />
        </div>
        <CommonFooter />
      </div>
      <ViewInvoiceModal />
      <DeleteSubscriptionModal />
    </>
  );
}
