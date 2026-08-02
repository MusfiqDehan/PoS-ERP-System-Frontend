"use client";

import CommonFooter from "@/core/common/footer/commonFooter";
import { all_routes } from "@/data/all_routes";
import { Download, Eye } from "react-feather";
import Link from "next/link";
import Table from "@/core/common/pagination/datatable";
import CollapesIcon from "@/core/common/tooltip-content/collapes";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import TooltipIcons from "@/core/common/tooltip-content/tooltipIcons";
import { useProductList } from "@/hooks/inventory/useProductList";
import ProductListFilters from "@/components/Inventory/productList/ProductListFilters";
import type { ProductDisplay } from "@/lib/inventory";

export default function ProductsComponent() {
  const route = all_routes;
  const {
    dataSource, loading, error,
    categories, brands, filters, applyFilters,
    searchInput, setSearchInput,
    pagination, goNextPage, goPrevPage,
  } = useProductList();

  const columns = [
    {
      title: "SKU",
      dataIndex: "sku",
      sorter: (a: ProductDisplay, b: ProductDisplay) => a.sku.localeCompare(b.sku),
    },
    {
      title: "Product Name",
      dataIndex: "name",
      render: (text: string) => (
        <div className="d-flex align-items-center">
          <Link href="#">{text}</Link>
        </div>
      ),
      sorter: (a: ProductDisplay, b: ProductDisplay) => a.name.localeCompare(b.name),
    },
    {
      title: "Category",
      dataIndex: "category_name",
      sorter: (a: ProductDisplay, b: ProductDisplay) => a.category_name.localeCompare(b.category_name),
    },
    {
      title: "Brand",
      dataIndex: "brand_name",
      sorter: (a: ProductDisplay, b: ProductDisplay) => a.brand_name.localeCompare(b.brand_name),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a: ProductDisplay, b: ProductDisplay) => parseFloat(a.price) - parseFloat(b.price),
    },
    {
      title: "Unit",
      dataIndex: "unit_name",
      sorter: (a: ProductDisplay, b: ProductDisplay) => a.unit_name.localeCompare(b.unit_name),
    },
    {
      title: "",
      dataIndex: "action",
      render: (_: unknown, record: ProductDisplay) => (
        <div className="edit-delete-action">
          <Link className="me-2 edit-icon p-2" href={route.productdetails}>
            <Eye className="action-eye" />
          </Link>
          <Link className="me-2 p-2" href={route.editproduct}>
            <i data-feather="edit" className="feather-edit" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4 className="fw-bold">Product List</h4>
                <h6>Manage your products</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <TooltipIcons />
              <RefreshIcon />
              <CollapesIcon />
            </ul>
            <div className="page-btn">
              <Link href={route.addproduct} className="btn btn-primary">
                <i className="ti ti-circle-plus me-1"></i>
                Add Product
              </Link>
            </div>
            <div className="page-btn import">
              <Link
                href="#"
                className="btn btn-primary color"
                data-bs-toggle="modal"
                data-bs-target="#view-notes"
              >
                <Download className="me-2" />
                Import Product
              </Link>
            </div>
          </div>
          <div className="card table-list-card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <div className="search-set">
                <div className="search-input">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="form-control form-control-sm"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
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
              onFilterChange={applyFilters}
            />
            <div className="card-body">
              <div className="table-responsive">
                {error ? (
                  <div className="p-6 text-center text-muted">{error}</div>
                ) : (
                  <Table columns={columns} dataSource={dataSource} props={{ loading }} />
                )}
              </div>
              {pagination && (
                <div className="d-flex align-items-center justify-content-between px-3 py-3 border-top">
                  <span className="text-muted small">
                    Showing {dataSource.length} items per page
                  </span>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      disabled={!pagination.has_previous}
                      onClick={goPrevPage}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      disabled={!pagination.has_next}
                      onClick={goNextPage}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <CommonFooter />
      </div>
    </div>
  );
}
