"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { posPaymentMethods } from "./posOrderData";

export default function PosPaymentMethods() {
  return (
    <div className="card payment-method">
      <div className="card-body">
        <h5 className="mb-3">Select Payment</h5>
        <div className="row align-items-center methods g-2">
          {posPaymentMethods.map((method) => (
            <div key={method.id} className="col-sm-6 col-md-4 d-flex">
              <Link
                href="#"
                className="payment-item d-flex align-items-center justify-content-center p-2 flex-fill"
                data-bs-toggle={method.modalTarget ? "modal" : undefined}
                data-bs-target={method.modalTarget}
              >
                <img src={method.iconSrc} className="me-2" alt="img" />
                <p className="fs-14 fw-medium">{method.label}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
