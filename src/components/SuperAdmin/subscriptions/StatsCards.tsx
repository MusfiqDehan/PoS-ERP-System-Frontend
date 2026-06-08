"use client";

import TotaltransactionChart from "@/components/charts/superAdmincharts/totaltransaction";
import ActivesubscriptionChart from "@/components/charts/superAdmincharts/activeSubscription";
import ExpiredsubscriptionChart from "@/components/charts/superAdmincharts/expiredSubscription";
import TotalsubscriptionChart from "@/components/charts/superAdmincharts/totalSubscription";

export default function StatsCards() {
  return (
          <div className="row">
            <div className="col-xl-3 col-md-6 d-flex">
              <div className="card flex-fill">
                <div className="card-body ">
                  <div className="border-bottom pb-3 mb-3">
                    <div className="row align-items-center">
                      <div className="col-7">
                        <div>
                          <span className="fs-14 fw-normal text-truncate mb-1">
                            Total Transaction
                          </span>
                          <h5>$5,340</h5>
                        </div>
                      </div>
                      <div className="col-5">
                        <TotaltransactionChart />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                      <span className="text-primary fs-12 d-flex align-items-center me-1">
                        <i className="ti ti-arrow-wave-right-up me-1" />
                        +19.01%
                      </span>
                      from last week
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 d-flex">
              <div className="card flex-fill">
                <div className="card-body ">
                  <div className="border-bottom pb-3 mb-3">
                    <div className="row align-items-center">
                      <div className="col-7">
                        <div>
                          <span className="fs-14 fw-normal text-truncate mb-1">
                            Total Subscribers
                          </span>
                          <h5>600</h5>
                        </div>
                      </div>
                      <div className="col-5">
                        <TotalsubscriptionChart />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                      <span className="text-primary fs-12 d-flex align-items-center me-1">
                        <i className="ti ti-arrow-wave-right-up me-1" />
                        +19.01%
                      </span>
                      from last week
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 d-flex">
              <div className="card flex-fill">
                <div className="card-body ">
                  <div className="border-bottom pb-3 mb-3">
                    <div className="row align-items-center">
                      <div className="col-7">
                        <div>
                          <span className="fs-14 fw-normal text-truncate mb-1">
                            Active Subscribers
                          </span>
                          <h5>560</h5>
                        </div>
                      </div>
                      <div className="col-5">
                        <ActivesubscriptionChart />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                      <span className="text-primary fs-12 d-flex align-items-center me-1">
                        <i className="ti ti-arrow-wave-right-up me-1" />
                        +19.01%
                      </span>
                      from last week
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 d-flex">
              <div className="card flex-fill">
                <div className="card-body ">
                  <div className="border-bottom pb-3 mb-3">
                    <div className="row align-items-center">
                      <div className="col-7">
                        <div>
                          <span className="fs-14 fw-normal text-truncate mb-1">
                            Expired Subscribers
                          </span>
                          <h5>40</h5>
                        </div>
                      </div>
                      <div className="col-5">
                        <ExpiredsubscriptionChart />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                      <span className="text-primary fs-12 d-flex align-items-center me-1">
                        <i className="ti ti-arrow-wave-right-up me-1" />
                        +19.01%
                      </span>
                      from last week
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
}
