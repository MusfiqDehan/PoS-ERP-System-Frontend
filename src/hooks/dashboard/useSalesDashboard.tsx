"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getAccessToken } from "@/lib/auth-session";
import {
  fetchDashboardLowStock,
  fetchDashboardSalesInsights,
  type DashboardLowStockItem,
  type DashboardSalesInsights,
} from "@/lib/dashboard";

type SalesDashboardContextValue = {
  sales: DashboardSalesInsights | null;
  lowStock: DashboardLowStockItem[];
  loading: boolean;
  error: string | null;
  reload: () => void;
};

const SalesDashboardContext = createContext<SalesDashboardContextValue | null>(
  null,
);

export function SalesDashboardProvider({ children }: { children: ReactNode }) {
  const [sales, setSales] = useState<DashboardSalesInsights | null>(null);
  const [lowStock, setLowStock] = useState<DashboardLowStockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const token = getAccessToken();
    const [salesRes, lowStockRes] = await Promise.all([
      fetchDashboardSalesInsights({ limit: 10 }, token),
      fetchDashboardLowStock(undefined, token),
    ]);

    if (salesRes.ok && salesRes.body.data) {
      setSales(salesRes.body.data);
    } else {
      setError(salesRes.body.message ?? "Failed to load dashboard sales data.");
    }

    if (lowStockRes.ok && Array.isArray(lowStockRes.body.data)) {
      setLowStock(lowStockRes.body.data);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const value = useMemo(
    () => ({ sales, lowStock, loading, error, reload: load }),
    [sales, lowStock, loading, error, load],
  );

  return (
    <SalesDashboardContext.Provider value={value}>
      {children}
    </SalesDashboardContext.Provider>
  );
}

export function useSalesDashboardData() {
  const ctx = useContext(SalesDashboardContext);
  if (!ctx) {
    throw new Error("useSalesDashboardData must be used within SalesDashboardProvider");
  }
  return ctx;
}
