"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Calendar } from "react-feather";
import SalesAnalysisChart from "@/components/charts/salesanalysis";

export default function SalesAnalytics() {
  return (
<div className="col-md-12 col-lg-7 col-sm-12 col-12 d-flex">
            <div className="card flex-fill flex-fill">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Sales Analytics</h5>
                <div className="graph-sets">
                  <div className="dropdown dropdown-wraper">
                    <button
                      className="btn btn-white btn-sm dropdown-toggle d-flex align-items-center"
                      type="button"
                      id="dropdown-sales"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <Calendar className="feather-14" />
                      2023
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdown-sales"
                    >
                      <li>
                        <Link href="#" className="dropdown-item">
                          2023
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="dropdown-item">
                          2022
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="dropdown-item">
                          2021
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-body pt-1 pb-0">
                <SalesAnalysisChart />
              </div>
            </div>
          </div>
  );
}
