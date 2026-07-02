"use client";

import { useState, useEffect, useCallback } from "react";
import { getAccessToken } from "@/lib/auth-session";
import {
  fetchBrands,
  createBrand,
  updateBrand,
  deleteBrand,
  type Brand,
  type CreateBrandPayload,
  type UpdateBrandPayload,
} from "@/lib/inventory";

export function useBrandList() {
  const [dataSource, setDataSource] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await fetchBrands(getAccessToken());
    if (result.ok && result.body.data) {
      setDataSource(Array.isArray(result.body.data) ? result.body.data : []);
    } else {
      setError(result.body.message ?? "Failed to load brands.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addBrand = useCallback(
    async (payload: CreateBrandPayload): Promise<boolean> => {
      const result = await createBrand(payload, getAccessToken());
      if (result.ok) {
        await load();
        return true;
      }
      return false;
    },
    [load],
  );

  const editBrand = useCallback(
    async (id: string, payload: UpdateBrandPayload): Promise<boolean> => {
      const result = await updateBrand(id, payload, getAccessToken());
      if (result.ok) {
        await load();
        return true;
      }
      return false;
    },
    [load],
  );

  const removeBrand = useCallback(
    async (id: string): Promise<boolean> => {
      const result = await deleteBrand(id, getAccessToken());
      if (result.ok) {
        await load();
        return true;
      }
      return false;
    },
    [load],
  );

  return { dataSource, loading, error, reload: load, addBrand, editBrand, removeBrand };
}
