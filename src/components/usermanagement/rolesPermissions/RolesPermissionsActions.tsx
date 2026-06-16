"use client";

import { all_routes } from "@/data/all_routes";
import Link from "next/link";

const actionLinkClass =
  "inline-flex rounded p-2 text-[#666666] no-underline transition-colors hover:bg-[#f5f5f5] hover:text-[#333333]";

export default function RolesPermissionsActions() {
  const route = all_routes;

  return (
    <div className="flex items-center justify-end">
      <div className="flex items-center gap-1">
        <Link className={actionLinkClass} href={route.permissions}>
          <i data-feather="sheild" className="feather feather-shield shield" />
        </Link>
        <Link
          className={actionLinkClass}
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#edit_role"
        >
          <i data-feather="edit" className="feather-edit" />
        </Link>
        <Link
          className={actionLinkClass}
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#delete_modal"
        >
          <i data-feather="trash-2" className="feather-trash-2" />
        </Link>
      </div>
    </div>
  );
}
