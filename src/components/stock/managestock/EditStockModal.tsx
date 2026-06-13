"use client";
/* eslint-disable @next/next/no-img-element */

import SelectField from "@/core/common/form/SelectField";
import FormCol from "@/core/common/form/FormCol";
import {
  ResponsiblePerson,
  Shop,
  WareHouse,
} from "@/core/common/selectOption/selectOption";
import Link from "next/link";
import { useState } from "react";
import { MinusCircle, PlusCircle, Search } from "react-feather";

export default function EditStockModal() {
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
              <h4>Edit Stock</h4>
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
              <div className="row">
                <FormCol lg={12}>
                  <SelectField
                    label="Warehouse"
                    required
                    className="mb-3"
                    options={WareHouse}
                    placeholder="Choose"
                    classNamePrefix="react-select"
                  />
                </FormCol>
                <FormCol lg={12}>
                  <SelectField
                    label="Shop"
                    required
                    className="mb-3"
                    options={Shop}
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
                  <div className="search-form mb-3">
                    <label className="form-label">
                      Product<span className="text-danger ms-1">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Select Product"
                      defaultValue="Nike Jordan"
                    />
                    <Search className="feather-search" />
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
                            <th className="no-sort" />
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <Link href="#" className="avatar avatar-md">
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
                              <div className="product-quantity bg-gray-transparent border-0">
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
                              <div className="d-flex align-items-center justify-content-between edit-delete-action">
                                <Link
                                  className="d-flex align-items-center border rounded p-2"
                                  href="#"
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
              <Link
                href="#"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save Changes
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
