"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchBranches, type Branch } from "@/lib/branches";
import { getAccessToken } from "@/lib/auth-session";
import { useActiveBranch } from "@/providers/branch-provider";
import AddBranchModal from "@/core/modals/branch/add-branch-modal";
import EditBranchModal from "@/core/modals/branch/edit-branch-modal";
import CommonFooter from "@/core/common/footer/commonFooter";

type ViewMode = "table" | "card";

const STATUS_BADGE: Record<string, string> = {
  active: "bg-[#e7fbf7] text-[#089b7c]",
  maintenance: "bg-[#fff8e7] text-[#e8a33d]",
  opening_soon: "bg-[#e8f0fe] text-[#4a90d9]",
  closed: "bg-[#ffeaea] text-[#dc3545]",
};

const STATUS_DOT: Record<string, string> = {
  active: "bg-[#089b7c]",
  maintenance: "bg-[#e8a33d]",
  opening_soon: "bg-[#4a90d9]",
  closed: "bg-[#dc3545]",
};

const STATUS_LABEL: Record<string, string> = {
  active: "Active",
  maintenance: "Maintenance",
  opening_soon: "Opening Soon",
  closed: "Closed",
};

function statusOf(b: Branch): string {
  return b.status ?? (b.is_active ? "active" : "closed");
}

/* ------------------------------------------------------------------ */
/*  Table View                                                         */
/* ------------------------------------------------------------------ */

