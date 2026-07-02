"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { getAccessToken } from "@/lib/auth-session";
import {
  fetchCategories,
  fetchSubCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  type Category,
  type SubCategory,
  type CreateCategoryPayload,
  type UpdateCategoryPayload,
} from "@/lib/inventory";

function ensure<T>(data: unknown): T[] {
  return Array.isArray(data) ? (data as T[]) : [];
}

export function useSubCategories() {
  const [rawData, setRawData] = useState<Category[]>([]);
  const [parents, setParents] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const token = getAccessToken();
    const [subResult, catResult] = await Promise.all([
      fetchSubCategories(token),
      fetchCategories(token),
    ]);
    if (subResult.ok && subResult.body.data) {
      setRawData(ensure<Category>(subResult.body.data));
    } else {
      setError(subResult.body.message ?? "Failed to load sub-categories.");
    }
    if (catResult.ok && catResult.body.data) {
      setParents(ensure<Category>(catResult.body.data));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const dataSource: SubCategory[] = useMemo(() => {
    const parentMap = new Map<string, string>();
    for (const p of parents) {
      parentMap.set(p.id, p.name);
    }
    return rawData.map((item) => ({
      ...item,
      parent_name: item.parent ? parentMap.get(item.parent) ?? null : null,
    }));
  }, [rawData, parents]);

  const addSubCategory = useCallback(
    async (payload: CreateCategoryPayload): Promise<boolean> => {
      const result = await createCategory(payload, getAccessToken());
      if (result.ok) {
        await load();
        return true;
      }
      return false;
    },
    [load],
  );

  const editSubCategory = useCallback(
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

  const removeSubCategory = useCallback(
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

  return {
    dataSource,
    parents,
    loading,
    error,
    reload: load,
    addSubCategory,
    editSubCategory,
    removeSubCategory,
  };
}
