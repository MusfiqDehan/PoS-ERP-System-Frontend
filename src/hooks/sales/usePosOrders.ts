"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { getAccessToken } from "@/lib/auth-session";
import { extractListItems, extractPagination, type PaginationMeta } from "@/lib/api";
import { fetchPosOrders, type PosOrder, type PosOrderParams } from "@/lib/pos";
import { fetchBranches, type Branch } from "@/lib/branches";
import { formatCurrency, parseCurrency } from "@/lib/currency";
import type { PosOrderRecord } from "@/components/sales/pos-orders/types";

export type PosOrderFiltersState = {
  search?: string;
  status?: string;
  branch?: string;
  from?: string;
  to?: string;
};

export type BranchOption = { value: string; label: string };

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  completed: "Completed",
  cancelled: "Cancelled",
};

const PAYMENT_LABELS: Record<string, string> = {
  paid: "Paid",
  unpaid: "Unpaid",
  partial: "Partial",
};

function formatStatus(status: string): string {
  return STATUS_LABELS[status] ?? status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatPaymentStatus(status?: string): string {
  if (!status) return "Unpaid";
  return PAYMENT_LABELS[status] ?? status;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function mapPosOrderToRecord(order: PosOrder): PosOrderRecord {
  const totalNum = parseCurrency(order.total);
  const paidNum = parseCurrency(order.paid_amount ?? order.total);
  const dueNum = Math.max(totalNum - paidNum, 0);

  return {
    id: order.id,
    customer: order.customer_name ?? "Walk-in Customer",
    reference: order.ref_number,
    date: formatDate(order.created_at),
    status: formatStatus(order.status),
    total: formatCurrency(totalNum),
    paid: formatCurrency(paidNum),
    due: formatCurrency(dueNum),
    paymentstatus: formatPaymentStatus(order.payment_status),
    biller: order.cashier_name ?? "—",
  };
}

export function usePosOrders() {
  const [raw, setRaw] = useState<PosOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationMeta | undefined>();
  const [filters, setFilters] = useState<PosOrderFiltersState>({});
  const [cursor, setCursor] = useState<string | undefined>();
  const [branches, setBranches] = useState<BranchOption[]>([]);

  const loadBranches = useCallback(async () => {
    const result = await fetchBranches(getAccessToken());
    if (result.ok && result.body.data) {
      const items = Array.isArray(result.body.data)
        ? (result.body.data as Branch[])
        : extractListItems<Branch>(result.body.data);
      setBranches(items.map((branch) => ({ value: branch.id, label: branch.name })));
    }
  }, []);

  const loadOrders = useCallback(async (currentCursor?: string) => {
    setLoading(true);
    setError(null);

    const params: PosOrderParams = { page_size: 10 };
    if (filters.search) params.search = filters.search;
    if (filters.status) params.status = filters.status;
    if (filters.branch) params.branch = filters.branch;
    if (filters.from) params.from = filters.from;
    if (filters.to) params.to = filters.to;
    if (currentCursor) params.cursor = currentCursor;

    const result = await fetchPosOrders(params, getAccessToken());
    if (result.ok && result.body.data) {
      setRaw(extractListItems<PosOrder>(result.body.data));
      setPagination(extractPagination(result.body.data));
    } else {
      setError(result.body.message ?? "Failed to load POS orders.");
    }
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    loadBranches();
  }, [loadBranches]);

  useEffect(() => {
    loadOrders(cursor);
  }, [loadOrders, cursor]);

  const dataSource = useMemo(
    () => raw.map(mapPosOrderToRecord),
    [raw],
  );

  const applyFilters = useCallback((next: PosOrderFiltersState) => {
    setFilters(next);
    setCursor(undefined);
  }, []);

  const goNextPage = useCallback(() => {
    if (pagination?.next_cursor) setCursor(pagination.next_cursor);
  }, [pagination]);

  const goPrevPage = useCallback(() => {
    if (pagination?.previous_cursor) setCursor(pagination.previous_cursor);
  }, [pagination]);

  return {
    dataSource,
    loading,
    error,
    reload: () => loadOrders(cursor),
    branches,
    filters,
    applyFilters,
    pagination,
    goNextPage,
    goPrevPage,
  };
}
