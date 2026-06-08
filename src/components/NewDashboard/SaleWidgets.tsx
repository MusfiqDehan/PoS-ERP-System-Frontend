"use client";
/* eslint-disable @next/next/no-img-element */


export default function SaleWidgets() {
  return (
        <div className="row">
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card bg-primary sale-widget flex-fill">
              <div className="card-body d-flex align-items-center">
                <span className="sale-icon bg-white text-primary">
                  <i className="ti ti-file-text fs-24" />
                </span>
                <div className="ms-2">
                  <p className="text-white mb-1">Total Sales</p>
                  <div className="d-inline-flex align-items-center flex-wrap gap-2">
                    <h4 className="text-white custome-heading">$48,988,078</h4>
                    <span className="badge badge-soft-primary">
                      <i className="ti ti-arrow-up me-1" />
                      +22%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card bg-secondary sale-widget flex-fill">
              <div className="card-body d-flex align-items-center">
                <span className="sale-icon bg-white text-secondary">
                  <i className="ti ti-repeat fs-24" />
                </span>
                <div className="ms-2">
                  <p className="text-white mb-1">Total Sales Return</p>
                  <div className="d-inline-flex align-items-center flex-wrap gap-2">
                    <h4 className="text-white custome-heading">$16,478,145</h4>
                    <span className="badge badge-soft-danger">
                      <i className="ti ti-arrow-down me-1" />
                      -22%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card bg-teal sale-widget flex-fill">
              <div className="card-body d-flex align-items-center">
                <span className="sale-icon bg-white text-teal">
                  <i className="ti ti-gift fs-24" />
                </span>
                <div className="ms-2">
                  <p className="text-white mb-1">Total Purchase</p>
                  <div className="d-inline-flex align-items-center flex-wrap gap-2">
                    <h4 className="text-white custome-heading">$24,145,789</h4>
                    <span className="badge badge-soft-success">
                      <i className="ti ti-arrow-up me-1" />
                      +22%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card bg-info sale-widget flex-fill">
              <div className="card-body d-flex align-items-center">
                <span className="sale-icon bg-white text-info">
                  <i className="ti ti-brand-pocket fs-24" />
                </span>
                <div className="ms-2">
                  <p className="text-white mb-1">Total Purchase Return</p>
                  <div className="d-inline-flex align-items-center flex-wrap gap-2">
                    <h4 className="text-white custome-heading">$18,458,747</h4>
                    <span className="badge badge-soft-success">
                      <i className="ti ti-arrow-up me-1" />
                      +22%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}
