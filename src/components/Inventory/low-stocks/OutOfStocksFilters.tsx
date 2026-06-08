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
                <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                  <FilterDropdown label="Warehouse" options={warehouseFilterOptions} />
                  <FilterDropdown label="Store" options={storeFilterOptions} />
                  <FilterDropdown label="Category" options={categoryFilterOptions} />
                  <FilterDropdown label="Product" options={productFilterOptions} />
                  <FilterDropdown
                    label="Sort By : Last 7 Days"
                    options={sortFilterOptions}
                    className="dropdown"
                  />
                </div>
  );
}
