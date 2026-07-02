"use client";

import { useState, useEffect, useCallback } from "react";
import { getAccessToken } from "@/lib/auth-session";
import { fetchExpiredProducts, type Product } from "@/lib/inventory";

export function useExpiredProducts() {
  const [dataSource, setDataSource] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await fetchExpiredProducts(getAccessToken());
    if (result.ok && result.body.data) {
      setDataSource(Array.isArray(result.body.data) ? result.body.data : []);
    } else {
      setError(result.body.message ?? "Failed to load expired products.");
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  return { dataSource, loading, error, reload: load };
}
