"use client";

import FilterDropdown from "./FilterDropdown";
import {
  categoryFilterOptions,
  productFilterOptions,
  sortFilterOptions,
  storeFilterOptions,
  warehouseFilterOptions,
} from "./filterOptions";

export default function OutOfStocksFilters() {
  return (
    <div className="flex items-center flex-wrap gap-2">
      <FilterDropdown label="Warehouse" options={warehouseFilterOptions} />
      <FilterDropdown label="Store" options={storeFilterOptions} />
      <FilterDropdown label="Category" options={categoryFilterOptions} />
      <FilterDropdown label="Product" options={productFilterOptions} />
      <FilterDropdown label="Sort By : Last 7 Days" options={sortFilterOptions} />
    </div>
  );
}
