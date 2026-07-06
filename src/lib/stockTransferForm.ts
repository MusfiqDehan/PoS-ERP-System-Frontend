import type { CreateStockTransferPayload } from "@/lib/stock";

export type TransferFormType = "branch_branch" | "warehouse_branch";

export type BuildTransferPayloadInput = {
  transferType: TransferFormType;
  sourceBranch: string;
  targetBranch: string;
  sourceWarehouse: string;
  product: string;
  quantity: string;
  notes: string;
};

export function buildCreateTransferPayload(
  input: BuildTransferPayloadInput,
):
  | { ok: true; payload: CreateStockTransferPayload }
  | { ok: false; error: string } {
  const { transferType, sourceBranch, targetBranch, sourceWarehouse, product, quantity, notes } =
    input;

  if (!product || !quantity) {
    return { ok: false, error: "Product and quantity are required." };
  }

  if (transferType === "branch_branch") {
    if (!sourceBranch || !targetBranch) {
      return { ok: false, error: "Source and target branch are required." };
    }
    if (sourceBranch === targetBranch) {
      return { ok: false, error: "Source and target branch must differ." };
    }
    return {
      ok: true,
      payload: {
        transfer_type: "branch_branch",
        source_branch: sourceBranch,
        target_branch: targetBranch,
        notes,
        lines: [{ product, quantity_requested: quantity }],
      },
    };
  }

  if (!sourceWarehouse || !targetBranch) {
    return { ok: false, error: "Source warehouse and target branch are required." };
  }

  return {
    ok: true,
    payload: {
      transfer_type: "warehouse_branch",
      source_warehouse: sourceWarehouse,
      target_branch: targetBranch,
      notes,
      lines: [{ product, quantity_requested: quantity }],
    },
  };
}
