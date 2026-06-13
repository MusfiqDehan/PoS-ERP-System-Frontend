"use client";

import Link from "next/link";
import { posFooterActions } from "./posOrderData";

export default function PosFooter() {
  return (
    <div className="pos-footer bg-white p-3 border-top">
      <div className="d-flex align-items-center justify-content-center flex-wrap gap-2">
        {posFooterActions.map((action) => (
          <Link
            key={action.id}
            href="#"
            className={`${action.buttonClass} d-inline-flex align-items-center justify-content-center`}
            data-bs-toggle={action.modalTarget ? "modal" : undefined}
            data-bs-target={action.modalTarget}
          >
            <i className={`${action.iconClass} me-2`} />
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
