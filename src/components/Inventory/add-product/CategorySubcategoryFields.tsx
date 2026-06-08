"use client";

import { PlusCircle } from "react-feather";
import Link from "next/link";
import Select from "react-select";
import { categoryOptions, subcategoryOptions } from "./selectOptions";

export default function CategorySubcategoryFields() {
  return (
                      <div className="addservice-info">
                        <div className="row">
                          <div className="col-sm-6 col-12">
                            <div className="mb-3">
                              <div className="add-newplus">
                                <label className="form-label">
                                  Category
                                  <span className="text-danger ms-1">*</span>
                                </label>
                                <Link
                                  href="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#add-units-category"
                                >
                                  <PlusCircle
                                  size={14}
                                    data-feather="plus-circle"
                                    className="plus-down-add"
                                  />
                                  <span>Add New</span>
                                </Link>
                              </div>
                              <Select
                                className="react-select"
                                options={categoryOptions}
                                placeholder="Choose"
                              />
                            </div>
                          </div>
                          <div className="col-sm-6 col-12">
                            <div className="mb-3">
                              <label className="form-label">
                                Sub Category
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <Select
                                className="react-select"
                                options={subcategoryOptions}
                                placeholder="Choose"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
  );
}
