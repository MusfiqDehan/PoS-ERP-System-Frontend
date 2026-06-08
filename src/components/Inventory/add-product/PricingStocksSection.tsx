"use client";

import CounterThree from "@/core/common/counter/counterThree";
import FormCol from "@/core/common/form/FormCol";
import SelectField from "@/core/common/form/SelectField";
import TextField from "@/core/common/form/TextField";
import TextInput from "@/core/common/form/TextInput";
import TagInput from "@/core/common/Taginput";
import { LifeBuoy, Plus } from "react-feather";
import Link from "next/link";
import { discountTypeOptions, taxTypeOptions } from "./selectOptions";

type PricingStocksSectionProps = {
  showVariant: boolean;
  showTags: boolean;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  onVariantSelect: () => void;
  onRemoveTags: () => void;
};

export default function PricingStocksSection({
  showVariant,
  showTags,
  tags,
  onTagsChange,
  onVariantSelect,
  onRemoveTags,
}: PricingStocksSectionProps) {
  return (
    <div className="accordion-item border mb-4">
      <h2 className="accordion-header" id="headingSpacingTwo">
        <div
          className="accordion-button collapsed bg-white"
          data-bs-toggle="collapse"
          data-bs-target="#SpacingTwo"
          aria-expanded="true"
          aria-controls="SpacingTwo"
        >
          <div className="d-flex align-items-center justify-content-between flex-fill">
            <h5 className="d-flex align-items-center">
              <LifeBuoy
                data-feather="life-buoy"
                className="text-primary me-2"
              />
              <span>Pricing &amp; Stocks</span>
            </h5>
          </div>
        </div>
      </h2>
      <div
        id="SpacingTwo"
        className="accordion-collapse collapse show"
        aria-labelledby="headingSpacingTwo"
      >
        <div className="accordion-body border-top">
          <div className="mb-3s">
            <label className="form-label">
              Product Type
              <span className="text-danger ms-1">*</span>
            </label>
            <div className="single-pill-product mb-3">
              <ul className="nav nav-pills" id="pills-tab1" role="tablist">
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
                    <input type="radio" className="form-control" name="payment" />
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
                    <input type="radio" className="form-control" name="sign" />
                    <span className="checkmark" /> Variable Product
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <div className="single-product">
                <div className="row">
                  <FormCol lg={4}>
                    <TextField label="Quantity" required />
                  </FormCol>
                  <FormCol lg={4}>
                    <TextField label="Price" required />
                  </FormCol>
                  <FormCol lg={4}>
                    <SelectField
                      label="Tax Type"
                      required
                      options={taxTypeOptions}
                      placeholder="Select Option"
                    />
                  </FormCol>
                  <FormCol lg={4}>
                    <SelectField
                      label="Discount Type"
                      required
                      options={discountTypeOptions}
                    />
                  </FormCol>
                  <FormCol lg={4}>
                    <TextField label="Discount Value" required />
                  </FormCol>
                  <FormCol lg={4}>
                    <TextField label="Quantity Alert" required />
                  </FormCol>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <div className="row select-color-add">
                <div className="col-lg-6 col-sm-6 col-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Variant Attribute{" "}
                      <span className="text-danger ms-1">*</span>
                    </label>
                    <div className="row">
                      <div className="col-lg-10 col-sm-10 col-10">
                        <select
                          className="form-control variant-select select-option"
                          id="colorSelect"
                          onChange={onVariantSelect}
                        >
                          <option>Choose</option>
                          <option>Color</option>
                          <option value="red">Red</option>
                          <option value="black">Black</option>
                        </select>
                      </div>
                      <div className="col-lg-2 col-sm-2 col-2 ps-0">
                        <div className="add-icon tab">
                          <Link
                            href="#"
                            className="btn btn-filter"
                            data-bs-toggle="modal"
                            data-bs-target="#add-units"
                          >
                            <i className="feather feather-plus-circle" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  {showVariant && (
                    <div
                      className={`selected-hide-color ${showTags ? "d-block" : ""} `}
                      id="input-show"
                    >
                      <label className="form-label">
                        Variant Attribute{" "}
                        <span className="text-danger ms-1">*</span>
                      </label>
                      <div className="row align-items-center">
                        <div className="col-lg-10 col-sm-10 col-10">
                          <div className="mb-3">
                            <TagInput
                              initialTags={tags}
                              onTagsChange={onTagsChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-2 col-sm-2 col-2 ps-0">
                          <div className="mb-3 ">
                            <Link
                              href="#"
                              className="remove-color"
                              onClick={onRemoveTags}
                            >
                              <i className="far fa-trash-alt" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {showVariant && (
                <div
                  className="modal-body-table variant-table d-block"
                  id="variant-table"
                >
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Variantion</th>
                          <th>Variant Value</th>
                          <th>SKU</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th className="no-sort" />
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="add-product">
                              <TextInput defaultValue="color" />
                            </div>
                          </td>
                          <td>
                            <div className="add-product">
                              <TextInput defaultValue="red" />
                            </div>
                          </td>
                          <td>
                            <div className="add-product">
                              <TextInput defaultValue={1234} />
                            </div>
                          </td>
                          <td>
                            <CounterThree />
                          </td>
                          <td>
                            <div className="add-product">
                              <TextInput defaultValue={50000} />
                            </div>
                          </td>
                          <td className="action-table-data">
                            <div className="edit-delete-action">
                              <div className="input-block add-lists">
                                <label className="checkboxs">
                                  <input type="checkbox" defaultChecked />
                                  <span className="checkmarks" />
                                </label>
                              </div>
                              <Link
                                className="me-2 p-2"
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#add-variation"
                              >
                                <Plus
                                  data-feather="plus"
                                  className="feather-edit"
                                />
                              </Link>
                              <Link
                                data-bs-toggle="modal"
                                data-bs-target="#delete-modal"
                                className="p-2"
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
                        <tr>
                          <td>
                            <div className="add-product">
                              <TextInput defaultValue="color" />
                            </div>
                          </td>
                          <td>
                            <div className="add-product">
                              <TextInput defaultValue="black" />
                            </div>
                          </td>
                          <td>
                            <div className="add-product">
                              <TextInput defaultValue={2345} />
                            </div>
                          </td>
                          <td>
                            <CounterThree />
                          </td>
                          <td>
                            <div className="add-product">
                              <TextInput defaultValue={50000} />
                            </div>
                          </td>
                          <td className="action-table-data">
                            <div className="edit-delete-action">
                              <div className="input-block add-lists">
                                <label className="checkboxs">
                                  <input type="checkbox" defaultChecked />
                                  <span className="checkmarks" />
                                </label>
                              </div>
                              <Link
                                className="me-2 p-2"
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#edit-units"
                              >
                                <Plus
                                  data-feather="plus"
                                  className="feather-edit"
                                />
                              </Link>
                              <Link
                                data-bs-toggle="modal"
                                data-bs-target="#delete-modal"
                                className="p-2"
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
