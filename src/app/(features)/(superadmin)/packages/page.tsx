"use client";

import { useState } from "react";
import CommonFooter from "@/core/common/footer/commonFooter";
import AddPlanModal from "@/components/SuperAdmin/packages/AddPlanModal";
import DeletePackageModal from "@/components/SuperAdmin/packages/DeletePackageModal";
import EditPlanModal from "@/components/SuperAdmin/packages/EditPlanModal";
import PackagesTable from "@/components/SuperAdmin/packages/PackagesTable";
import PageHeader from "@/components/SuperAdmin/packages/PageHeader";
import StatsCards from "@/components/SuperAdmin/packages/StatsCards";

export default function Package() {
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader searchText={searchText} onSearchChange={setSearchText} />
          <StatsCards />
          <PackagesTable searchText={searchText} />
        </div>
        <CommonFooter />
      </div>
      <AddPlanModal />
      <EditPlanModal />
      <DeletePackageModal />
    </>
  );
}
