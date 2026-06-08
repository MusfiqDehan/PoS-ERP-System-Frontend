"use client";

import TagInput from "@/core/common/Taginput";
import Link from "next/link";

type VariantAttributeFieldsProps = {
  showVariant: boolean;
  showTags: boolean;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  onVariantSelect: () => void;
  onRemoveTags: () => void;
};

export default function VariantAttributeFields({
  showVariant,
  showTags,
  tags,
  onTagsChange,
  onVariantSelect,
  onRemoveTags,
}: VariantAttributeFieldsProps) {
  return (
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
                                  className={`selected-hide-color ${
                                    showTags ? "d-block" : ""
                                  } `}
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
  );
}
