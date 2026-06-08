"use client";

import CollapesIcon from "@/core/common/tooltip-content/collapes";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import { Sliders } from "react-feather";
import Select from "react-select";
import { sortSelectOptions } from "./sortSelectOptions";

export default function PageHeader() {
  return (
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Projects</h4>
              <h6>Manage your projects</h6>
            </div>
          </div>
          <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-start">
            <div className="form-sort me-2 mb-sm-0 mb-3">
              <Sliders className="info-img" />
              <Select
                className="img-select"
                classNamePrefix="react-select"
                options={sortSelectOptions}
                placeholder="Sort by Date"
              />
            </div>
            <ul className="table-top-head">
              <RefreshIcon />
              <CollapesIcon />
            </ul>
          </div>
        </div>
  );
}