function BranchTable({
  branches,
  activeBranchId,
  canSwitch,
  onSwitch,
  onEdit,
}: {
  branches: Branch[];
  activeBranchId: string | undefined;
  canSwitch: boolean;
  onSwitch: (id: string) => void;
  onEdit: (b: Branch) => void;
}) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-[#e7e7e7] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="border-b border-[#e7e7e7] bg-[#fafafa]">
              <th className="sticky left-0 bg-[#fafafa] px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#888]">
                Branch
              </th>
              <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#888]">
                Code
              </th>
              <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#888]">
                City
              </th>
              <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#888]">
                Status
              </th>
              <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#888]">
                Phone
              </th>
              <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#888]">
                Email
              </th>
              <th className="px-4 py-3 pr-4 text-right text-[11px] font-semibold uppercase tracking-wider text-[#888]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch) => {
              const isActive = branch.id === activeBranchId;
              const st = statusOf(branch);
              return (
                <tr
                  key={branch.id}
                  className={`border-b border-[#f1f1f1] transition-colors hover:bg-[#f9fdfb] ${
                    isActive ? "bg-[#f1fcf5]/50" : ""
                  }`}
                >
                  <td className={`sticky left-0 px-4 py-3 ${isActive ? "bg-[#f1fcf5]/50" : "bg-white"}`}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[6px] bg-[#f1fcf5]">
                        <i className="ti ti-building-store text-[16px] leading-none text-[#089b7c]" />
                      </div>
                      <div className="min-w-0">
                        <p className="m-0 truncate text-[13px] font-semibold text-[#333333]">
                          {branch.name}
                        </p>
                        {isActive && (
                          <span className="inline-block rounded-[2px] bg-[#089b7c] px-[5px] py-px text-[9px] font-semibold text-white">
                            Current
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <code className="rounded-[3px] bg-[#f4f4f4] px-[6px] py-[2px] text-[11px] font-medium text-[#555]">
                      {branch.code}
                    </code>
                  </td>
                  <td className="px-4 py-3 text-[#555]">
                    {branch.city || <span className="text-[#ccc]">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-[5px] rounded-[3px] px-[8px] py-[2px] text-[11px] font-medium ${STATUS_BADGE[st]}`}>
                      <span className={`inline-block h-[6px] w-[6px] rounded-full ${STATUS_DOT[st]}`} />
                      {STATUS_LABEL[st]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#555]">
                    {branch.phone_number || <span className="text-[#ccc]">—</span>}
                  </td>
                  <td className="px-4 py-3 text-[#555]">
                    {branch.email || <span className="text-[#ccc]">—</span>}
                  </td>
                  <td className="px-4 py-3 pr-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      {canSwitch && !isActive && (
                        <button
                          type="button"
                          onClick={() => onSwitch(branch.id)}
                          className="inline-flex items-center gap-[4px] rounded-[4px] border border-[#089b7c] px-[8px] py-[4px] text-[11px] font-medium text-[#089b7c] transition-colors hover:bg-[#f1fcf5]"
                        >
                          <i className="ti ti-switch-horizontal text-[12px] leading-none" />
                          Switch
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => onEdit(branch)}
                        title="Edit"
                        className="flex h-[28px] w-[28px] items-center justify-center rounded-[4px] text-[#aaa] transition-colors hover:bg-[#f4f4f4] hover:text-[#555]"
                      >
                        <i className="ti ti-edit text-[14px] leading-none" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Card View                                                          */
/* ------------------------------------------------------------------ */

function BranchCards({
  branches,
  activeBranchId,
  canSwitch,
  onSwitch,
  onEdit,
}: {
  branches: Branch[];
  activeBranchId: string | undefined;
  canSwitch: boolean;
  onSwitch: (id: string) => void;
  onEdit: (b: Branch) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {branches.map((branch) => {
        const isActive = branch.id === activeBranchId;
        const st = statusOf(branch);
        return (
          <div
            key={branch.id}
            className={`group flex flex-col overflow-hidden rounded-[12px] border bg-white shadow-sm transition-all hover:shadow-md ${
              isActive
                ? "border-[#089b7c] ring-1 ring-[#089b7c]/30"
                : "border-[#e7e7e7]"
            }`}
          >
            {/* Card top */}
            <div className="flex items-start gap-3 border-b border-[#f4f4f4] px-4 py-4">
              <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#f1fcf5] to-[#e7fbf7]">
                <i className="ti ti-building-store text-[20px] leading-none text-[#089b7c]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h5 className="m-0 truncate text-[15px] font-semibold leading-snug text-[#1a1a1a]">
                    {branch.name}
                  </h5>
                  {isActive && (
                    <span className="shrink-0 rounded-[3px] bg-[#089b7c] px-[6px] py-px text-[9px] font-semibold text-white">
                      Current
                    </span>
                  )}
                </div>
                <p className="mt-[3px] text-[11px] text-[#999]">{branch.code}</p>
              </div>
            </div>

            {/* Card body */}
            <div className="flex-1 space-y-[10px] px-4 py-4">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-[5px] rounded-[4px] px-[8px] py-[3px] text-[11px] font-medium ${STATUS_BADGE[st]}`}
                >
                  <span className={`inline-block h-[6px] w-[6px] rounded-full ${STATUS_DOT[st]}`} />
                  {STATUS_LABEL[st]}
                </span>
                {branch.city && (
                  <span className="inline-flex items-center gap-[3px] text-[12px] text-[#888]">
                    <i className="ti ti-map-pin text-[12px] leading-none" />
                    {branch.city}
                  </span>
                )}
              </div>
              {branch.address && (
                <p className="m-0 text-[12px] leading-relaxed text-[#666]">
                  <i className="ti ti-map text-[12px] leading-none mr-[4px] text-[#bbb]" />
                  {branch.address}
                </p>
              )}
              {branch.phone_number && (
                <p className="m-0 text-[12px] leading-relaxed text-[#666]">
                  <i className="ti ti-phone text-[12px] leading-none mr-[4px] text-[#bbb]" />
                  {branch.phone_number}
                </p>
              )}
              {branch.email && (
                <p className="m-0 text-[12px] leading-relaxed text-[#666]">
                  <i className="ti ti-mail text-[12px] leading-none mr-[4px] text-[#bbb]" />
                  {branch.email}
                </p>
              )}
            </div>

            {/* Card footer */}
            <div className="flex items-center justify-between border-t border-[#f4f4f4] px-4 py-3">
              <div>
                {canSwitch && !isActive && (
                  <button
                    type="button"
                    onClick={() => onSwitch(branch.id)}
                    className="inline-flex items-center gap-[4px] rounded-[4px] border border-[#089b7c] px-[10px] py-[5px] text-[11px] font-medium text-[#089b7c] transition-colors hover:bg-[#f1fcf5]"
                  >
                    <i className="ti ti-switch-horizontal text-[12px] leading-none" />
                    Switch to
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => onEdit(branch)}
                className="flex h-[30px] w-[30px] items-center justify-center rounded-[4px] text-[#bbb] transition-colors hover:bg-[#f4f4f4] hover:text-[#555]"
                title="Edit"
              >
                <i className="ti ti-edit text-[14px] leading-none" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function BranchOverview() {
  const { activeBranch, setActiveBranchId, canSwitchBranch } = useActiveBranch();
  const token = getAccessToken();

  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [view, setView] = useState<ViewMode>("table");

  const loadBranches = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    const { ok, body } = await fetchBranches(token);
    if (ok && body.success && body.data) {
      setBranches(body.data);
    } else {
      setError(body.message || "Failed to load branches.");
    }
    setLoading(false);
  }, [token]);

  useEffect(() => {
    void loadBranches();
  }, [loadBranches]);

  /* Shared props for both views */
  const viewProps = {
    branches,
    activeBranchId: activeBranch?.id,
    canSwitch: canSwitchBranch,
    onSwitch: setActiveBranchId,
    onEdit: setEditingBranch,
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        {/* Header */}
        <div className="mb-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="m-0 text-[24px] font-bold leading-normal text-[#1a1a1a]">
                Branch Overview
              </h2>
              <p className="mt-1 mb-0 text-[14px] font-normal leading-normal text-[#666]">
                Manage your branches — add, edit, or remove branches across your organization.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* View toggle */}
              <div className="inline-flex rounded-[7px] border border-[#e7e7e7] bg-[#f9f9f9] p-[3px]">
                <button
                  type="button"
                  onClick={() => setView("table")}
                  className={`inline-flex items-center gap-[6px] rounded-[5px] px-[14px] py-[7px] text-[13px] font-medium leading-none transition-all ${
                    view === "table"
                      ? "bg-white text-[#1a1a1a] shadow-sm"
                      : "text-[#888] hover:text-[#555]"
                  }`}
                >
                  <i className="ti ti-list text-[15px] leading-none" />
                  Table
                </button>
                <button
                  type="button"
                  onClick={() => setView("card")}
                  className={`inline-flex items-center gap-[6px] rounded-[5px] px-[14px] py-[7px] text-[13px] font-medium leading-none transition-all ${
                    view === "card"
                      ? "bg-white text-[#1a1a1a] shadow-sm"
                      : "text-[#888] hover:text-[#555]"
                  }`}
                >
                  <i className="ti ti-layout-grid text-[15px] leading-none" />
                  Cards
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowAddModal(true);
                  setError(null);
                }}
                className="inline-flex items-center gap-[7px] rounded-[7px] bg-[#089b7c] px-[18px] py-[10px] text-[14px] font-semibold leading-none text-white transition-colors hover:bg-[#06866b] active:scale-[0.98]"
              >
                <i className="ti ti-plus text-[17px] leading-none" />
                Add Branch
              </button>
            </div>
          </div>

          {/* KPI row */}
          {!loading && (
            <div className="mt-4 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-[7px] border border-[#e7e7e7] bg-white px-4 py-[10px] shadow-sm">
                <span className="text-[12px] font-medium text-[#888]">Total</span>
                <span className="text-[18px] font-bold text-[#1a1a1a]">{branches.length}</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-[7px] border border-[#e7e7e7] bg-white px-4 py-[10px] shadow-sm">
                <span className="inline-block h-[7px] w-[7px] rounded-full bg-[#089b7c]" />
                <span className="text-[12px] font-medium text-[#888]">Active</span>
                <span className="text-[18px] font-bold text-[#1a1a1a]">
                  {branches.filter((b) => statusOf(b) === "active").length}
                </span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-[7px] border border-[#e7e7e7] bg-white px-4 py-[10px] shadow-sm">
                <span className="inline-block h-[7px] w-[7px] rounded-full bg-[#e8a33d]" />
                <span className="text-[12px] font-medium text-[#888]">Other</span>
                <span className="text-[18px] font-bold text-[#1a1a1a]">
                  {branches.filter((b) => statusOf(b) !== "active").length}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-[8px] bg-[#fff5f5] px-[16px] py-[12px] text-[13px] leading-normal text-[#dc3545]">
            {error}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-3">
              <div className="h-[32px] w-[32px] animate-spin rounded-full border-[3px] border-[#e7e7e7] border-t-[#089b7c]" />
              <span className="text-[14px] text-[#999]">Loading branches…</span>
            </div>
          </div>
        ) : branches.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-5 flex h-[100px] w-[100px] items-center justify-center rounded-full bg-[#f1fcf5]">
              <i className="ti ti-building-store text-[42px] leading-none text-[#089b7c]" />
            </div>
            <h4 className="m-0 text-[18px] font-semibold text-[#1a1a1a]">No branches yet</h4>
            <p className="mt-2 mb-6 max-w-[380px] text-[14px] leading-relaxed text-[#888]">
              Create your first branch to start managing inventory and sales across multiple locations.
            </p>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-[7px] rounded-[7px] bg-[#089b7c] px-[22px] py-[11px] text-[14px] font-semibold leading-none text-white transition-colors hover:bg-[#06866b]"
            >
              <i className="ti ti-plus text-[17px] leading-none" />
              Create Your First Branch
            </button>
          </div>
        ) : view === "table" ? (
          <BranchTable {...viewProps} />
        ) : (
          <BranchCards {...viewProps} />
        )}

        {/* Add Modal */}
        {showAddModal && (
          <AddBranchModal
            id="add-branch-modal"
            show={showAddModal}
            onCreated={loadBranches}
            onClose={() => setShowAddModal(false)}
          />
        )}

        {/* Edit Modal */}
        {editingBranch && (
          <EditBranchModal
            id="edit-branch-modal"
            branch={editingBranch}
            onUpdated={loadBranches}
            onClose={() => setEditingBranch(null)}
          />
        )}
      </div>
      <CommonFooter />
    </div>
  );
}
