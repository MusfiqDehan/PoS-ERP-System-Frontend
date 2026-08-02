"use client";

import Table from "@/core/common/pagination/datatable";
import { posOrderColumns } from "./columns";
import PosOrderFilters from "./PosOrderFilters";
import { usePosOrders } from "@/hooks/sales/usePosOrders";
import type { PosOrderRecord } from "./types";

export default function PosOrderTable() {
  const {
    dataSource,
    loading,
    error,
    branches,
    filters,
    searchInput,
    setSearchInput,
    applyFilters,
    pagination,
    goNextPage,
    goPrevPage,
  } = usePosOrders();

  return (
    <div className="card table-list-card manage-stock">
      <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 border-0 pb-0">
        <div className="search-set">
          <div className="search-input">
            <input
              type="text"
              placeholder="Search by reference or customer..."
              className="form-control form-control-sm"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
            <span className="btn btn-searchset">
              <i className="ti ti-search" />
            </span>
          </div>
        </div>
      </div>
      <PosOrderFilters
        branches={branches}
        filters={filters}
        onFilterChange={applyFilters}
      />
      <div className="card-body">
        <div className="custom-datatable-filter table-responsive">
          {error ? (
            <div className="py-6 text-center text-[#646B72]">
              <i className="ti ti-alert-circle text-[#dc3545] text-2xl mb-2 block" />
              <p>{error}</p>
            </div>
          ) : (
            <Table
              columns={posOrderColumns}
              dataSource={dataSource as PosOrderRecord[]}
              props={{ loading }}
            />
          )}
        </div>
        {pagination && (
          <div className="flex items-center justify-between pt-3 border-t border-[#f1f1f1] mt-3">
            <span className="text-[13px] text-[#646B72]">
              Showing {dataSource.length} orders
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                disabled={!pagination.has_previous}
                onClick={goPrevPage}
              >
                <i className="ti ti-chevron-left" /> Previous
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                disabled={!pagination.has_next}
                onClick={goNextPage}
              >
                Next <i className="ti ti-chevron-right" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
