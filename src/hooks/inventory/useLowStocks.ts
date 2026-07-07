"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { getAccessToken } from "@/lib/auth-session";
import { extractListItems } from "@/lib/api";
import {
  fetchLowStocks,
  fetchCategories,
  fetchProducts,
  type LowStockRow,
  type Category,
  type Product,
} from "@/lib/inventory";
import { fetchBranches, type Branch } from "@/lib/branches";
import { fetchWarehouses, type Warehouse } from "@/lib/warehouses";
import type {
  LowStockFilterOption,
  LowStockFiltersState,
  LowStockRecord,
  LowStockTab,
} from "@/components/Inventory/low-stocks/types";

function buildRowId(row: LowStockRow): string {
  return `${row.product_id}:${row.branch_id ?? ""}:${row.warehouse_id ?? ""}`;
}

function enrichRows(
  rows: LowStockRow[],
  branchMap: Map<string, string>,
  warehouseMap: Map<string, string>,
  productCategoryMap: Map<string, { categoryId: string; categoryName: string }>,
): LowStockRecord[] {
  return rows.map((row) => {
    const category = productCategoryMap.get(row.product_id);
    return {
      ...row,
      id: buildRowId(row),
      branch_name: row.branch_id ? branchMap.get(row.branch_id) ?? null : null,
      warehouse_name: row.warehouse_id ? warehouseMap.get(row.warehouse_id) ?? null : null,
      category_id: category?.categoryId ?? null,
      category_name: category?.categoryName ?? null,
    };
  });
}

export function useLowStocks() {
  const [rawRows, setRawRows] = useState<LowStockRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<LowStockTab>("low");
  const [filters, setFilters] = useState<LowStockFiltersState>({});

  const [branches, setBranches] = useState<LowStockFilterOption[]>([]);
  const [warehouses, setWarehouses] = useState<LowStockFilterOption[]>([]);
  const [categories, setCategories] = useState<LowStockFilterOption[]>([]);
  const [products, setProducts] = useState<LowStockFilterOption[]>([]);

  const [branchMap, setBranchMap] = useState<Map<string, string>>(new Map());
  const [warehouseMap, setWarehouseMap] = useState<Map<string, string>>(new Map());
  const [productCategoryMap, setProductCategoryMap] = useState<
    Map<string, { categoryId: string; categoryName: string }>
  >(new Map());

  const loadLookups = useCallback(async () => {
    const token = getAccessToken();
    const [branchRes, warehouseRes, categoryRes, productRes] = await Promise.all([
      fetchBranches(token),
      fetchWarehouses(token),
      fetchCategories(token),
      fetchProducts(token),
    ]);

    if (branchRes.ok && branchRes.body.data) {
      const items = Array.isArray(branchRes.body.data)
        ? (branchRes.body.data as Branch[])
        : extractListItems<Branch>(branchRes.body.data);
      setBranches(items.map((b) => ({ id: b.id, name: b.name })));
      setBranchMap(new Map(items.map((b) => [b.id, b.name])));
    }

    if (warehouseRes.ok && warehouseRes.body.data) {
      const items = extractListItems<Warehouse>(warehouseRes.body.data);
      setWarehouses(items.map((w) => ({ id: w.id, name: w.name })));
      setWarehouseMap(new Map(items.map((w) => [w.id, w.name])));
    }

    if (categoryRes.ok && categoryRes.body.data) {
      const items = extractListItems<Category>(categoryRes.body.data);
      setCategories(items.map((c) => ({ id: c.id, name: c.name })));
    }

    if (productRes.ok && productRes.body.data) {
      const items = extractListItems<Product>(productRes.body.data);
      setProducts(items.map((p) => ({ id: p.id, name: p.name })));

      const catItems =
        categoryRes.ok && categoryRes.body.data
          ? extractListItems<Category>(categoryRes.body.data)
          : [];
      const catNameMap = new Map(catItems.map((c) => [c.id, c.name]));
      setProductCategoryMap(
        new Map(
          items.map((p) => [
            p.id,
            {
              categoryId: p.category,
              categoryName: catNameMap.get(p.category) ?? "",
            },
          ]),
        ),
      );
    }
  }, []);

  const loadRows = useCallback(async (branch?: string) => {
    setLoading(true);
    setError(null);
    const result = await fetchLowStocks(getAccessToken(), branch ? { branch } : undefined);
    if (result.ok && result.body.data) {
      setRawRows(extractListItems<LowStockRow>(result.body.data));
    } else {
      setError(result.body.message ?? "Failed to load low-stock items.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadLookups();
  }, [loadLookups]);

  useEffect(() => {
    loadRows(filters.branch);
  }, [filters.branch, loadRows]);

  const enrichedRows = useMemo(
    () => enrichRows(rawRows, branchMap, warehouseMap, productCategoryMap),
    [rawRows, branchMap, warehouseMap, productCategoryMap],
  );

  const dataSource = useMemo(() => {
    let rows = enrichedRows;

    if (activeTab === "out") {
      rows = rows.filter((row) => Number(row.quantity) === 0);
    } else {
      rows = rows.filter((row) => Number(row.quantity) > 0);
    }

    if (filters.warehouse) {
      rows = rows.filter((row) => row.warehouse_id === filters.warehouse);
    }
    if (filters.category) {
      rows = rows.filter((row) => row.category_id === filters.category);
    }
    if (filters.product) {
      rows = rows.filter((row) => row.product_id === filters.product);
    }

    if (filters.ordering) {
      const sorted = [...rows];
      switch (filters.ordering) {
        case "name":
          sorted.sort((a, b) => a.product_name.localeCompare(b.product_name));
          break;
        case "-name":
          sorted.sort((a, b) => b.product_name.localeCompare(a.product_name));
          break;
        case "quantity":
          sorted.sort((a, b) => Number(a.quantity) - Number(b.quantity));
          break;
        case "-quantity":
          sorted.sort((a, b) => Number(b.quantity) - Number(a.quantity));
          break;
        default:
          break;
      }
      return sorted;
    }

    return rows;
  }, [enrichedRows, activeTab, filters]);

  const updateFilter = useCallback(
    (key: keyof LowStockFiltersState, value: string | undefined) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value === prev[key] ? undefined : value,
      }));
    },
    [],
  );

  return {
    dataSource,
    loading,
    error,
    activeTab,
    setActiveTab,
    filters,
    updateFilter,
    branches,
    warehouses,
    categories,
    products,
    reload: () => loadRows(filters.branch),
  };
}
