"use client";

import CounterThree from "@/core/common/counter/counterThree";
import { Plus } from "react-feather";
import Link from "next/link";

type VariantTableRowProps = {
  variation: string;
  variantValue: string;
  sku: number;
  price: number;
  editModalTarget: string;
};

export default function VariantTableRow({
  variation,
  variantValue,
  sku,
  price,
  editModalTarget,
}: VariantTableRowProps) {
  return (
                                    <tr>
                                      <td>
                                        <div className="add-product">
                                          <input
                                            type="text"
                                            className="form-control"
                                            defaultValue={variation}
                                          />
                                        </div>
                                      </td>
                                      <td>
                                        <div className="add-product">
                                          <input
                                            type="text"
                                            className="form-control"
                                            defaultValue={variantValue}
                                          />
                                        </div>
                                      </td>
                                      <td>
                                        <div className="add-product">
                                          <input
                                            type="text"
                                            className="form-control"
                                            defaultValue={sku}
                                          />
                                        </div>
                                      </td>
                                      <td>
                                        <CounterThree />
                                      </td>
                                      <td>
                                        <div className="add-product">
                                          <input
                                            type="text"
                                            className="form-control"
                                            defaultValue={price}
                                          />
                                        </div>
                                      </td>
                                      <td className="action-table-data">
                                        <div className="edit-delete-action">
                                          <div className="input-block add-lists">
                                            <label className="checkboxs">
                                              <input
                                                type="checkbox"
                                                defaultChecked
                                              />
                                              <span className="checkmarks" />
                                            </label>
                                          </div>
                                          <Link
                                            className="me-2 p-2"
                                            href="#"
                                            data-bs-toggle="modal"
                                            data-bs-target={editModalTarget}
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
  );
}
