"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { MinusCircle, PlusCircle } from "react-feather";

type QrCodeProductsTableProps = {
  onDecrement: () => void;
  onIncrement: () => void;
};

export default function QrCodeProductsTable({
  onDecrement,
  onIncrement,
}: QrCodeProductsTableProps) {
  return (
    <div className="col-lg-12">
      <div className="modal-body-table search-modal-header bg-light p-2 p-sm-4">
        <div className="table-responsive rounded-1 qrcode-table">
          <table className="table  datatable">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Code</th>
                <th>Reference Number</th>
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
                <td>32RRR554</td>
                <td>
                  <div className="product-quantity">
                    <span className="quantity-btn" onClick={onDecrement}>
                      <MinusCircle size={14} />
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
                <td className="action-table-data justify-content-center">
                  <div className="edit-delete-action">
                    <Link
                      data-bs-toggle="modal"
                      data-bs-target="#delete-modal"
                      className="barcode-delete-icon"
                      href="#"
                    >
                      <i data-feather="trash-2" className="feather-trash-2" />
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
