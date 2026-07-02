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
import { fetchBranches, fetchAllTenantBranches, type Branch } from "@/lib/branches";
import { getAccessToken } from "@/lib/auth-session";
import { useAuth } from "@/providers/auth-provider";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type BranchContextValue = {
  branches: Branch[];
  activeBranch: Branch | null;
  setActiveBranchId: (id: string) => void;
  loading: boolean;
  canSwitchBranch: boolean;
  refreshBranches: () => void;
};

const BranchContext = createContext<BranchContextValue | null>(null);

const STORAGE_KEY = "sortorium_active_branch";

function readStoredBranchId(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(STORAGE_KEY);
}

function persistBranchId(id: string): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, id);
  }
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function BranchProvider({ children }: { children: ReactNode }) {
  const { tier } = useAuth();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [activeBranch, setActiveBranch] = useState<Branch | null>(null);
  const [loading, setLoading] = useState(true);

  const canSwitchBranch = tier === "owner";

  const reloadBranches = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);

    // Tenant admins get the full branch list (unscoped).
    // Non-owners get their scoped branch list.
    let result: { ok: boolean; body: { success: boolean; data?: unknown; message?: string } };
    if (tier === "owner") {
      const summaryRes = await fetchAllTenantBranches(token);
      if (summaryRes.ok && summaryRes.body.success) {
        result = summaryRes;
      } else {
        // Fall back to scoped list if summary fails (e.g., not admin in backend)
        result = await fetchBranches(token);
      }
    } else {
      result = await fetchBranches(token);
    }

    if (result.ok && result.body.success && result.body.data) {
      const raw = result.body.data as unknown;
      const list: Branch[] = Array.isArray(raw)
        ? (raw as Branch[])
        : ((raw as Record<string, unknown>)?.results as Branch[]) ?? [];
      setBranches(list);

      const storedId = readStoredBranchId();
      const branch =
        (storedId ? list.find((b) => b.id === storedId) : null) ?? list[0] ?? null;
      setActiveBranch(branch);
      if (branch) persistBranchId(branch.id);
    }
    setLoading(false);
  }, [tier]);

  useEffect(() => {
    void reloadBranches();
  }, [reloadBranches]);

  const setActiveBranchId = useCallback(
    (id: string) => {
      if (!canSwitchBranch) return;
      const branch = branches.find((b) => b.id === id);
      if (branch) {
        setActiveBranch(branch);
        persistBranchId(id);
      }
    },
    [branches, canSwitchBranch],
  );

  const value = useMemo<BranchContextValue>(
    () => ({
      branches,
      activeBranch,
      setActiveBranchId,
      loading,
      canSwitchBranch,
      refreshBranches: () => void reloadBranches(),
    }),
    [branches, activeBranch, setActiveBranchId, loading, canSwitchBranch, reloadBranches],
  );

  return (
    <BranchContext.Provider value={value}>{children}</BranchContext.Provider>
  );
}

export function useActiveBranch(): BranchContextValue {
  const ctx = useContext(BranchContext);
  if (!ctx) {
    throw new Error("useActiveBranch must be used within BranchProvider");
  }
  return ctx;
}
