"use client";

export default function ProductTypeTabs() {
  return (
                      <div className="mb-3s">
                        <label className="form-label">
                          Product Type
                          <span className="text-danger ms-1">*</span>
                        </label>
                        <div className="single-pill-product mb-3">
                          <ul
                            className="nav nav-pills"
                            id="pills-tab1"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <span
                                className="custom_radio me-4 mb-0 active"
                                id="pills-home-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-home"
                                role="tab"
                                aria-controls="pills-home"
                                aria-selected="true"
                              >
                                <input
                                  type="radio"
                                  className="form-control"
                                  name="payment"
                                />
                                <span className="checkmark" /> Single Product
                              </span>
                            </li>
                            <li className="nav-item" role="presentation">
                              <span
                                className="custom_radio me-2 mb-0"
                                id="pills-profile-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-profile"
                                role="tab"
                                aria-controls="pills-profile"
                                aria-selected="false"
                              >
                                <input
                                  type="radio"
                                  className="form-control"
                                  name="sign"
                                />
                                <span className="checkmark" /> Variable Product
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
  );
}
