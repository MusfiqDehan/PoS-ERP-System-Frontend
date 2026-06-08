"use client";

export default function TodoStatsRow() {
  return (
                <div className="row gy-3 mb-3">
                  <div className="col-sm-4">
                    <div className="d-flex align-items-center">
                      <h4>Total Todo</h4>
                      <span className="badge badge-dark rounded-pill badge-xs ms-2">
                        +1
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <div className="d-flex align-items-center justify-content-end">
                      <p className="mb-0 me-3 pe-3 border-end fs-14">
                        Total Task : <span className="text-dark"> 55 </span>
                      </p>
                      <p className="mb-0 me-3 pe-3 border-end fs-14">
                        Pending : <span className="text-dark"> 15 </span>
                      </p>
                      <p className="mb-0 fs-14">
                        Completed : <span className="text-dark"> 40 </span>
                      </p>
                    </div>
                  </div>
                </div>
  );
}
