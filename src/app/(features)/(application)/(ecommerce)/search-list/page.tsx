"use client";

import { useState } from "react";
import CommonFooter from "@/core/common/footer/commonFooter";
import PageHeader from "@/components/SearchList/PageHeader";
import SearchForm from "@/components/SearchList/SearchForm";
import SearchResultsCard from "@/components/SearchList/SearchResultsCard";

export default function SearchList() {
  const [open1, setOpen1] = useState(false);

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <SearchForm />
          <SearchResultsCard open1={open1} setOpen1={setOpen1} />
        </div>
        <CommonFooter />
      </div>
    </div>
  );
}
