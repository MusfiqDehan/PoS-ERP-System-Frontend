"use client";

import { DatePicker } from "antd";
import CollapesIcon from "@/core/common/tooltip-content/collapes";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import TooltipIcons from "@/core/common/tooltip-content/tooltipIcons";
import Link from "next/link";

export default function PageHeader() {
  return (
            <div className="page-header">
              <div className="add-item d-flex">
                <div className="page-title">
                  <h4>Calendar</h4>
                  <h6>Manage Your calendar</h6>
                </div>
              </div>
              <ul className="table-top-head">
               
                <li className="me-2">
                  <div className="input-icon-end position-relative calender-datepicker">
                    <DatePicker
                      className="form-control"
                      placeholder="dd/mm/yyyy"
                    />
                    <span className="input-icon-addon">
                      <i className="ti ti-chevron-down ms-1" />
                    </span>
                  </div>
                </li>
                <TooltipIcons />
                <RefreshIcon />
                <CollapesIcon />
              </ul>
              <div className="page-btn">
                <Link
                  href="#"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#add_event"
                >
                  <i className='ti ti-circle-plus me-1'></i>
                  Create
                </Link>
              </div>
            </div>
  );
}
