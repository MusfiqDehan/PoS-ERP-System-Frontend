"use client";

import Select from "react-select";
import { file } from "@/core/common/selectOption/selectOption";

export default function PageHeader() {
  return (
          <div className="page-header page-add-notes border-0 flex-sm-row flex-column">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>File Manager</h4>
                <h6 className="mb-0">Manage your files</h6>
              </div>
            </div>
            <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-start">
              <ul className="table-top-head me-2">
                <li>
                  <a
                    href="notes.html"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Refresh"
                  >
                    <i className="ti ti-refresh" />
                  </a>
                </li>
                <li>
                  <a
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Collapse"
                    id="collapse-header"
                  >
                    <i className="ti ti-chevron-up" />
                  </a>
                </li>
              </ul>
              <div className="search-set me-2">
                <div className="search-input">
                  <span className="btn-searchset ms-2">
                    <i className="ti ti-search fs-14 feather-search" />
                  </span>
                  <div
                    id="DataTables_Table_0_filter"
                    className="dataTables_filter"
                  >
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
              <div className="form-sort me-2">
                <Select
                  classNamePrefix="react-select"
                  options={file}
                  placeholder="Choose"
                />
              </div>
              <div className="page-btn ms-0">
                <a
                  href="#"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#add_folder"
                >
                  <i className="ti ti-circle-plus me-1" />
                  Create Folder
                </a>
              </div>
            </div>
          </div>
  );
}
