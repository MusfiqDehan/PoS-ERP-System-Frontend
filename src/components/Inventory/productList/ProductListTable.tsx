"use client";

import { useMemo } from "react";
import Table from "@/core/common/pagination/datatable";
import { makeProductListColumns } from "./columns";
import ProductListFilters, { type ProductFilters } from "./ProductListFilters";
import type { ProductListRecord } from "./types";
import type { PaginationMeta } from "@/lib/api";

type FilterOption = { id: string; name: string };

type Props = {
  dataSource: ProductListRecord[];
  loading: boolean;
  error: string | null;
  onSelectForDelete: (r: ProductListRecord) => void;
  categories: FilterOption[];
  brands: FilterOption[];
  filters: ProductFilters;
  onFilterChange: (filters: ProductFilters) => void;
  onSearchChange: (search: string) => void;
  searchValue: string;
  pagination?: PaginationMeta;
  onNextPage?: () => void;
  onPrevPage?: () => void;
};

export default function ProductListTable({
  dataSource, loading, error, onSelectForDelete,
  categories, brands, filters, onFilterChange,
  onSearchChange, searchValue,
  pagination, onNextPage, onPrevPage,
}: Props) {
  const columns = useMemo(() => makeProductListColumns({ onSelectForDelete }), [onSelectForDelete]);
  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <div className="flex items-center justify-between flex-wrap gap-3 p-4 border-b border-[#f1f1f1]">
        <div className="search-set">
          <div className="search-input">
            <input
              type="text"
              placeholder="Search products..."
              className="form-control form-control-sm"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <span className="btn btn-searchset">
              <i className="ti ti-search" />
            </span>
          </div>
        </div>
      </div>
      <ProductListFilters
        categories={categories}
        brands={brands}
        filters={filters}
        onFilterChange={onFilterChange}
      />
      <div className="overflow-x-auto">
        {error ? (
          <div className="p-6 text-center text-[#646B72]">
            <i className="ti ti-alert-circle text-[#dc3545] text-2xl mb-2 block" />
            <p>{error}</p>
          </div>
        ) : (
          <Table columns={columns} dataSource={dataSource} props={{ loading }} />
        )}
      </div>
      {pagination && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#f1f1f1]">
          <span className="text-[13px] text-[#646B72]">
            Showing {dataSource.length} items per page
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              disabled={!pagination.has_previous}
              onClick={onPrevPage}
            >
              <i className="ti ti-chevron-left" /> Previous
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              disabled={!pagination.has_next}
              onClick={onNextPage}
            >
              Next <i className="ti ti-chevron-right" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
