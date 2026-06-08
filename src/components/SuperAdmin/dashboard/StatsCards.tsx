"use client";
/* eslint-disable @next/next/no-img-element */
import CompanyBarChart from "@/components/charts/superAdmincharts/companyBarchart";

export default function StatsCards() {
  return (
    <div className="row">
      <div className="col-xl-3 col-sm-6 d-flex">
        <div className="card flex-fill">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between">
              <span className="avatar avatar-md bg-dark mb-3">
                <i className="ti ti-building fs-16" />
              </span>
              <span className="badge bg-success fw-normal mb-3">
                +19.01%
              </span>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h2 className="mb-1 custome-heading">5465</h2>
                <p className="fs-13">Total Companies</p>
              </div>
              <CompanyBarChart color="#FF6F28" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6 d-flex">
        <div className="card flex-fill">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between">
              <span className="avatar avatar-md bg-dark mb-3">
                <i className="ti ti-carousel-vertical fs-16" />
              </span>
              <span className="badge bg-danger fw-normal mb-3">-12%</span>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h2 className="mb-1 custome-heading">4598</h2>
                <p className="fs-13">Active Companies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6 d-flex">
        <div className="card flex-fill">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between">
              <span className="avatar avatar-md bg-dark mb-3">
                <i className="ti ti-chalkboard-off fs-16" />
              </span>
              <span className="badge bg-success fw-normal mb-3">+6%</span>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h2 className="mb-1 custome-heading">3698</h2>
                <p className="fs-13">Total Subscribers</p>
              </div>
              <CompanyBarChart color="#4B3088" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6 d-flex">
        <div className="card flex-fill">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between">
              <span className="avatar avatar-md bg-dark mb-3">
                <i className="ti ti-businessplan fs-16" />
              </span>
              <span className="badge bg-danger fw-normal mb-3">-16%</span>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h2 className="mb-1 custome-heading">$89,878,58</h2>
                <p className="fs-13">Total Earnings</p>
              </div>
              <CompanyBarChart color="#2DCB73" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
