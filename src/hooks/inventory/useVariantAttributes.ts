"use client";

import { useState, useEffect, useCallback } from "react";
import { getAccessToken } from "@/lib/auth-session";
import { extractListItems } from "@/lib/api";
import {
  fetchVariantAttributes,
  createVariantAttribute,
  updateVariantAttribute,
  deleteVariantAttribute,
  type VariantAttribute,
  type CreateVariantAttributePayload,
  type UpdateVariantAttributePayload,
} from "@/lib/inventory";

export function useVariantAttributes() {
  const [dataSource, setDataSource] = useState<VariantAttribute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await fetchVariantAttributes(getAccessToken());
    if (result.ok && result.body.data) {
      setDataSource(extractListItems<VariantAttribute>(result.body.data));
    } else {
      setError(result.body.message ?? "Failed to load variant attributes.");
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const add = useCallback(async (p: CreateVariantAttributePayload): Promise<boolean> => {
    const r = await createVariantAttribute(p, getAccessToken());
    if (r.ok) { await load(); return true; }
    return false;
  }, [load]);

  const edit = useCallback(async (id: string, p: UpdateVariantAttributePayload): Promise<boolean> => {
    const r = await updateVariantAttribute(id, p, getAccessToken());
    if (r.ok) { await load(); return true; }
    return false;
  }, [load]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    const r = await deleteVariantAttribute(id, getAccessToken());
    if (r.ok) { await load(); return true; }
    return false;
  }, [load]);

  return { dataSource, loading, error, reload: load, addVariantAttribute: add, editVariantAttribute: edit, removeVariantAttribute: remove };
}
