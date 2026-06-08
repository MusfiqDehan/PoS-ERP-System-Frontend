"use client";

export default function StatsCards() {
  return (
            <div className="row">
              {/* Total Plans */}
              <div className="col-lg-3 col-md-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center overflow-hidden">
                      <div>
                        <p className="fs-12 fw-medium mb-1 text-truncate">
                          Total Plans
                        </p>
                        <h4>08</h4>
                      </div>
                    </div>
                    <div>
                      <span className="avatar avatar-lg bg-primary flex-shrink-0">
                        <i className="ti ti-box fs-16" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Total Plans */}
              {/* Total Plans */}
              <div className="col-lg-3 col-md-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center overflow-hidden">
                      <div>
                        <p className="fs-12 fw-medium mb-1 text-truncate">
                          Active Plans
                        </p>
                        <h4>08</h4>
                      </div>
                    </div>
                    <div>
                      <span className="avatar avatar-lg bg-success flex-shrink-0">
                        <i className="ti ti-activity-heartbeat fs-16" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Total Plans */}
              {/* Inactive Plans */}
              <div className="col-lg-3 col-md-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center overflow-hidden">
                      <div>
                        <p className="fs-12 fw-medium mb-1 text-truncate">
                          Inactive Plans
                        </p>
                        <h4>0</h4>
                      </div>
                    </div>
                    <div>
                      <span className="avatar avatar-lg bg-danger flex-shrink-0">
                        <i className="ti ti-player-pause fs-16" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Inactive Companies */}
              {/* No of Plans  */}
              <div className="col-lg-3 col-md-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center overflow-hidden">
                      <div>
                        <p className="fs-12 fw-medium mb-1 text-truncate">
                          No of Plan Types
                        </p>
                        <h4>02</h4>
                      </div>
                    </div>
                    <div>
                      <span className="avatar avatar-lg bg-skyblue flex-shrink-0">
                        <i className="ti ti-mask fs-16" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* /No of Plans */}
            </div>
  );
}
