"use client";

import PredefinedDateRanges from "@/core/common/daterangepicker/datePicker";
import { Calendar } from "react-feather";

export default function IncomeFilters() {
  return (
    <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
      <div className="search-set"></div>
      <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
        <div className="dropdown me-2">
          <div className="input-groupicon calender-input balance-sheet-date">
            <Calendar />
            <PredefinedDateRanges />
          </div>
        </div>
        <div className="dropdown">
          <a
            href="javascript:void(0);"
            className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
            data-bs-toggle="dropdown"
          >
            Select Store
          </a>
          <ul className="dropdown-menu  dropdown-menu-end p-3">
            <li>
              <a href="javascript:void(0);" className="dropdown-item rounded-1">
                Distribution center
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" className="dropdown-item rounded-1">
                Intelligent warehouse
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" className="dropdown-item rounded-1">
                Mahin Logistics
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" className="dropdown-item rounded-1">
                Allcargo Logistics
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
