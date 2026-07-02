"use client";

import { useState, useEffect, useCallback } from "react";
import { getAccessToken } from "@/lib/auth-session";
import {
  fetchWarranties,
  createWarranty,
  updateWarranty,
  deleteWarranty,
  type Warranty,
  type CreateWarrantyPayload,
  type UpdateWarrantyPayload,
} from "@/lib/inventory";

export function useWarranties() {
  const [dataSource, setDataSource] = useState<Warranty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await fetchWarranties(getAccessToken());
    if (result.ok && result.body.data) {
      setDataSource(Array.isArray(result.body.data) ? result.body.data : []);
    } else {
      setError(result.body.message ?? "Failed to load warranties.");
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const add = useCallback(async (p: CreateWarrantyPayload): Promise<boolean> => {
    const r = await createWarranty(p, getAccessToken());
    if (r.ok) { await load(); return true; }
    return false;
  }, [load]);

  const edit = useCallback(async (id: string, p: UpdateWarrantyPayload): Promise<boolean> => {
    const r = await updateWarranty(id, p, getAccessToken());
    if (r.ok) { await load(); return true; }
    return false;
  }, [load]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    const r = await deleteWarranty(id, getAccessToken());
    if (r.ok) { await load(); return true; }
    return false;
  }, [load]);

  return { dataSource, loading, error, reload: load, addWarranty: add, editWarranty: edit, removeWarranty: remove };
}
