"use client";

import { DatePicker } from "antd";
import { Calendar } from "react-feather";
import Link from "next/link";

export default function TrialBalanceFilters() {
  return (
    <div className="card-header border-0 bg-white rounded-1 p-4 px-3 mb-4">
      <div className="row row-gap-2 align-items-end">
        <div className="col-sm-4">
          <div className="dropdown me-2">
            <label className="form-label">Choose Your Date</label>
            <div className="input-groupicon trail-balance">
              <Calendar className="info-img" />
              <DatePicker
                className="form-control datetimepicker"
                placeholder="dd/mm/yyyy"
              />
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="dropdown">
            <label className="form-label">Store</label>
            <Link
              href="#"
              className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center w-100"
              data-bs-toggle="dropdown"
            >
              Select
            </Link>
            <ul className="dropdown-menu  dropdown-menu-end p-3">
              <li>
                <Link href="#" className="dropdown-item rounded-1">
                  Zephyr Indira
                </Link>
              </li>
              <li>
                <Link href="#" className="dropdown-item rounded-1">
                  Quillon Elysia
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm-3 col-md-2">
          <button className="btn btn-primary shadow-none w-100">Submit</button>
        </div>
      </div>
    </div>
  );
}
