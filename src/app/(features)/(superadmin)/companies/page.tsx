"use client";

import { useState } from "react";
import CommonFooter from "@/core/common/footer/commonFooter";
import AddCompanyModal from "@/components/SuperAdmin/companies/AddCompanyModal";
import CompaniesTable from "@/components/SuperAdmin/companies/CompaniesTable";
import CompanyDetailModal from "@/components/SuperAdmin/companies/CompanyDetailModal";
import DeleteCompanyModal from "@/components/SuperAdmin/companies/DeleteCompanyModal";
import EditCompanyModal from "@/components/SuperAdmin/companies/EditCompanyModal";
import PageHeader from "@/components/SuperAdmin/companies/PageHeader";
import StatsCards from "@/components/SuperAdmin/companies/StatsCards";
import UpgradeInfoModal from "@/components/SuperAdmin/companies/UpgradeInfoModal";

export default function Companies() {
  const [searchText, setSearchText] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (
    field: "password" | "confirmPassword",
  ) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const getModalContainer = () => {
    const modalElement = document.getElementById("modal-datepicker");
    return modalElement ? modalElement : document.body;
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader searchText={searchText} onSearchChange={setSearchText} />
          <StatsCards />
          <CompaniesTable searchText={searchText} />
        </div>
        <CommonFooter />
      </div>
      <AddCompanyModal
        passwordVisibility={passwordVisibility}
        togglePasswordVisibility={togglePasswordVisibility}
      />
      <EditCompanyModal
        passwordVisibility={passwordVisibility}
        togglePasswordVisibility={togglePasswordVisibility}
      />
      <UpgradeInfoModal getModalContainer={getModalContainer} />
      <CompanyDetailModal />
      <DeleteCompanyModal />
    </>
  );
}
