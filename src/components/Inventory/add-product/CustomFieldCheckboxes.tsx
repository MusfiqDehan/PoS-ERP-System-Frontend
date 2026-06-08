"use client";

export default function CustomFieldCheckboxes() {
  return (
                        <div className="p-3 bg-light rounded d-flex align-items-center border mb-3">
                          <div className=" d-flex align-items-center">
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="warranties"
                                defaultValue="option1"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="warranties"
                              >
                                Warranties
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="manufacturer"
                                defaultValue="option2"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="manufacturer"
                              >
                                Manufacturer
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="expiry"
                                defaultValue="option2"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="expiry"
                              >
                                Expiry
                              </label>
                            </div>
                          </div>
                        </div>
  );
}
