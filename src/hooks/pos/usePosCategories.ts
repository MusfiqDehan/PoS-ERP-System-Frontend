"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getAccessToken } from "@/lib/auth-session";
import { extractListItems } from "@/lib/api";
import { fetchCategories, type Category } from "@/lib/inventory";
import { fetchPosCategoryCounts, type PosCategoryCounts } from "@/lib/pos";
import type { PosProductFilter } from "@/components/pos-module/pos/posProductsData";

type UsePosCategoriesOptions = {
  branchId: string | null;
  activeTab: string;
  onTabChange: (tabId: string) => void;
};

const EMPTY_COUNTS: PosCategoryCounts = { total: 0, by_category: {} };

export function usePosCategories({
  branchId,
  activeTab,
  onTabChange,
}: UsePosCategoriesOptions) {
  const [rawCategories, setRawCategories] = useState<Category[]>([]);
  const [counts, setCounts] = useState<PosCategoryCounts>(EMPTY_COUNTS);
  const [loading, setLoading] = useState(true);

  const loadCategories = useCallback(async () => {
    const token = getAccessToken();
    const result = await fetchCategories(token);
    if (result.ok && result.body.data) {
      setRawCategories(extractListItems<Category>(result.body.data));
    }
  }, []);

  const loadCounts = useCallback(async () => {
    if (!branchId) {
      setCounts(EMPTY_COUNTS);
      return;
    }
    const token = getAccessToken();
    const result = await fetchPosCategoryCounts({ branch: branchId }, token);
    if (result.ok && result.body.data) {
      setCounts(result.body.data);
    } else {
      setCounts(EMPTY_COUNTS);
    }
  }, [branchId]);

  const refresh = useCallback(async () => {
    setLoading(true);
    await Promise.all([loadCategories(), loadCounts()]);
    setLoading(false);
  }, [loadCategories, loadCounts]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const categories = useMemo<PosProductFilter[]>(() => {
    const filters: PosProductFilter[] = [
      { id: "all", label: "All Products", count: String(counts.total) },
    ];
    for (const category of rawCategories) {
      if (!category.is_active) continue;
      filters.push({
        id: category.id,
        label: category.name,
        count: String(counts.by_category[category.id] ?? 0),
      });
    }
    return filters;
  }, [rawCategories, counts]);

  const categoryStats = useMemo(
    () => ({
      totalCategories: rawCategories.filter((category) => category.is_active).length,
      totalProducts: counts.total,
    }),
    [rawCategories, counts.total],
  );

  const createCategory = useCallback(
    async (label: string) => {
      const trimmed = label.trim();
      if (!trimmed) return { ok: false as const, error: "Category name is required" };
      const duplicate = categories.some(
        (category) =>
          category.id !== "all" &&
          category.label.toLowerCase() === trimmed.toLowerCase(),
      );
      if (duplicate) {
        return { ok: false as const, error: "A category with this name already exists" };
      }

      const { createCategory: apiCreate } = await import("@/lib/inventory");
      const token = getAccessToken();
      const slug = trimmed
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      const result = await apiCreate({ name: trimmed, slug, is_active: true }, token);
      if (result.ok) {
        await refresh();
        return { ok: true as const };
      }
      return { ok: false as const, error: "Failed to create category" };
    },
    [categories, refresh],
  );

  const updateCategory = useCallback(
    async (id: string, label: string) => {
      if (id === "all") return { ok: false as const, error: "This category cannot be edited" };
      const trimmed = label.trim();
      if (!trimmed) return { ok: false as const, error: "Category name is required" };

      const { updateCategory: apiUpdate } = await import("@/lib/inventory");
      const token = getAccessToken();
      const result = await apiUpdate(id, { name: trimmed }, token);
      if (result.ok) {
        await refresh();
        return { ok: true as const };
      }
      return { ok: false as const, error: "Failed to update category" };
    },
    [refresh],
  );

  const deleteCategory = useCallback(
    async (id: string) => {
      if (id === "all") return { ok: false as const, error: "This category cannot be deleted" };

      const { deleteCategory: apiDelete } = await import("@/lib/inventory");
      const token = getAccessToken();
      const result = await apiDelete(id, token);
      if (result.ok) {
        if (activeTab === id) onTabChange("all");
        await refresh();
        return { ok: true as const };
      }
      return { ok: false as const, error: "Failed to delete category" };
    },
    [activeTab, onTabChange, refresh],
  );

  return {
    categories,
    categoryStats,
    loading,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}
