"use client";

import Link from "next/link";

export default function PosPaymentSummary() {
  return (
    <div className="order-total bg-total bg-white p-0">
      <h5 className="mb-3">Payment Summary</h5>
      <table className="table table-responsive table-borderless">
        <tbody>
          <tr>
            <td>
              Shipping
              <Link
                href="#"
                className="ms-3 link-default"
                data-bs-toggle="modal"
                data-bs-target="#shipping-cost"
              >
                <i className="ti ti-edit" />
              </Link>
            </td>
            <td className="text-gray-9 text-end">$40.21</td>
          </tr>
          <tr>
            <td>
              Tax
              <Link
                href="#"
                className="ms-3 link-default"
                data-bs-toggle="modal"
                data-bs-target="#order-tax"
              >
                <i className="ti ti-edit" />
              </Link>
            </td>
            <td className="text-gray-9 text-end">$25</td>
          </tr>
          <tr>
            <td>
              Coupon
              <Link
                href="#"
                className="ms-3 link-default"
                data-bs-toggle="modal"
                data-bs-target="#coupon-code"
              >
                <i className="ti ti-edit" />
              </Link>
            </td>
            <td className="text-gray-9 text-end">$25</td>
          </tr>
          <tr>
            <td>
              <span className="text-danger">Discount</span>
              <Link
                href="#"
                className="ms-3 link-default"
                data-bs-toggle="modal"
                data-bs-target="#discount"
              >
                <i className="ti ti-edit" />
              </Link>
            </td>
            <td className="text-danger text-end">$15.21</td>
          </tr>
          <tr>
            <td>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="round"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="round">
                  Roundoff
                </label>
              </div>
            </td>
            <td className="text-gray-9 text-end">+0.11</td>
          </tr>
          <tr>
            <td>Sub Total</td>
            <td className="text-gray-9 text-end">$60,454</td>
          </tr>
          <tr>
            <td className="fw-bold border-top border-dashed">Total Payable</td>
            <td className="text-gray-9 fw-bold text-end border-top border-dashed">
              $56590
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
