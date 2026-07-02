"use client";

import { useState } from "react";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import { useActiveBranch } from "@/providers/branch-provider";
import AddBranchModal from "@/core/modals/branch/add-branch-modal";

export default function HeaderStoreSelector() {
  const {
    branches,
    activeBranch,
    setActiveBranchId,
    loading,
    canSwitchBranch,
    refreshBranches,
  } = useActiveBranch();

  const [showAddModal, setShowAddModal] = useState(false);

  const isLoading = loading;

  if (isLoading) {
    return (
      <div className="dropdown main-drop select-store-dropdown figma-header-control figma-store-selector">
        <button
          type="button"
          className="nav-link select-store"
          aria-expanded="false"
          disabled
        >
          <span className="user-info">
            <span className="user-letter">
              <ImageWithBasePath
                src="assets/img/store/store-01.png"
                alt="Loading"
                className="img-fluid"
                width={20}
                height={20}
              />
            </span>
            <span className="user-detail">
              <span className="user-name">Loading…</span>
            </span>
          </span>
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="dropdown main-drop select-store-dropdown figma-header-control figma-store-selector">
        <button
          type="button"
          className="nav-link select-store"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          disabled={!canSwitchBranch}
        >
          <span className="user-info">
            <span className="user-letter">
              <ImageWithBasePath
                src="assets/img/store/store-01.png"
                alt={activeBranch?.name ?? "Branch"}
                className="img-fluid"
                width={20}
                height={20}
              />
            </span>
            <span className="user-detail">
              <span className="user-name">
                {activeBranch?.name ?? "Main Branch"}
              </span>
            </span>
          </span>
          {canSwitchBranch && (
            <span className="store-caret" aria-hidden="true">
              <i className="ti ti-chevron-down" />
            </span>
          )}
        </button>
        {canSwitchBranch && (
          <div className="dropdown-menu dropdown-menu-end">
            {branches.map((branch) => (
              <button
                type="button"
                key={branch.id}
                className={`dropdown-item${branch.id === activeBranch?.id ? " active" : ""}`}
                onClick={() => setActiveBranchId(branch.id)}
              >
                <ImageWithBasePath
                  src="assets/img/store/store-01.png"
                  alt={`${branch.name} logo`}
                  className="img-fluid"
                  width={20}
                  height={20}
                />
                {branch.name}
              </button>
            ))}
            <div className="p-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-primary w-100"
                onClick={() => setShowAddModal(true)}
                data-bs-dismiss="dropdown"
              >
                <i className="ti ti-plus me-1" />
                Add Branch
              </button>
            </div>
          </div>
        )}
      </div>

      {showAddModal && (
        <AddBranchModal
          id="header-add-branch"
          show={showAddModal}
          onCreated={() => {
            refreshBranches();
            setShowAddModal(false);
          }}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </>
  );
}
