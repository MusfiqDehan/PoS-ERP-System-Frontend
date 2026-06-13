"use client";
/* eslint-disable @next/next/no-img-element */

import CartCounter from "@/core/common/counter/counter";
import Link from "next/link";
import { posCartItems } from "./posOrderData";

export default function PosCartSection() {
  return (
    <div className="product-added block-section">
      <div className="head-text d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center">
          <h5 className="me-2">Order Details</h5>
          <div className="badge bg-light text-gray-9 fs-12 fw-semibold py-2 border rounded">
            Items : <span className="text-teal">3</span>
          </div>
        </div>
        <Link
          href="#"
          className="d-flex align-items-center bg-danger text-white clear-icon fs-10 fw-medium"
        >
          Clear all
        </Link>
      </div>
      <div className="product-wrap">
        <div className="empty-cart">
          <div className="fs-24 mb-1">
            <i className="ti ti-shopping-cart" />
          </div>
          <p className="fw-bold">No Products Selected</p>
        </div>
        <div className="product-list border-0 p-0">
          <div className="table-responsive">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th className="fw-bold bg-light">Item</th>
                  <th className="fw-bold bg-light">QTY</th>
                  <th className="fw-bold bg-light text-end">Cost</th>
                </tr>
              </thead>
              <tbody>
                {posCartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <Link
                          className="delete-icon"
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#delete"
                        >
                          <i className="ti ti-trash-x-filled" />
                        </Link>
                        <h6 className="fs-13 fw-normal">
                          <Link
                            href="#"
                            className="link-default"
                            data-bs-toggle="modal"
                            data-bs-target="#products"
                          >
                            {item.name}
                          </Link>
                        </h6>
                      </div>
                    </td>
                    <td>
                      <div className="qty-item m-0">
                        <CartCounter />
                      </div>
                    </td>
                    <td className="fs-13 fw-semibold text-gray-9 text-end">
                      {item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="discount-item d-flex align-items-center justify-content-between bg-purple-transparent mt-3 flex-wrap gap-2">
        <div className="d-flex align-items-center">
          <span className="bg-purple discount-icon br-5 flex-shrink-0 me-2">
            <img src="assets/img/icons/discount-icon.svg" alt="img" />
          </span>
          <div>
            <h6 className="fs-14 fw-bold text-purple mb-1">Discount 5%</h6>
            <p className="mb-0">For $20 Minimum Purchase, all Items</p>
          </div>
        </div>
        <Link href="#" className="close-icon">
          <i className="ti ti-trash" />
        </Link>
      </div>
    </div>
  );
}
