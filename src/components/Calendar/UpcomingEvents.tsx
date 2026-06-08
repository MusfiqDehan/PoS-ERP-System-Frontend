"use client";

export default function UpcomingEvents() {
  return (
                      <div className="border-bottom pb-2 mb-4">
                        <h5 className="mb-2">
                          Upcoming Event
                          <span className="badge badge-success rounded-pill ms-2">
                            15
                          </span>
                        </h5>
                        <div className="border-start border-purple border-3 mb-3">
                          <div className="ps-3">
                            <h6 className="fw-medium mb-1">Meeting with Team Dev</h6>
                            <p className="fs-12">
                              <i className="ti ti-calendar-check text-info me-2" />
                              15 Mar 2025
                            </p>
                          </div>
                        </div>
                        <div className="border-start border-pink border-3 mb-3">
                          <div className="ps-3">
                            <h6 className="fw-medium mb-1">
                              Design System With Client
                            </h6>
                            <p className="fs-12">
                              <i className="ti ti-calendar-check text-info me-2" />
                              24 Mar 2025
                            </p>
                          </div>
                        </div>
                        <div className="border-start border-success border-3 mb-3">
                          <div className="ps-3">
                            <h6 className="fw-medium mb-1">UI/UX Team Call</h6>
                            <p className="fs-12">
                              <i className="ti ti-calendar-check text-info me-2" />
                              28 Mar 2025
                            </p>
                          </div>
                        </div>
                      </div>
  );
}
