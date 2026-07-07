"use client";

import { useState, useEffect, useCallback } from "react";
import { getAccessToken } from "@/lib/auth-session";
import { extractListItems } from "@/lib/api";
import {
  fetchPosProducts,
  scanPosProduct,
  type PosProductRow,
  type PosProductParams,
} from "@/lib/pos";

export type UsePosProductsOptions = {
  branchId: string | null;
  categoryId?: string;
  searchQuery?: string;
};

export function usePosProducts({ branchId, categoryId, searchQuery }: UsePosProductsOptions) {
  const [products, setProducts] = useState<PosProductRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!branchId) return;

    setLoading(true);
    setError(null);
    const token = getAccessToken();
    const params: PosProductParams = { branch: branchId };
    if (categoryId && categoryId !== "all") params.category = categoryId;
    if (searchQuery?.trim()) params.search = searchQuery.trim();

    const result = await fetchPosProducts(params, token);
    if (result.ok && result.body.data) {
      setProducts(extractListItems<PosProductRow>(result.body.data));
    } else {
      setError(result.body.message ?? "Failed to load products.");
    }
    setLoading(false);
  }, [branchId, categoryId, searchQuery]);

  useEffect(() => { load(); }, [load]);

  const scanBarcode = useCallback(
    async (
      code: string,
    ): Promise<
      | { ok: true; row: PosProductRow }
      | { ok: false; message: string }
    > => {
      if (!branchId) {
        return { ok: false, message: "Select a branch before scanning." };
      }
      if (!code.trim()) {
        return { ok: false, message: "Enter a barcode or SKU to scan." };
      }

      const token = getAccessToken();
      const result = await scanPosProduct(branchId, code.trim(), token);
      if (result.ok && result.body.data) {
        return { ok: true, row: result.body.data as PosProductRow };
      }

      return {
        ok: false,
        message: result.body.message ?? "Product not found for this barcode.",
      };
    },
    [branchId],
  );

  return { products, loading, error, reload: load, scanBarcode };
}
