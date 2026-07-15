/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { memo, useCallback, useMemo, useState } from "react";
import Table from "antd/es/table";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

type DatatableProps = {
  props?: unknown;
  columns: unknown;
  dataSource: unknown;
  searchText?: string;
  className?: string;
  footer?: React.ReactNode | (() => React.ReactNode);
  rowKey?: string | ((record: any) => React.Key);
  /** When false, hides antd row selection checkboxes. Default true. */
  Selection?: boolean;
};

const Datatable = ({
  props,
  columns,
  dataSource,
  searchText,
  className,
  footer,
  rowKey,
  Selection = true,
}: DatatableProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [internalSearch, setInternalSearch] = useState("");
  const debouncedInternalSearch = useDebouncedValue(internalSearch, 300);

  const safeSource = useMemo(
    () => (Array.isArray(dataSource) ? dataSource : []),
    [dataSource],
  );

  const debouncedExternalSearch = useDebouncedValue(
    searchText !== undefined ? searchText : "",
    300,
  );

  const activeSearchText =
    searchText !== undefined ? debouncedExternalSearch : debouncedInternalSearch;

  const filteredDataSource = useMemo(() => {
    const query = activeSearchText.trim();
    if (!query) return safeSource;

    const lower = query.toLowerCase();
    return safeSource.filter((record: Record<string, unknown>) =>
      Object.values(record).some((field) =>
        String(field).toLowerCase().includes(lower),
      ),
    );
  }, [safeSource, activeSearchText]);

  const onSelectChange = useCallback((newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  }, []);

  const rowSelection = useMemo(
    () => ({
      selectedRowKeys,
      onChange: onSelectChange,
    }),
    [selectedRowKeys, onSelectChange],
  );

  const pagination = useMemo(
    () => ({
      locale: { items_per_page: "" },
      nextIcon: (
        <span>
          <i className="fa fa-angle-right" />
        </span>
      ),
      prevIcon: (
        <span>
          <i className="fa fa-angle-left" />
        </span>
      ),
      defaultPageSize: 10,
      showSizeChanger: true,
      pageSizeOptions: ["10", "20", "30"],
    }),
    [],
  );

  return (
    <>
      {searchText === undefined && (
        <div className="search-set table-search-set">
          <div className="search-input">
            <a href="#" className="btn btn-searchset">
              <i className="ti ti-search fs-14 feather-search" />
            </a>
            <div id="DataTables_Table_0_filter" className="dataTables_filter">
              <label>
                {" "}
                <input
                  type="search"
                  onChange={(e) => setInternalSearch(e.target.value)}
                  className="form-control form-control-sm"
                  placeholder="Search"
                  aria-controls="DataTables_Table_0"
                />
              </label>
            </div>
          </div>
        </div>
      )}

      <Table
        key={props as React.Key}
        className={["table datanew dataTable no-footer", className]
          .filter(Boolean)
          .join(" ")}
        rowSelection={Selection ? rowSelection : undefined}
        columns={columns as never}
        dataSource={filteredDataSource}
        rowKey={
          (rowKey as never) ??
          ((record) => (record as { id: React.Key }).id)
        }
        footer={footer as never}
        pagination={pagination}
      />
    </>
  );
};

export default memo(Datatable);
