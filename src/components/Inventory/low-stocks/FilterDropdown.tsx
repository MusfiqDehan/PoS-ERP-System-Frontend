"use client";

import Link from "next/link";

type FilterDropdownProps = {
  label: string;
  options: string[];
  className?: string;
};

export default function FilterDropdown({ label, options, className = "dropdown" }: FilterDropdownProps) {
  return (
    <div className={className}>
      <button
        type="button"
        data-bs-toggle="dropdown"
        className="inline-flex items-center gap-2 px-3 py-2 border border-[#e7e7e7] rounded text-[14px] text-[#646B72] bg-white hover:border-[#0ac79e]"
      >
        {label}
        <i className="ti ti-chevron-down text-[14px]" />
      </button>
      <ul className="dropdown-menu dropdown-menu-end p-2">
        {options.map((option, index) => (
          <li key={`${option}-${index}`}>
            <Link href="#" className="dropdown-item rounded-1">{option}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
