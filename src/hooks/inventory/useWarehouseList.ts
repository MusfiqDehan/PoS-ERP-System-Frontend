"use client";

import { useState, useEffect, useCallback } from "react";
import { getAccessToken } from "@/lib/auth-session";
import { extractListItems } from "@/lib/api";
import {
  fetchWarehouses,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  type Warehouse,
  type CreateWarehousePayload,
  type UpdateWarehousePayload,
} from "@/lib/warehouses";

export function useWarehouseList() {
  const [dataSource, setDataSource] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await fetchWarehouses(getAccessToken());
    if (result.ok && result.body.data) {
      setDataSource(extractListItems<Warehouse>(result.body.data));
    } else {
      setError(result.body.message ?? "Failed to load warehouses.");
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const addWarehouse = useCallback(async (payload: CreateWarehousePayload): Promise<boolean> => {
    const result = await createWarehouse(payload, getAccessToken());
    if (result.ok) { await load(); return true; }
    return false;
  }, [load]);

  const editWarehouse = useCallback(async (id: string, payload: UpdateWarehousePayload): Promise<boolean> => {
    const result = await updateWarehouse(id, payload, getAccessToken());
    if (result.ok) { await load(); return true; }
    return false;
  }, [load]);

  const removeWarehouse = useCallback(async (id: string): Promise<boolean> => {
    const result = await deleteWarehouse(id, getAccessToken());
    if (result.ok) { await load(); return true; }
    return false;
  }, [load]);

  return { dataSource, loading, error, reload: load, addWarehouse, editWarehouse, removeWarehouse };
}
