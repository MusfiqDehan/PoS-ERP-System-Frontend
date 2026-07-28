"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { getAccessToken } from "@/lib/auth-session";
import { extractListItems, extractPagination, type PaginationMeta } from "@/lib/api";
import {
  fetchProducts,
  fetchCategories,
  fetchBrands,
  fetchUnits,
  deleteProduct,
  type Product,
  type ProductDisplay,
  type Category,
  type Brand,
  type ProductListParams,
} from "@/lib/inventory";

export type ProductListFiltersState = {
  search?: string;
  category?: string;
  brand?: string;
  ordering?: string;
};

export function useProductList() {
  const [raw, setRaw] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [catMap, setCatMap] = useState<Map<string, string>>(new Map());
  const [brandMap, setBrandMap] = useState<Map<string, string>>(new Map());
  const [unitMap, setUnitMap] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationMeta | undefined>();
  const [filters, setFilters] = useState<ProductListFiltersState>({});
  const [cursor, setCursor] = useState<string | undefined>();

  const loadLookups = useCallback(async () => {
    const token = getAccessToken();
    const [catRes, brandRes, unitRes] = await Promise.all([
      fetchCategories(token),
      fetchBrands(token),
      fetchUnits(token),
    ]);
    if (catRes.ok && catRes.body.data) {
      const cats = extractListItems<Category>(catRes.body.data);
      setCategories(cats);
      setCatMap(new Map(cats.map(c => [c.id, c.name])));
    }
    if (brandRes.ok && brandRes.body.data) {
      const brs = extractListItems<Brand>(brandRes.body.data);
      setBrands(brs);
      setBrandMap(new Map(brs.map(b => [b.id, b.name])));
    }
    if (unitRes.ok && unitRes.body.data) {
      setUnitMap(new Map(extractListItems<{ id: string; name: string }>(unitRes.body.data).map(u => [u.id, u.name])));
    }
  }, []);

  const loadProducts = useCallback(async (currentCursor?: string) => {
    setLoading(true);
    setError(null);
    const token = getAccessToken();
    const params: ProductListParams = {};
    if (filters.search) params.search = filters.search;
    if (filters.category) params.category = filters.category;
    if (filters.brand) params.brand = filters.brand;
    if (filters.ordering) params.ordering = filters.ordering;
    if (currentCursor) params.cursor = currentCursor;
    params.page_size = 10;

    const prodRes = await fetchProducts(token, params);
    if (prodRes.ok && prodRes.body.data) {
      setRaw(extractListItems<Product>(prodRes.body.data));
      setPagination(extractPagination(prodRes.body.data));
    } else {
      setError(prodRes.body.message ?? "Failed to load products.");
    }
    setLoading(false);
  }, [filters]);

  useEffect(() => { loadLookups(); }, [loadLookups]);
  useEffect(() => { loadProducts(cursor); }, [loadProducts, cursor]);

  const dataSource: ProductDisplay[] = useMemo(() =>
    raw.map(p => ({
      ...p,
      category_name: catMap.get(p.category) ?? p.category.slice(0, 8),
      brand_name: brandMap.get(p.brand ?? "") ?? (p.brand?.slice(0, 8) ?? "—"),
      unit_name: unitMap.get(p.unit) ?? p.unit.slice(0, 8),
    })), [raw, catMap, brandMap, unitMap]);

  const applyFilters = useCallback((next: ProductListFiltersState) => {
    setFilters(next);
    setCursor(undefined);
  }, []);

  const goNextPage = useCallback(() => {
    if (pagination?.next_cursor) setCursor(pagination.next_cursor);
  }, [pagination]);

  const goPrevPage = useCallback(() => {
    if (pagination?.previous_cursor) setCursor(pagination.previous_cursor);
  }, [pagination]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    const r = await deleteProduct(id, getAccessToken());
    if (r.ok) { await loadProducts(cursor); return true; }
    return false;
  }, [loadProducts, cursor]);

  return {
    dataSource,
    loading,
    error,
    reload: () => loadProducts(cursor),
    removeProduct: remove,
    categories,
    brands,
    filters,
    applyFilters,
    pagination,
    goNextPage,
    goPrevPage,
  };
}
