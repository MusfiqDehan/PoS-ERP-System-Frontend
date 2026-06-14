"use client";

import Link from "next/link";
import { PRODUCT_NAME } from "@/lib/branding";

export default function ThemeForestResult() {
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card shadow-none">
          <div className="card-body">
            <Link href="#" className="text-info text-truncate mb-2">
              {PRODUCT_NAME}
            </Link>
            <p className="text-truncate line-clamb-2 mb-2">
              {PRODUCT_NAME} — retail POS, inventory management, and admin dashboard
            </p>
            <div className="d-flex align-items-center flex-wrap row-gap-2">
              <span className="text-gray-9 me-3 pe-3 border-end">POS &amp; Inventory</span>
              <span className="text-gray-9">Retail SaaS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
