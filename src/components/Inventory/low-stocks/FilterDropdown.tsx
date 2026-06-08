"use client";

import Link from "next/link";

type FilterDropdownProps = {
  label: string;
  options: string[];
  className?: string;
};

export default function FilterDropdown({
  label,
  options,
  className = "dropdown me-2",
}: FilterDropdownProps) {
  return (
    <div className={className}>
      <Link
        href="#"
        className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
        data-bs-toggle="dropdown"
      >
        {label}
      </Link>
      <ul className="dropdown-menu  dropdown-menu-end p-3">
        {options.map((option, index) => (
          <li key={`${option}-${index}`}>
            <Link href="#" className="dropdown-item rounded-1">
              {option}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
