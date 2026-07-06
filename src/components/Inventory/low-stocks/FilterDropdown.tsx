"use client";

import type { LowStockFilterOption } from "./types";

type FilterDropdownProps = {
  label: string;
  options: LowStockFilterOption[];
  value?: string;
  onChange: (value: string | undefined) => void;
  className?: string;
};

export default function FilterDropdown({
  label,
  options,
  value,
  onChange,
  className = "dropdown",
}: FilterDropdownProps) {
  const activeLabel = value
    ? options.find((option) => option.id === value)?.name ?? label
    : label;

  return (
    <div className={className}>
      <button
        type="button"
        data-bs-toggle="dropdown"
        className={`inline-flex items-center gap-2 px-3 py-2 border rounded text-[14px] bg-white ${
          value
            ? "border-[#0ac79e] text-[#0ac79e]"
            : "border-[#e7e7e7] text-[#646B72] hover:border-[#0ac79e]"
        }`}
      >
        {activeLabel}
        <i className="ti ti-chevron-down text-[14px]" />
      </button>
      <ul
        className="dropdown-menu dropdown-menu-end p-2"
        style={{ maxHeight: 240, overflowY: "auto" }}
      >
        {value && (
          <li>
            <button
              type="button"
              className="dropdown-item rounded-1 text-[#dc3545]"
              onClick={() => onChange(undefined)}
            >
              Clear filter
            </button>
          </li>
        )}
        {options.map((option) => (
          <li key={option.id}>
            <button
              type="button"
              className={`dropdown-item rounded-1 ${value === option.id ? "fw-bold text-[#0ac79e]" : ""}`}
              onClick={() => onChange(option.id)}
            >
              {option.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
