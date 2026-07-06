import type { PosReceiptSnapshot } from "@/hooks/pos/usePosCart";

const STORAGE_KEY = "pos_last_receipt";

type StoredLastReceipt = {
  branchId: string;
  snapshot: PosReceiptSnapshot;
};

export function saveLastPosReceipt(branchId: string, snapshot: PosReceiptSnapshot): void {
  if (typeof window === "undefined") return;
  try {
    const payload: StoredLastReceipt = { branchId, snapshot };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore quota or serialization errors.
  }
}

export function loadLastPosReceipt(branchId: string): PosReceiptSnapshot | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredLastReceipt;
    if (parsed.branchId !== branchId) return null;
    return parsed.snapshot ?? null;
  } catch {
    return null;
  }
}
