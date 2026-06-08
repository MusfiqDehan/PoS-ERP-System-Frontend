"use client";

import Link from "next/link";

export default function BarcodeActionButtons() {
  return (
    <div className="search-barcode-button">
      <Link
        href="#"
        className="btn btn-submit btn-primary me-2 mt-0"
        data-bs-toggle="modal"
        data-bs-target="#prints-barcode"
      >
        <span>
          <i className="fas fa-eye me-2" />
        </span>
        Generate Barcode
      </Link>
      <Link href="#" className="btn btn-cancel btn-secondary fs-13 me-2">
        <span>
          <i className="fas fa-power-off me-2" />
        </span>
        Reset Barcode
      </Link>
      <Link href="#" className="btn btn-cancel btn-danger close-btn">
        <span>
          <i className="fas fa-print me-2" />
        </span>
        Print Barcode
      </Link>
    </div>
  );
}
