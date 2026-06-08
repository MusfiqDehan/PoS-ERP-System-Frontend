"use client";

import VariantTableRow from "./VariantTableRow";

type VariantTableProps = {
  visible: boolean;
};

export default function VariantTable({ visible }: VariantTableProps) {
  if (!visible) return null;

  return (
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
                                    <VariantTableRow
                                      variation="color"
                                      variantValue="red"
                                      sku={1234}
                                      price={50000}
                                      editModalTarget="#add-variation"
                                    />
                                    <VariantTableRow
                                      variation="color"
                                      variantValue="black"
                                      sku={2345}
                                      price={50000}
                                      editModalTarget="#edit-units"
                                    />
                                  </tbody>
                                </table>
                              </div>
                            </div>
  );
}
