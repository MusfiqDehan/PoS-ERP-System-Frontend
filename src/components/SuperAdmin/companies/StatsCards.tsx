"use client";
/* eslint-disable @next/next/no-img-element */

import TotalChart from "@/components/charts/superAdmincharts/totalChart";
import ActiveCompanyChart from "@/components/charts/superAdmincharts/activeCompanyChart";
import InactiveCompanyChart from "@/components/charts/superAdmincharts/inactiveCompanyChart";
import LocationChart from "@/components/charts/superAdmincharts/locationChart";

export default function StatsCards() {
  return (
            <div className="row">
              {/* Total Companies */}
              <div className="col-lg-3 col-md-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center overflow-hidden">
                      <span className="avatar avatar-lg bg-primary flex-shrink-0">
                        <i className="ti ti-building fs-16" />
                      </span>
                      <div className="ms-2 overflow-hidden">
                        <p className="fs-12 fw-medium mb-1 text-truncate">
                          Total Companies
                        </p>
                        <h4 className="custome-heading">950</h4>
                      </div>
                    </div>
                   <TotalChart />
                  </div>
                </div>
              </div>
              {/* /Total Companies */}
              {/* Total Companies */}
              <div className="col-lg-3 col-md-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center overflow-hidden">
                      <span className="avatar avatar-lg bg-success flex-shrink-0">
                        <i className="ti ti-building fs-16" />
                      </span>
                      <div className="ms-2 overflow-hidden">
                        <p className="fs-12 fw-medium mb-1 text-truncate">
                          Active Companies
                        </p>
                        <h4 className="custome-heading">920</h4>
                      </div>
                    </div>
                    <ActiveCompanyChart />
                  </div>
                </div>
              </div>
              {/* /Total Companies */}
              {/* Inactive Companies */}
              <div className="col-lg-3 col-md-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center overflow-hidden">
                      <span className="avatar avatar-lg bg-danger flex-shrink-0">
                        <i className="ti ti-building fs-16" />
                      </span>
                      <div className="ms-2 overflow-hidden">
                        <p className="fs-12 fw-medium mb-1 text-truncate">
                          Inactive Companies
                        </p>
                        <h4 className="custome-heading">30</h4>
                      </div>
                    </div>
                   <InactiveCompanyChart />
                  </div>
                </div>
              </div>
              {/* /Inactive Companies */}
              {/* Company Location */}
              <div className="col-lg-3 col-md-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center overflow-hidden">
                      <span className="avatar avatar-lg bg-skyblue flex-shrink-0">
                        <i className="ti ti-map-pin-check fs-16" />
                      </span>
                      <div className="ms-2 overflow-hidden">
                        <p className="fs-12 fw-medium mb-1 text-truncate">
                          Company Location
                        </p>
                        <h4 className="custome-heading">180</h4>
                      </div>
                    </div>
                    <LocationChart />
                  </div>
                </div>
              </div>
              {/* /Company Location */}
            </div>
  );
}
