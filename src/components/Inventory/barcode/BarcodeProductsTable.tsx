"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { MinusCircle, PlusCircle } from "react-feather";

type BarcodeProductsTableProps = {
  onDecrement: () => void;
  onIncrement: () => void;
};

export default function BarcodeProductsTable({
  onDecrement,
  onIncrement,
}: BarcodeProductsTableProps) {
  return (
    <div className="col-lg-12">
      <div className="modal-body-table search-modal-header bg-light p-2 p-sm-4">
        <div className="table-responsive border rounded-1 barcode-table">
          <table className="table  datatable mb-0">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Code</th>
                <th>Qty</th>
                <th className="text-center no-sort bg-secondary-transparent" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-md me-2">
                      <img
                        src="assets/img/products/stock-img-02.png"
                        alt="product"
                      />
                    </Link>
                    <Link href="#">Nike Jordan</Link>
                  </div>
                </td>
                <td>PT002</td>
                <td>HG3FK</td>
                <td>
                  <div className="product-quantity border-secondary-transparent">
                    <span className="quantity-btn" onClick={onDecrement}>
                      <MinusCircle size={14} className="feather-search" />
                    </span>
                    <input
                      type="text"
                      className="quntity-input"
                      defaultValue={4}
                    />
                    <span className="quantity-btn" onClick={onIncrement}>
                      +
                      <PlusCircle size={14} className="plus-circle" />
                    </span>
                  </div>
                </td>
                <td className="action-table-data">
                  <div className="edit-delete-action">
                    <Link
                      data-bs-toggle="modal"
                      data-bs-target="#delete-modal"
                      className="barcode-delete-icon"
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
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-md me-2">
                      <img
                        src="assets/img/products/stock-img-03.png"
                        alt="product"
                      />
                    </Link>
                    <Link href="#">Apple Series 5 Watch</Link>
                  </div>
                </td>
                <td>PT003</td>
                <td>TEUIU7</td>
                <td>
                  <div className="product-quantity border-secondary-transparent">
                    <span className="quantity-btn" onClick={onDecrement}>
                      <MinusCircle size={14} className="feather-search" />
                    </span>
                    <input
                      type="text"
                      className="quntity-input"
                      defaultValue={4}
                    />
                    <span className="quantity-btn" onClick={onIncrement}>
                      +
                      <PlusCircle size={14} className="plus-circle" />
                    </span>
                  </div>
                </td>
                <td className="action-table-data">
                  <div className="edit-delete-action">
                    <Link
                      data-bs-toggle="modal"
                      data-bs-target="#delete-modal"
                      className="barcode-delete-icon"
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
    </div>
  );
}
