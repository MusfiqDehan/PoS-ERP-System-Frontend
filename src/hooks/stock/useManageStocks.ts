"use client";

import { useState, useEffect, useCallback } from "react";
import { getAccessToken } from "@/lib/auth-session";
import { extractListItems } from "@/lib/api";
import {
  fetchStockLevels,
  createStockLevel,
  createStockAdjustment,
  deleteStockLevel,
  type StockLevel,
  type CreateStockLevelPayload,
  type CreateStockAdjustmentPayload,
  type StockLevelParams,
} from "@/lib/stock";
import { fetchWarehouses, type Warehouse } from "@/lib/warehouses";
import { fetchBranches, type Branch } from "@/lib/branches";
import { fetchProducts } from "@/lib/inventory";

export type ProductOption = { value: string; label: string };
export type BranchOption = { value: string; label: string };
export type WarehouseOption = { value: string; label: string };

export function useManageStocks() {
  const [dataSource, setDataSource] = useState<StockLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [branches, setBranches] = useState<BranchOption[]>([]);
  const [warehouses, setWarehouses] = useState<WarehouseOption[]>([]);
  const [products, setProducts] = useState<ProductOption[]>([]);

  const [filterBranch, setFilterBranch] = useState<string>("");
  const [filterWarehouse, setFilterWarehouse] = useState<string>("");

  const loadStockLevels = useCallback(async (params?: StockLevelParams) => {
    setLoading(true);
    setError(null);
    const result = await fetchStockLevels(params, getAccessToken());
    if (result.ok && result.body.data) {
      setDataSource(extractListItems<StockLevel>(result.body.data));
    } else {
      setError(result.body.message ?? "Failed to load stock levels.");
    }
    setLoading(false);
  }, []);

  const loadDropdowns = useCallback(async () => {
    const token = getAccessToken();
    const [brRes, whRes, prRes] = await Promise.all([
      fetchBranches(token),
      fetchWarehouses(token),
      fetchProducts(token),
    ]);
    if (brRes.ok && brRes.body.data) {
      const items = Array.isArray(brRes.body.data)
        ? (brRes.body.data as Branch[])
        : extractListItems<Branch>(brRes.body.data);
      setBranches(items.map((b) => ({ value: b.id, label: b.name })));
    }
    if (whRes.ok && whRes.body.data) {
      const items = extractListItems<Warehouse>(whRes.body.data);
      setWarehouses(items.map((w) => ({ value: w.id, label: w.name })));
    }
    if (prRes.ok && prRes.body.data) {
      const items = extractListItems<{ id: string; name: string }>(prRes.body.data);
      setProducts(items.map((p) => ({ value: p.id, label: p.name })));
    }
  }, []);

  useEffect(() => { loadStockLevels(); loadDropdowns(); }, [loadStockLevels, loadDropdowns]);

  const applyFilters = useCallback(() => {
    const params: StockLevelParams = {};
    if (filterBranch) params.branch = filterBranch;
    if (filterWarehouse) params.warehouse = filterWarehouse;
    loadStockLevels(params);
  }, [filterBranch, filterWarehouse, loadStockLevels]);

  useEffect(() => { applyFilters(); }, [filterBranch, filterWarehouse, applyFilters]);

  const addStockLevel = useCallback(async (payload: CreateStockLevelPayload): Promise<boolean> => {
    const result = await createStockLevel(payload, getAccessToken());
    if (result.ok) { await loadStockLevels(); return true; }
    return false;
  }, [loadStockLevels]);

  const adjustStock = useCallback(async (payload: CreateStockAdjustmentPayload): Promise<boolean> => {
    const result = await createStockAdjustment(payload, getAccessToken());
    if (result.ok) { await loadStockLevels(); return true; }
    return false;
  }, [loadStockLevels]);

  const removeStockLevel = useCallback(async (id: string): Promise<boolean> => {
    const result = await deleteStockLevel(id, getAccessToken());
    if (result.ok) { await loadStockLevels(); return true; }
    return false;
  }, [loadStockLevels]);

  return {
    dataSource,
    loading,
    error,
    branches,
    warehouses,
    products,
    filterBranch,
    setFilterBranch,
    filterWarehouse,
    setFilterWarehouse,
    reload: loadStockLevels,
    addStockLevel,
    adjustStock,
    removeStockLevel,
  };
}
