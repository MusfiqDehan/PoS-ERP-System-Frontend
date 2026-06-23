"use client";
/* eslint-disable @next/next/no-img-element */

export default function AddMemberModal() {
  return (
          <div className="modal fade" id="add_member">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Add Members</h4>
                  <button
                    type="button"
                    className="btn-close custom-btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <i className="ti ti-x" />
                  </button>
                </div>
                <div className="modal-body">
                  <div className="position-relative input-icon mb-3">
                    <span className="input-icon-addon">
                      <i className="ti ti-search" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                    />
                  </div>
                  <div className="form-check ps-0">
                    <label className="form-check-label member-check-list activate d-flex align-items-center justify-content-between p-2 rounded mb-1">
                      <span className="d-flex align-items-center text-dark">
                        <span className="avatar avatar-md avatar-rounded">
                          <img
                            src="assets/img/profiles/avatar-01.jpg"
                            className="me-2"
                            alt="Sortorium"
                          />
                        </span>
                        Sophie
                      </span>
                      <input
                        type="checkbox"
                        className="form-check-input"
                      />
                    </label>
                    <label className="form-check-label member-check-list d-flex align-items-center justify-content-between p-2 rounded mb-1">
                      <span className="d-flex align-items-center text-dark">
                        <span className="avatar avatar-md avatar-rounded">
                          <img
                            src="assets/img/profiles/avatar-02.jpg"
                            className="me-2"
                            alt="Sortorium"
                          />
                        </span>
                        Cameron
                      </span>
                      <input type="checkbox" className="form-check-input" />
                    </label>
                    <label className="form-check-label member-check-list d-flex align-items-center justify-content-between p-2 rounded mb-1">
                      <span className="d-flex align-items-center text-dark">
                        <span className="avatar avatar-md avatar-rounded">
                          <img
                            src="assets/img/profiles/avatar-03.jpg"
                            className="me-2"
                            alt="Sortorium"
                          />
                        </span>
                        Doris
                      </span>
                      <input type="checkbox" className="form-check-input" />
                    </label>
                    <label className="form-check-label member-check-list d-flex align-items-center justify-content-between p-2 rounded mb-1">
                      <span className="d-flex align-items-center text-dark">
                        <span className="avatar avatar-md avatar-rounded">
                          <img
                            src="assets/img/profiles/avatar-04.jpg"
                            className="me-2"
                            alt="Sortorium"
                          />
                        </span>
                        Rufana
                      </span>
                      <input type="checkbox" className="form-check-input" />
                    </label>
                    <label className="form-check-label member-check-list d-flex align-items-center justify-content-between p-2 rounded mb-1">
                      <span className="d-flex align-items-center text-dark">
                        <span className="avatar avatar-md avatar-rounded">
                          <img
                            src="assets/img/profiles/avatar-04.jpg"
                            className="me-2"
                            alt="Sortorium"
                          />
                        </span>
                        Michael
                      </span>
                      <input type="checkbox" className="form-check-input" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
}
