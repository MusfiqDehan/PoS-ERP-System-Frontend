"use client";
/* eslint-disable @next/next/no-img-element */

import FormCol from "@/core/common/form/FormCol";
import SelectField from "@/core/common/form/SelectField";
import {
  ResponsiblePerson,
  Store,
  WareHouse,
} from "@/core/common/selectOption/selectOption";
import Link from "next/link";
import { useState } from "react";
import { MinusCircle, PlusCircle } from "react-feather";

export default function EditAdjustmentModal() {
  const [quantity, setQuantity] = useState(4);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="modal fade" id="edit-units">
      <div className="modal-dialog modal-dialog-centered stock-adjust-modal">
        <div className="modal-content">
          <div className="modal-header">
            <div className="page-title">
              <h4>Edit Adjustment</h4>
            </div>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <form>
            <div className="modal-body">
              <div className="mb-3 search-form">
                <label className="form-label">
                  Product<span className="text-danger ms-1">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="Nike Jordan"
                />
                <i data-feather="search" className="feather-search" />
              </div>
              <div className="row">
                <FormCol lg={6}>
                  <SelectField
                    label="Warehouse"
                    required
                    className="mb-3"
                    options={WareHouse}
                    placeholder="Choose"
                    classNamePrefix="react-select"
                  />
                </FormCol>
                <FormCol lg={6}>
                  <div className="mb-3">
                    <label className="form-label">
                      Reference Number
                      <span className="text-danger ms-1">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="PT002"
                    />
                  </div>
                </FormCol>
                <FormCol lg={12}>
                  <div className="modal-body-table">
                    <div className="table-responsive">
                      <table className="table  datanew">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>SKU</th>
                            <th>Category</th>
                            <th>Qty</th>
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <Link
                                  href="#"
                                  className="avatar avatar-md me-2"
                                >
                                  <img
                                    src="assets/img/products/stock-img-02.png"
                                    alt="product"
                                  />
                                </Link>
                                <Link href="#">Nike Jordan</Link>
                              </div>
                            </td>
                            <td>PT002</td>
                            <td>Nike</td>
                            <td>
                              <div className="product-quantity border-0 bg-gray-transparent">
                                <span
                                  className="quantity-btn"
                                  onClick={handleDecrement}
                                >
                                  <MinusCircle size={14} />
                                </span>
                                <input
                                  type="text"
                                  className="quntity-input bg-transparent"
                                  defaultValue={2}
                                />
                                <span
                                  className="quantity-btn"
                                  onClick={handleIncrement}
                                >
                                  +
                                  <PlusCircle size={14} className="plus-circle" />
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="edit-delete-action d-flex align-items-center">
                                <Link
                                  className="p-2 border rounded d-flex align-items-center"
                                  href="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete"
                                >
                                  <i
                                    data-feather="trash-2"
                                    className="feather-trash-2"
                                  />
                                </Link>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </FormCol>
                <FormCol lg={12}>
                  <SelectField
                    label="Store"
                    required
                    className="mb-3"
                    options={Store}
                    placeholder="Choose"
                    classNamePrefix="react-select"
                  />
                </FormCol>
                <FormCol lg={12}>
                  <SelectField
                    label="Responsible Person"
                    required
                    className="mb-3"
                    options={ResponsiblePerson}
                    placeholder="Choose"
                    classNamePrefix="react-select"
                  />
                </FormCol>
                <FormCol lg={12}>
                  <div className="mb-3 summer-description-box">
                    <label className="form-label">
                      Notes<span className="text-danger ms-1">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      defaultValue="The Jordan brand is owned by Nike (owned by the Knight family), as, at the time, the company was building its strategy to work with athletes to launch shows that could inspire consumers.Although Jordan preferred Converse and Adidas, they simply could not match the offer Nike made. "
                    />
                  </div>
                </FormCol>
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
              <Link href="#" className="btn btn-primary">
                Save Changes
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
