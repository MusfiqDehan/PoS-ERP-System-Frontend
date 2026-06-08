"use client";

import CollapesIcon from "@/core/common/tooltip-content/collapes";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import Link from "next/link";

export default function PageHeader() {
  return (
        <div className="page-header page-add-notes border-0 flex-sm-row flex-column">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Notes</h4>
              <h6 className="mb-0">Manage your notes</h6>
            </div>
          </div>
          <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-start">
            <ul className="table-top-head me-2">
              <RefreshIcon />
              <CollapesIcon />
            </ul>
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
                      className="form-control form-control-sm py-0"
                      placeholder="Search"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="page-btn">
              <Link
                href="#"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#note-units"
              >
              <i className='ti ti-circle-plus me-1'></i> Add Note
              </Link>
            </div>
          </div>
        </div>
  );
}
