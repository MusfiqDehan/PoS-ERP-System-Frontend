"use client";

import { DatePicker, TimePicker } from "antd";
import dayjs from "dayjs";
import Link from "next/link";

export default function AddEventModal() {
  const onChange = () => {};

  return (
          <div className="modal fade" id="add_event">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Add New Event</h4>
                  <button
                    type="button"
                    className="btn-close custom-btn-close p-0 p-0"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <i className="ti ti-x" />
                  </button>
                </div>
                <form>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Event Name<span className="text-danger ms-1">*</span>
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Event Date<span className="text-danger ms-1">*</span>
                          </label>
                          <div className="input-icon-end position-relative">
                            <DatePicker
                              className="form-control datetimepicker"
                              placeholder="dd/mm/yyyy"
                            />
                            <span className="input-icon-addon">
                              <i className="ti ti-calendar text-gray-7" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Start Time<span className="text-danger ms-1">*</span>
                          </label>
                          <div className="input-icon-end position-relative">
                            <TimePicker
                              className="input-group-text"
                              onChange={onChange}
                              defaultValue={dayjs("00:00:00", "HH:mm:ss")}
                            />
                            <span className="input-icon-addon">
                              <i className="ti ti-clock text-gray-7" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            End Time<span className="text-danger ms-1">*</span>
                          </label>
                          <div className="input-icon-end position-relative">
                          <TimePicker
                              className="input-group-text"
                              onChange={onChange}
                              defaultValue={dayjs("00:00:00", "HH:mm:ss")}
                            />
                            <span className="input-icon-addon">
                              <i className="ti ti-clock text-gray-7" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Event Location<span className="text-danger ms-1">*</span>
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="mb-0">
                          <label className="form-label">
                            Descriptions<span className="text-danger ms-1">*</span>
                          </label>
                          <textarea
                            className="form-control"
                            rows={3}
                            defaultValue={""}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <Link href="#" className="btn btn-primary" data-bs-dismiss="modal">
                      Add Event
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
  );
}
