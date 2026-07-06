"use client";

import FilterDropdown from "./FilterDropdown";
import type { LowStockFilterOption, LowStockFiltersState } from "./types";

type Props = {
  branches: LowStockFilterOption[];
  warehouses: LowStockFilterOption[];
  categories: LowStockFilterOption[];
  products: LowStockFilterOption[];
  filters: LowStockFiltersState;
  onFilterChange: (key: keyof LowStockFiltersState, value: string | undefined) => void;
};

export default function LowStocksFilters({
  branches,
  warehouses,
  categories,
  products,
  filters,
  onFilterChange,
}: Props) {
  return (
    <div className="flex items-center flex-wrap gap-2">
      <FilterDropdown
        label="Warehouse"
        options={warehouses}
        value={filters.warehouse}
        onChange={(value) => onFilterChange("warehouse", value)}
      />
      <FilterDropdown
        label="Store"
        options={branches}
        value={filters.branch}
        onChange={(value) => onFilterChange("branch", value)}
      />
      <FilterDropdown
        label="Category"
        options={categories}
        value={filters.category}
        onChange={(value) => onFilterChange("category", value)}
      />
      <FilterDropdown
        label="Product"
        options={products}
        value={filters.product}
        onChange={(value) => onFilterChange("product", value)}
      />
    </div>
  );
}
