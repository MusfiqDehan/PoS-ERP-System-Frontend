"use client";

import { useState, useEffect, useCallback } from "react";
import { getAccessToken } from "@/lib/auth-session";
import { extractListItems } from "@/lib/api";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  type Category,
  type CreateCategoryPayload,
  type UpdateCategoryPayload,
} from "@/lib/inventory";

export function useCategoryList() {
  const [dataSource, setDataSource] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await fetchCategories(getAccessToken());
    if (result.ok && result.body.data) {
      setDataSource(extractListItems<Category>(result.body.data));
    } else {
      setError(result.body.message ?? "Failed to load categories.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addCategory = useCallback(
    async (payload: CreateCategoryPayload): Promise<{ ok: boolean; error?: string }> => {
      const result = await createCategory(payload, getAccessToken());
      if (result.ok) {
        await load();
        return { ok: true };
      }
      const msg = result.body.message ?? result.body.errors
        ? JSON.stringify(result.body.errors)
        : "Failed to create category.";
      return { ok: false, error: msg };
    },
    [load],
  );

  const editCategory = useCallback(
    async (id: string, payload: UpdateCategoryPayload): Promise<boolean> => {
      const result = await updateCategory(id, payload, getAccessToken());
      if (result.ok) {
        await load();
        return true;
      }
      return false;
    },
    [load],
  );

  const removeCategory = useCallback(
    async (id: string): Promise<boolean> => {
      const result = await deleteCategory(id, getAccessToken());
      if (result.ok) {
        await load();
        return true;
      }
      return false;
    },
    [load],
  );

  return { dataSource, loading, error, reload: load, addCategory, editCategory, removeCategory };
}
