"use client";

import Link from "next/link";

export default function QrCodeActionButtons() {
  return (
    <div className="search-barcode-button">
      <Link
        href="#"
        className="btn btn-submit me-2 mt-0 fs-13 btn-primary shadow-none"
        data-bs-toggle="modal"
        data-bs-target="#prints-barcode"
      >
        <span>
          <i className="fas fa-eye me-2" />
        </span>
        Generate QR Code
      </Link>
      <Link
        href="#"
        className="btn btn-cancel me-2 fs-13 btn-secondary shadow-none"
      >
        <span>
          <i className="fas fa-power-off me-2" />
        </span>
        Reset
      </Link>
      <Link
        href="#"
        className="btn btn-cancel close-btn fs-13 btn-danger shadow-none"
      >
        <span>
          <i className="fas fa-print me-2" />
        </span>
        Print QRcode
      </Link>
    </div>
  );
}
