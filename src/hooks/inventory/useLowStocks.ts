"use client";

import { useState, useEffect, useCallback } from "react";
import { getAccessToken } from "@/lib/auth-session";
import { extractListItems } from "@/lib/api";
import { fetchLowStocks, type LowStockRow } from "@/lib/inventory";

export function useLowStocks() {
  const [dataSource, setDataSource] = useState<LowStockRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await fetchLowStocks(getAccessToken());
    if (result.ok && result.body.data) {
      setDataSource(extractListItems<LowStockRow>(result.body.data));
    } else {
      setError(result.body.message ?? "Failed to load low-stock items.");
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  return { dataSource, loading, error, reload: load };
}
