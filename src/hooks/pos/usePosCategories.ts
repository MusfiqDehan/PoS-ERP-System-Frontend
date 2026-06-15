"use client";

import { useCallback, useMemo, useState } from "react";
import {
  attachProductCounts,
  createUniqueCategoryId,
  getCategoryProductCount,
  SYSTEM_CATEGORY_ID,
} from "@/components/pos-module/pos/posCategoriesUtils";
import {
  posProductFilters,
  posProducts,
  type PosProductFilter,
} from "@/components/pos-module/pos/posProductsData";

type UsePosCategoriesOptions = {
  activeTab: string;
  onTabChange: (tabId: string) => void;
};

export function usePosCategories({
  activeTab,
  onTabChange,
}: UsePosCategoriesOptions) {
  const [categories, setCategories] = useState<PosProductFilter[]>(() =>
    attachProductCounts(posProductFilters),
  );

  const refreshCounts = useCallback((next: PosProductFilter[]) => {
    return attachProductCounts(next);
  }, []);

  const createCategory = useCallback(
    (label: string) => {
      const trimmed = label.trim();
      if (!trimmed) {
        return { ok: false as const, error: "Category name is required" };
      }

      const duplicate = categories.some(
        (category) =>
          category.id !== SYSTEM_CATEGORY_ID &&
          category.label.toLowerCase() === trimmed.toLowerCase(),
      );

      if (duplicate) {
        return {
          ok: false as const,
          error: "A category with this name already exists",
        };
      }

      const existingIds = new Set(categories.map((category) => category.id));
      const id = createUniqueCategoryId(trimmed, existingIds);

      setCategories((current) =>
        refreshCounts([
          ...current,
          { id, label: trimmed, count: "0" },
        ]),
      );

      return { ok: true as const };
    },
    [categories, refreshCounts],
  );

  const updateCategory = useCallback(
    (id: string, label: string) => {
      if (id === SYSTEM_CATEGORY_ID) {
        return { ok: false as const, error: "This category cannot be edited" };
      }

      const trimmed = label.trim();
      if (!trimmed) {
        return { ok: false as const, error: "Category name is required" };
      }

      const duplicate = categories.some(
        (category) =>
          category.id !== id &&
          category.label.toLowerCase() === trimmed.toLowerCase(),
      );

      if (duplicate) {
        return {
          ok: false as const,
          error: "A category with this name already exists",
        };
      }

      setCategories((current) =>
        refreshCounts(
          current.map((category) =>
            category.id === id ? { ...category, label: trimmed } : category,
          ),
        ),
      );

      return { ok: true as const };
    },
    [categories, refreshCounts],
  );

  const deleteCategory = useCallback(
    (id: string) => {
      if (id === SYSTEM_CATEGORY_ID) {
        return { ok: false as const, error: "This category cannot be deleted" };
      }

      const productCount = getCategoryProductCount(id);
      if (productCount > 0) {
        return {
          ok: false as const,
          error: `Remove or reassign ${productCount} product(s) before deleting this category`,
        };
      }

      setCategories((current) =>
        refreshCounts(current.filter((category) => category.id !== id)),
      );

      if (activeTab === id) {
        onTabChange(SYSTEM_CATEGORY_ID);
      }

      return { ok: true as const };
    },
    [activeTab, onTabChange, refreshCounts],
  );

  const categoryStats = useMemo(() => {
    const manageable = categories.filter(
      (category) => category.id !== SYSTEM_CATEGORY_ID,
    );

    return {
      totalCategories: manageable.length,
      totalProducts: posProducts.length,
    };
  }, [categories]);

  return {
    categories,
    categoryStats,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}
