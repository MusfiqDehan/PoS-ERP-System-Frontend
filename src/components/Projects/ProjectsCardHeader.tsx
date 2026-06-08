"use client";
/* eslint-disable @next/next/no-img-element */

export default function ProjectsCardHeader() {
  return (
          <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
            <h4>Projects</h4>
            <div className="d-flex align-items-center flex-wrap row-gap-3">
              <div className="avatar-list-stacked avatar-group-sm me-3">
                <span className="avatar avatar-rounded">
                  <img
                    className="border border-white"
                    src="assets/img/profiles/avatar-19.jpg"
                    alt="img"
                  />
                </span>
                <span className="avatar avatar-rounded">
                  <img
                    className="border border-white"
                    src="assets/img/profiles/avatar-29.jpg"
                    alt="img"
                  />
                </span>
                <span className="avatar avatar-rounded">
                  <img
                    className="border border-white"
                    src="assets/img/profiles/avatar-16.jpg"
                    alt="img"
                  />
                </span>
                <span className="avatar avatar-rounded bg-primary fs-12">
                  1+
                </span>
              </div>
              <div className="d-flex align-items-center me-3">
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
              <div className="input-icon-start position-relative">
                <span className="input-icon-addon">
                  <i className="ti ti-search" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Project"
                />
              </div>
            </div>
          </div>
  );
}
