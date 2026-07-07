"use client";

import { useCallback } from "react";

export type ProductFilters = {
  category?: string;
  brand?: string;
  ordering?: string;
};

type FilterOption = { id: string; name: string };

type Props = {
  categories: FilterOption[];
  brands: FilterOption[];
  filters: ProductFilters;
  onFilterChange: (filters: ProductFilters) => void;
};

const SORT_OPTIONS = [
  { id: "-created_at", name: "Recently Added" },
  { id: "name", name: "Name A-Z" },
  { id: "-name", name: "Name Z-A" },
  { id: "price", name: "Price Low-High" },
  { id: "-price", name: "Price High-Low" },
];

export default function ProductListFilters({ categories, brands, filters, onFilterChange }: Props) {
  const handleSelect = useCallback(
    (key: keyof ProductFilters, value: string | undefined) => {
      onFilterChange({ ...filters, [key]: value === filters[key] ? undefined : value });
    },
    [filters, onFilterChange],
  );

  const dropdowns = [
    { key: "category" as const, label: filters.category ? categories.find(c => c.id === filters.category)?.name ?? "Category" : "Category", items: categories, active: filters.category },
    { key: "brand" as const, label: filters.brand ? brands.find(b => b.id === filters.brand)?.name ?? "Brand" : "Brand", items: brands, active: filters.brand },
    { key: "ordering" as const, label: filters.ordering ? SORT_OPTIONS.find(s => s.id === filters.ordering)?.name ?? "Sort By" : "Sort By", items: SORT_OPTIONS, active: filters.ordering },
  ];

  return (
    <div className="flex items-center justify-end flex-wrap gap-2 p-4 border-b border-[#f1f1f1]">
      {dropdowns.map((dd) => (
        <div key={dd.key} className="dropdown">
          <button
            type="button"
            data-bs-toggle="dropdown"
            className={`inline-flex items-center gap-2 px-3 py-2 border rounded text-[14px] bg-white ${dd.active ? "border-[#0ac79e] text-[#0ac79e]" : "border-[#e7e7e7] text-[#646B72] hover:border-[#0ac79e]"}`}
          >
            {dd.label}
            <i className="ti ti-chevron-down text-[14px]" />
          </button>
          <ul className="dropdown-menu dropdown-menu-end p-2" style={{ maxHeight: 240, overflowY: "auto" }}>
            {dd.active && (
              <li>
                <button type="button" className="dropdown-item rounded-1 text-[#dc3545]" onClick={() => handleSelect(dd.key, undefined)}>
                  Clear filter
                </button>
              </li>
            )}
            {dd.items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`dropdown-item rounded-1 ${dd.active === item.id ? "fw-bold text-[#0ac79e]" : ""}`}
                  onClick={() => handleSelect(dd.key, item.id)}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
