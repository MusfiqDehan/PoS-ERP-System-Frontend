"use client";

import { recentChoose } from "@/core/common/selectOption/selectOption";
import { DatePicker } from "antd";
import Link from "next/link";
import Select from "react-select";

export default function NotesToolbar() {
  return (
            <div className="bg-white rounded-3 d-flex align-items-center justify-content-between flex-wrap mb-4 p-3 pb-0">
              <div className="form-sort me-2 mb-3">
                <i data-feather="sliders" className="info-img" />
                <Select
                  classNamePrefix="react-select"
                  options={recentChoose}
                  placeholder="Choose"
                />
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="input-icon-start me-2 position-relative">
                  <span className="icon-addon">
                    <i className="ti ti-calendar" />
                  </span>
                  <DatePicker
                    className="form-control datetimepicker"
                    placeholder="dd/mm/yyyy"
                  />
                </div>
                <div className="search-set">
                  <div className="search-input">
                    <Link href="#" className="btn btn-searchset">
                      <i data-feather="search" className="feather-search" />
                    </Link>
                    <div className="dataTables_filter">
                      <label>
                        {" "}
                        <input
                          type="search"
                          className="form-control form-control-sm"
                          placeholder="Search"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  );
}
