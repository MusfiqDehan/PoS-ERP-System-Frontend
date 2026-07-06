"use client";

import { useState, useEffect, useCallback } from "react";
import { getAccessToken } from "@/lib/auth-session";
import { extractListItems } from "@/lib/api";
import {
  fetchStockTransfers,
  createStockTransfer,
  runTransferAction,
  type StockTransfer,
  type CreateStockTransferPayload,
  type TransferAction,
} from "@/lib/stock";
import { fetchWarehouses, type Warehouse } from "@/lib/warehouses";
import { fetchBranches, type Branch } from "@/lib/branches";
import { fetchProducts } from "@/lib/inventory";

export type BranchOption = { value: string; label: string };
export type WarehouseOption = { value: string; label: string };
export type ProductOption = { value: string; label: string };

export function useStockTransfers() {
  const [dataSource, setDataSource] = useState<StockTransfer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [branches, setBranches] = useState<BranchOption[]>([]);
  const [warehouses, setWarehouses] = useState<WarehouseOption[]>([]);
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [filterBranch, setFilterBranch] = useState("");

  const loadTransfers = useCallback(async (branch?: string) => {
    setLoading(true);
    setError(null);
    const params = branch ? { branch } : undefined;
    const result = await fetchStockTransfers(params, getAccessToken());
    if (result.ok && result.body.data) {
      setDataSource(extractListItems<StockTransfer>(result.body.data));
    } else {
      setError(result.body.message ?? "Failed to load stock transfers.");
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
    loadTransfers(filterBranch || undefined);
  }, [filterBranch, loadTransfers]);

  useEffect(() => {
    loadDropdowns();
  }, [loadDropdowns]);

  const createTransfer = useCallback(
    async (payload: CreateStockTransferPayload): Promise<boolean> => {
      setSaving(true);
      const result = await createStockTransfer(payload, getAccessToken());
      setSaving(false);
      if (result.ok) {
        await loadTransfers(filterBranch || undefined);
        return true;
      }
      setError(result.body.message ?? "Failed to create transfer.");
      return false;
    },
    [filterBranch, loadTransfers],
  );

  const runAction = useCallback(
    async (
      id: string,
      action: TransferAction,
      body?: Record<string, unknown>,
    ): Promise<boolean> => {
      setSaving(true);
      const result = await runTransferAction(id, action, body, getAccessToken());
      setSaving(false);
      if (result.ok) {
        await loadTransfers(filterBranch || undefined);
        return true;
      }
      setError(result.body.message ?? `Failed to ${action} transfer.`);
      return false;
    },
    [filterBranch, loadTransfers],
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
    reload: () => loadTransfers(filterBranch || undefined),
    createTransfer,
    approveTransfer: (id: string) => runAction(id, "approve"),
    rejectTransfer: (id: string) => runAction(id, "reject"),
    shipTransfer: (id: string) => runAction(id, "ship"),
    receiveTransfer: (id: string) => runAction(id, "receive"),
    partialApproveTransfer: (id: string, lineQuantities: Record<string, string>) =>
      runAction(id, "partial_approve", { line_quantities: lineQuantities }),
  };
}
