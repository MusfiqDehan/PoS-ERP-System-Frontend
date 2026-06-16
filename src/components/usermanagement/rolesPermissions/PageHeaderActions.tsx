"use client";

import PlusIcon from "./PlusIcon";

type PageHeaderActionButtonProps = {
  label: string;
  onClick?: () => void;
  modalTarget?: string;
};

function PageHeaderActionButton({ label, onClick, modalTarget }: PageHeaderActionButtonProps) {
  return (
    <button
      type="button"
      className="roles-permissions-page-header__action-btn"
      onClick={onClick}
      {...(modalTarget
        ? {
            "data-bs-toggle": "modal",
            "data-bs-target": modalTarget,
          }
        : {})}
    >
      <span className="roles-permissions-page-header__action-btn-inner">
        <PlusIcon className="roles-permissions-page-header__action-btn-icon" />
        <span className="roles-permissions-page-header__action-btn-label">{label}</span>
      </span>
    </button>
  );
}

export default function PageHeaderActions() {
  return (
    <div className="roles-permissions-page-header__actions">
      <PageHeaderActionButton label="Invite Member" />
      <PageHeaderActionButton label="Create Role" modalTarget="#add-units" />
    </div>
  );
}
