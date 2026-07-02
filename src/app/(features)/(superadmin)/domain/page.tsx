"use client";

import { useState } from "react";
import CommonFooter from "@/core/common/footer/commonFooter";
import DeleteDomainModal from "@/components/SuperAdmin/domain/DeleteDomainModal";
import DomainApprovedModal from "@/components/SuperAdmin/domain/DomainApprovedModal";
import DomainPendingModal from "@/components/SuperAdmin/domain/DomainPendingModal";
import DomainRejectedModal from "@/components/SuperAdmin/domain/DomainRejectedModal";
import DomainStatsCards from "@/components/SuperAdmin/domain/DomainStatsCards";
import DomainTable from "@/components/SuperAdmin/domain/DomainTable";
import PageHeader from "@/components/SuperAdmin/domain/PageHeader";

export default function Domain() {
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader searchText={searchText} onSearchChange={setSearchText} />
          <DomainStatsCards />
          <DomainTable searchText={searchText} />
        </div>
        <CommonFooter />
      </div>
      <DomainApprovedModal />
      <DomainPendingModal />
      <DomainRejectedModal />
      <DeleteDomainModal />
    </>
  );
}
