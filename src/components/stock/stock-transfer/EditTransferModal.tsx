"use client";
/* eslint-disable @next/next/no-img-element */

import FormCol from "@/core/common/form/FormCol";
import SelectField from "@/core/common/form/SelectField";
import {
  WarehouseFrom,
  WarehouseTo,
} from "@/core/common/selectOption/selectOption";
import Link from "next/link";
import { useState } from "react";
import { MinusCircle, PlusCircle } from "react-feather";
import DefaultEditor from "react-simple-wysiwyg";

export default function EditTransferModal() {
  const [quantity, setQuantity] = useState(4);
  const [values, setValue] = useState<string | undefined>();

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value);
  }

  return (
    <div className="modal fade" id="edit-units">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <div className="page-title">
              <h4>Edit Transfer</h4>
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
                <FormCol lg={6}>
                  <SelectField
                    label="Warehouse From"
                    required
                    className="mb-3"
                    options={WarehouseFrom}
                    placeholder="Choose"
                    classNamePrefix="react-select"
                  />
                </FormCol>
                <FormCol lg={6}>
                  <SelectField
                    label="Warehouse To"
                    required
                    className="mb-3"
                    options={WarehouseTo}
                    placeholder="Choose"
                    classNamePrefix="react-select"
                  />
                </FormCol>
                <FormCol lg={12}>
                  <div className="mb-3">
                    <label className="form-label">
                      Reference No<span className="text-danger ms-1">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={32434545}
                    />
                  </div>
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
                    <i data-feather="search" className="feather-search" />
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
                            <th>Action</th>
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
                              <div className="edit-delete-action d-flex align-items-center justify-content-center">
                                <Link
                                  className="p-2 d-flex align-items-center justify-content-center border rounded"
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
                  <div className="mb-3 search-form mb-0">
                    <label className="form-label">
                      Notes<span className="text-danger ms-1">*</span>
                    </label>
                    <DefaultEditor value={values} onChange={onChange} />
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
