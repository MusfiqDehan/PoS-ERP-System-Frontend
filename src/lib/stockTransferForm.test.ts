import { describe, expect, it } from "vitest";
import { buildCreateTransferPayload } from "./stockTransferForm";

describe("buildCreateTransferPayload", () => {
  it("builds branch-to-branch transfer payload", () => {
    const result = buildCreateTransferPayload({
      transferType: "branch_branch",
      sourceBranch: "branch-a",
      targetBranch: "branch-b",
      sourceWarehouse: "",
      product: "prod-1",
      quantity: "10",
      notes: "Restock",
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.payload).toEqual({
      transfer_type: "branch_branch",
      source_branch: "branch-a",
      target_branch: "branch-b",
      notes: "Restock",
      lines: [{ product: "prod-1", quantity_requested: "10" }],
    });
  });

  it("builds warehouse-to-branch transfer payload", () => {
    const result = buildCreateTransferPayload({
      transferType: "warehouse_branch",
      sourceBranch: "",
      targetBranch: "branch-b",
      sourceWarehouse: "wh-1",
      product: "prod-2",
      quantity: "25",
      notes: "",
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.payload).toEqual({
      transfer_type: "warehouse_branch",
      source_warehouse: "wh-1",
      target_branch: "branch-b",
      notes: "",
      lines: [{ product: "prod-2", quantity_requested: "25" }],
    });
  });

  it("rejects warehouse transfer without warehouse", () => {
    const result = buildCreateTransferPayload({
      transferType: "warehouse_branch",
      sourceBranch: "",
      targetBranch: "branch-b",
      sourceWarehouse: "",
      product: "prod-2",
      quantity: "5",
      notes: "",
    });

    expect(result).toEqual({
      ok: false,
      error: "Source warehouse and target branch are required.",
    });
  });
});
