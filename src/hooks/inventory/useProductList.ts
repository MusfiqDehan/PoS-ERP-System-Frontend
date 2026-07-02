"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { getAccessToken } from "@/lib/auth-session";
import {
  fetchProducts,
  fetchCategories,
  fetchBrands,
  fetchUnits,
  deleteProduct,
  type Product,
  type ProductDisplay,
} from "@/lib/inventory";

function ensureArray<T>(data: unknown): T[] {
  return Array.isArray(data) ? (data as T[]) : [];
}

export function useProductList() {
  const [raw, setRaw] = useState<Product[]>([]);
  const [catMap, setCatMap] = useState<Map<string, string>>(new Map());
  const [brandMap, setBrandMap] = useState<Map<string, string>>(new Map());
  const [unitMap, setUnitMap] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const token = getAccessToken();
    const [prodRes, catRes, brandRes, unitRes] = await Promise.all([
      fetchProducts(token),
      fetchCategories(token),
      fetchBrands(token),
      fetchUnits(token),
    ]);
    if (prodRes.ok && prodRes.body.data) {
      setRaw(ensureArray<Product>(prodRes.body.data));
    } else {
      setError(prodRes.body.message ?? "Failed to load products.");
    }
    if (catRes.ok && catRes.body.data) {
      setCatMap(new Map(ensureArray<{ id: string; name: string }>(catRes.body.data).map(c => [c.id, c.name])));
    }
    if (brandRes.ok && brandRes.body.data) {
      setBrandMap(new Map(ensureArray<{ id: string; name: string }>(brandRes.body.data).map(b => [b.id, b.name])));
    }
    if (unitRes.ok && unitRes.body.data) {
      setUnitMap(new Map(ensureArray<{ id: string; name: string }>(unitRes.body.data).map(u => [u.id, u.name])));
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const dataSource: ProductDisplay[] = useMemo(() =>
    raw.map(p => ({
      ...p,
      category_name: catMap.get(p.category) ?? p.category.slice(0, 8),
      brand_name: brandMap.get(p.brand) ?? p.brand.slice(0, 8),
      unit_name: unitMap.get(p.unit) ?? p.unit.slice(0, 8),
    })), [raw, catMap, brandMap, unitMap]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    const r = await deleteProduct(id, getAccessToken());
    if (r.ok) { await load(); return true; }
    return false;
  }, [load]);

  return { dataSource, loading, error, reload: load, removeProduct: remove };
}
