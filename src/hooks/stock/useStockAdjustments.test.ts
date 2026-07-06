import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useStockAdjustments } from "@/hooks/stock/useStockAdjustments";

vi.mock("@/lib/auth-session", () => ({
  getAccessToken: () => "test-token",
}));

vi.mock("@/lib/stock", () => ({
  fetchStockAdjustments: vi.fn(),
  createStockAdjustment: vi.fn(),
}));

vi.mock("@/lib/branches", () => ({
  fetchBranches: vi.fn().mockResolvedValue({
    ok: true,
    body: { data: { items: [{ id: "b1", name: "Branch 1" }] } },
  }),
}));

vi.mock("@/lib/warehouses", () => ({
  fetchWarehouses: vi.fn().mockResolvedValue({
    ok: true,
    body: { data: { items: [] } },
  }),
}));

vi.mock("@/lib/inventory", () => ({
  fetchProducts: vi.fn().mockResolvedValue({
    ok: true,
    body: { data: { items: [{ id: "p1", name: "Product 1" }] } },
  }),
}));

import { fetchStockAdjustments, createStockAdjustment } from "@/lib/stock";

describe("useStockAdjustments", () => {
  beforeEach(() => {
    vi.mocked(fetchStockAdjustments).mockResolvedValue({
      ok: true,
      status: 200,
      body: {
        success: true,
        data: [
          {
            id: "a1",
            branch: "b1",
            branch_name: "Branch 1",
            warehouse: null,
            product: "p1",
            product_name: "Product 1",
            variant: null,
            quantity_before: "5",
            quantity_after: "10",
            reason: "test",
            responsible_person: null,
            created_at: "2026-01-01",
            updated_at: "2026-01-01",
          },
        ],
      },
    });
    vi.mocked(createStockAdjustment).mockResolvedValue({
      ok: true,
      status: 201,
      body: {
        success: true,
        data: {
          id: "a2",
          branch: "b1",
          warehouse: null,
          product: "p1",
          variant: null,
          quantity_before: "5",
          quantity_after: "20",
          reason: "restock",
          responsible_person: null,
          created_at: "2026-01-01",
          updated_at: "2026-01-01",
        },
      },
    });
  });

  it("loads adjustments on mount", async () => {
    const { result } = renderHook(() => useStockAdjustments());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.dataSource).toHaveLength(1);
    expect(result.current.dataSource[0].product_name).toBe("Product 1");
  });

  it("creates adjustment and reloads", async () => {
    const { result } = renderHook(() => useStockAdjustments());
    await waitFor(() => expect(result.current.loading).toBe(false));

    let ok = false;
    await act(async () => {
      ok = await result.current.createAdjustment({
        branch: "b1",
        product: "p1",
        quantity_after: "20",
        reason: "restock",
      });
    });

    expect(ok).toBe(true);
    expect(createStockAdjustment).toHaveBeenCalled();
    expect(fetchStockAdjustments).toHaveBeenCalled();
  });
});
