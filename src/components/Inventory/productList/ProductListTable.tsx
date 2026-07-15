"use client";

import { memo, useMemo } from "react";
import Table from "@/core/common/pagination/datatable";
import { makeProductListColumns } from "./columns";
import type { ProductListRecord } from "./types";
import type { PaginationMeta } from "@/lib/api";

type Props = {
  dataSource: ProductListRecord[];
  loading: boolean;
  error: string | null;
  onSelectForDelete: (r: ProductListRecord) => void;
  pagination?: PaginationMeta;
  onNextPage?: () => void;
  onPrevPage?: () => void;
};

export default memo(function ProductListTable({
  dataSource, loading, error, onSelectForDelete,
  pagination, onNextPage, onPrevPage,
}: Props) {
  const columns = useMemo(() => makeProductListColumns({ onSelectForDelete }), [onSelectForDelete]);
  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
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
});
