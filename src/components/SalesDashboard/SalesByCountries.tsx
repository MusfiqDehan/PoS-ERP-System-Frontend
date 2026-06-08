"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ChevronUp } from "react-feather";

export default function SalesByCountries() {
  return (
<div className="col-md-12 col-lg-5 col-sm-12 col-12 d-flex">
            <div className="card flex-fill">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Sales by Countries</h5>
                <div className="graph-sets">
                  <div className="dropdown dropdown-wraper">
                    <button
                      className="btn btn-white btn-sm dropdown-toggle d-flex align-items-center"
                      type="button"
                      id="dropdown-country-sales"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      This Week
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdown-country-sales"
                    >
                      <li>
                        <Link href="#" className="dropdown-item">
                          This Month
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="dropdown-item">
                          This Year
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div id="sales_db_world_map" style={{ height: "265px" }}>
                  <iframe
                    src="https://www.google.com/maps/embed"
                    style={{ border: "0", height: "265px", width: "364px" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="contact-map w-100"
                  />  
                </div>
                <p className="sales-range">
                  <span className="text-success">
                    <ChevronUp className="feather-16" />
                    48%&nbsp;
                  </span>
                  increase compare to last week
                </p>
              </div>
            </div>
            </div>
  );
}
