"use client";

import { DatePicker } from "antd";
import { Calendar } from "react-feather";

export default function ManufactureExpiryDates() {
  return (
                        <div className="row">
                          <div className="col-sm-6 col-12">
                            <div className="mb-3">
                              <label className="form-label">
                                Manufactured Date
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <div className="input-groupicon calender-input">
                                <Calendar className="info-img" />
                                <DatePicker
                                  className="form-control datetimepicker"
                                  placeholder="dd/mm/yyyy"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6 col-12">
                            <div className="mb-3">
                              <label className="form-label">
                                Expiry On
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <div className="input-groupicon calender-input">
                                <Calendar className="info-img" />
                                <DatePicker
                                  className="form-control datetimepicker"
                                  placeholder="dd/mm/yyyy"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
  );
}
