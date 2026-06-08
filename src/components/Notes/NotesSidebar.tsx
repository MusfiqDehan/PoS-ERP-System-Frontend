"use client";

import Link from "next/link";

export default function NotesSidebar() {
  return (
          <div className="col-xl-3 col-md-12 sidebars-right theiaStickySidebar section-bulk-widget">
            <div className="border rounded-3 bg-white p-3">
              <div className="mb-3 pb-3 border-bottom">
                <h4 className="d-flex align-items-center">
                  <i className="ti ti-file-text me-2" />
                  Notes List
                </h4>
              </div>
              <div className="border-bottom pb-3 ">
                <div
                  className="nav flex-column nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    className="d-flex text-start align-items-center fw-medium fs-15 nav-link active mb-1"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="true"
                  >
                    <i className="ti ti-inbox me-2" />
                    All Notes<span className="ms-2">1</span>
                  </button>
                  <button
                    className="d-flex text-start align-items-center fw-medium fs-15 nav-link mb-1"
                    id="v-pills-messages-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-messages"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-messages"
                    aria-selected="false"
                  >
                    <i className="ti ti-star me-2" />
                    Important
                  </button>
                  <button
                    className="d-flex text-start align-items-center fw-medium fs-15 nav-link mb-0"
                    id="v-pills-settings-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-settings"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-settings"
                    aria-selected="false"
                  >
                    <i className="ti ti-trash me-2" />
                    Trash
                  </button>
                </div>
              </div>
              <div className="mt-3">
                <div className="border-bottom px-2 pb-3 mb-3">
                  <h5 className="mb-2">Tags</h5>
                  <div className="d-flex flex-column mt-2">
                    <Link href="#" className="text-info mb-2">
                      <span className="text-info me-2">
                        <i className="fas fa-square square-rotate fs-10" />
                      </span>
                      Pending
                    </Link>
                    <Link href="#" className="text-danger mb-2">
                      <span className="text-danger me-2">
                        <i className="fas fa-square square-rotate fs-10" />
                      </span>
                      Onhold
                    </Link>
                    <Link href="#" className="text-warning mb-2">
                      <span className="text-warning me-2">
                        <i className="fas fa-square square-rotate fs-10" />
                      </span>
                      Inprogress
                    </Link>
                    <Link href="#" className="text-success">
                      <span className="text-success me-2">
                        <i className="fas fa-square square-rotate fs-10" />
                      </span>
                      Done
                    </Link>
                  </div>
                </div>
                <div className="px-2">
                  <h5 className="mb-2">Priority</h5>
                  <div className="d-flex flex-column mt-2">
                    <Link href="#" className="text-warning mb-2">
                      <span className="text-warning me-2">
                        <i className="fas fa-square square-rotate fs-10" />
                      </span>
                      Medium
                    </Link>
                    <Link href="#" className="text-success mb-2">
                      <span className="text-success me-2">
                        <i className="fas fa-square square-rotate fs-10" />
                      </span>
                      High
                    </Link>
                    <Link href="#" className="text-danger">
                      <span className="text-danger me-2">
                        <i className="fas fa-square square-rotate fs-10" />
                      </span>
                      Low
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
}
