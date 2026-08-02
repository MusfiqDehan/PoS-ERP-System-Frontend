"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { getAccessToken } from "@/lib/auth-session";
import { extractListItems } from "@/lib/api";
import {
  fetchPosCustomers,
  createPosCustomer,
  updatePosCustomer,
  deletePosCustomer,
  type PosCustomer,
  type CreatePosCustomerPayload,
} from "@/lib/pos";

export type CustomerStatusFilter = "all" | "active" | "inactive";

export function useCustomerList() {
  const [dataSource, setDataSource] = useState<PosCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search.trim(), 300);
  const [statusFilter, setStatusFilter] = useState<CustomerStatusFilter>("all");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const params = debouncedSearch ? { search: debouncedSearch } : undefined;
    const result = await fetchPosCustomers(params, getAccessToken());
    if (result.ok && result.body.data) {
      setDataSource(extractListItems<PosCustomer>(result.body.data));
    } else {
      setError(result.body.message ?? "Failed to load customers.");
      setDataSource([]);
    }
    setLoading(false);
  }, [debouncedSearch]);

  useEffect(() => {
    load();
  }, [load]);

  const filteredData = useMemo(() => {
    if (statusFilter === "all") return dataSource;
    if (statusFilter === "active") {
      return dataSource.filter((customer) => customer.is_active);
    }
    return dataSource.filter((customer) => !customer.is_active);
  }, [dataSource, statusFilter]);

  const addCustomer = useCallback(
    async (
      payload: CreatePosCustomerPayload,
    ): Promise<{ ok: boolean; error?: string }> => {
      const result = await createPosCustomer(payload, getAccessToken());
      if (result.ok) {
        await load();
        return { ok: true };
      }
      const msg =
        result.body.message ??
        (result.body.errors
          ? JSON.stringify(result.body.errors)
          : "Failed to create customer.");
      return { ok: false, error: msg };
    },
    [load],
  );

  const editCustomer = useCallback(
    async (
      id: string,
      payload: Partial<CreatePosCustomerPayload>,
    ): Promise<{ ok: boolean; error?: string }> => {
      const result = await updatePosCustomer(id, payload, getAccessToken());
      if (result.ok) {
        await load();
        return { ok: true };
      }
      const msg =
        result.body.message ??
        (result.body.errors
          ? JSON.stringify(result.body.errors)
          : "Failed to update customer.");
      return { ok: false, error: msg };
    },
    [load],
  );

  const removeCustomer = useCallback(
    async (id: string): Promise<boolean> => {
      const result = await deletePosCustomer(id, getAccessToken());
      if (result.ok) {
        await load();
        return true;
      }
      return false;
    },
    [load],
  );

  return {
    dataSource: filteredData,
    loading,
    error,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    reload: load,
    addCustomer,
    editCustomer,
    removeCustomer,
  };
}
