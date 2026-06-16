"use client";

import Link from "next/link";

export default function RolesPermissionsFilters() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e7e7e7] px-4 py-3">
      <div className="min-w-0 flex-1" />
      <div className="flex flex-wrap items-center justify-end gap-2">
        <div className="dropdown">
          <Link
            href="#"
            className="dropdown-toggle inline-flex items-center rounded border border-[#e7e7e7] bg-white px-3 py-2 text-sm font-medium text-[#333333] no-underline"
            data-bs-toggle="dropdown"
          >
            Status
          </Link>
          <ul className="dropdown-menu dropdown-menu-end rounded border border-[#e7e7e7] p-3 shadow-sm">
            <li>
              <Link href="#" className="dropdown-item rounded">
                Active
              </Link>
            </li>
            <li>
              <Link href="#" className="dropdown-item rounded">
                Inactive
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
