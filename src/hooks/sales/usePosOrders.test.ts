import { describe, it, expect } from "vitest";
import { mapPosOrderToRecord } from "@/hooks/sales/usePosOrders";
import type { PosOrder } from "@/lib/pos";

describe("mapPosOrderToRecord", () => {
  it("maps API order fields to table row shape", () => {
    const order: PosOrder = {
      id: "019f2c47-223a-723a-87d8-df7f5fb725b5",
      ref_number: "INV-3001",
      branch: "branch-id",
      branch_name: "Main Branch",
      customer: "customer-id",
      customer_name: "Miraz Hossain",
      cashier: "cashier-id",
      cashier_name: "Admin User",
      status: "completed",
      subtotal: "100.00",
      tax: "0.00",
      discount: "0.00",
      total: "100.00",
      paid_amount: "100.00",
      payment_status: "paid",
      created_at: "2026-07-05T15:59:38.626523+06:00",
    };

    const row = mapPosOrderToRecord(order);
    expect(row.reference).toBe("INV-3001");
    expect(row.customer).toBe("Miraz Hossain");
    expect(row.status).toBe("Completed");
    expect(row.paymentstatus).toBe("Paid");
    expect(row.biller).toBe("Admin User");
    expect(row.paid).toContain("100");
    expect(row.due).toContain("0");
  });

  it("handles numeric monetary fields from the API", () => {
    const row = mapPosOrderToRecord({
      id: "2",
      ref_number: "INV-2",
      branch: "b",
      customer: null,
      cashier: null,
      status: "completed",
      subtotal: 50,
      tax: 0,
      discount: 0,
      total: 50,
      paid_amount: 50,
      payment_status: "paid",
      created_at: "2026-07-05T15:59:38.626523+06:00",
    } as PosOrder);
    expect(row.total).toContain("50");
    expect(row.paid).toContain("50");
    expect(row.due).toContain("0");
  });

  it("uses walk-in label when customer is missing", () => {
    const row = mapPosOrderToRecord({
      id: "1",
      ref_number: "INV-1",
      branch: "b",
      customer: null,
      cashier: null,
      status: "pending",
      subtotal: "0",
      tax: "0",
      discount: "0",
      total: "0",
      created_at: "2026-07-05T15:59:38.626523+06:00",
    });
    expect(row.customer).toBe("Walk-in Customer");
  });
});
