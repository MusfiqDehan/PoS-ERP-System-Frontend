"use client";

import { useState, useEffect, useCallback } from "react";
import { getAccessToken } from "@/lib/auth-session";
import { extractListItems } from "@/lib/api";
import {
  fetchStockAdjustments,
  createStockAdjustment,
  type StockAdjustment,
  type CreateStockAdjustmentPayload,
} from "@/lib/stock";
import { fetchWarehouses, type Warehouse } from "@/lib/warehouses";
import { fetchBranches, type Branch } from "@/lib/branches";
import { fetchProducts } from "@/lib/inventory";

export type BranchOption = { value: string; label: string };
export type WarehouseOption = { value: string; label: string };
export type ProductOption = { value: string; label: string };

export function useStockAdjustments() {
  const [dataSource, setDataSource] = useState<StockAdjustment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [branches, setBranches] = useState<BranchOption[]>([]);
  const [warehouses, setWarehouses] = useState<WarehouseOption[]>([]);
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [filterBranch, setFilterBranch] = useState("");

  const loadAdjustments = useCallback(async (branch?: string) => {
    setLoading(true);
    setError(null);
    const params = branch ? { branch } : undefined;
    const result = await fetchStockAdjustments(params, getAccessToken());
    if (result.ok && result.body.data) {
      setDataSource(extractListItems<StockAdjustment>(result.body.data));
    } else {
      setError(result.body.message ?? "Failed to load stock adjustments.");
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

  useEffect(() => {
    loadAdjustments(filterBranch || undefined);
  }, [filterBranch, loadAdjustments]);

  useEffect(() => {
    loadDropdowns();
  }, [loadDropdowns]);

  const createAdjustment = useCallback(
    async (payload: CreateStockAdjustmentPayload): Promise<boolean> => {
      setSaving(true);
      const result = await createStockAdjustment(payload, getAccessToken());
      setSaving(false);
      if (result.ok) {
        await loadAdjustments(filterBranch || undefined);
        return true;
      }
      setError(result.body.message ?? "Failed to create adjustment.");
      return false;
    },
    [filterBranch, loadAdjustments],
  );

  return {
    dataSource,
    loading,
    error,
    saving,
    branches,
    warehouses,
    products,
    filterBranch,
    setFilterBranch,
    reload: () => loadAdjustments(filterBranch || undefined),
    createAdjustment,
  };
}
