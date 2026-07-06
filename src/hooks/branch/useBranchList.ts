"use client";

import { useState, useEffect, useCallback } from "react";
import { getAccessToken } from "@/lib/auth-session";
import { extractListItems } from "@/lib/api";
import {
  fetchBranches,
  createBranch,
  updateBranch,
  deleteBranch,
  type Branch,
  type CreateBranchPayload,
  type UpdateBranchPayload,
} from "@/lib/branches";

export function useBranchList() {
  const [dataSource, setDataSource] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await fetchBranches(getAccessToken());
    if (result.ok && result.body.data) {
      const data = result.body.data;
      setDataSource(Array.isArray(data) ? data : extractListItems<Branch>(data));
    } else {
      setError(result.body.message ?? "Failed to load branches.");
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const addBranch = useCallback(async (payload: CreateBranchPayload): Promise<{ ok: boolean; error?: string }> => {
    const result = await createBranch(payload, getAccessToken());
    if (result.ok) { await load(); return { ok: true }; }
    const msg = result.body.message ?? (result.body.errors ? JSON.stringify(result.body.errors) : "Failed to create branch.");
    return { ok: false, error: msg };
  }, [load]);

  const editBranch = useCallback(async (id: string, payload: UpdateBranchPayload): Promise<boolean> => {
    const result = await updateBranch(id, payload, getAccessToken());
    if (result.ok) { await load(); return true; }
    return false;
  }, [load]);

  const removeBranch = useCallback(async (id: string): Promise<boolean> => {
    const result = await deleteBranch(id, getAccessToken());
    if (result.ok) { await load(); return true; }
    return false;
  }, [load]);

  return { dataSource, loading, error, reload: load, addBranch, editBranch, removeBranch };
}
