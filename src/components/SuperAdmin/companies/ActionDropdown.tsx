"use client";

import { useState, useRef, useEffect } from "react";
import type { PlatformTenant } from "@/lib/platform";

type Action = {
  label: string;
  icon: string;
  onClick: () => void;
  danger?: boolean;
  divider?: boolean;
};

type Props = {
  tenant: PlatformTenant;
  onViewDetails: (tenant: PlatformTenant) => void;
  onEdit: (tenant: PlatformTenant) => void;
  onUploadLogo: (tenant: PlatformTenant) => void;
  onManageFeatures: (tenant: PlatformTenant) => void;
  onToggleActive: (tenant: PlatformTenant) => void;
  onDelete: (tenant: PlatformTenant) => void;
};

export default function ActionDropdown({
  tenant,
  onViewDetails,
  onEdit,
  onUploadLogo,
  onManageFeatures,
  onToggleActive,
  onDelete,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const actions: Action[] = [
    {
      label: "View Details",
      icon: "ti ti-eye",
      onClick: () => onViewDetails(tenant),
    },
    { label: "Edit", icon: "ti ti-edit", onClick: () => onEdit(tenant) },
    {
      label: "Upload Logo",
      icon: "ti ti-photo-up",
      onClick: () => onUploadLogo(tenant),
    },
    {
      label: "Manage Features",
      icon: "ti ti-settings",
      onClick: () => onManageFeatures(tenant),
      divider: true,
    },
    {
      label: tenant.is_enabled ? "Deactivate" : "Activate",
      icon: tenant.is_enabled ? "ti ti-toggle-left" : "ti ti-toggle-right",
      onClick: () => onToggleActive(tenant),
      danger: tenant.is_enabled,
    },
    {
      label: "Delete",
      icon: "ti ti-trash",
      onClick: () => onDelete(tenant),
      danger: true,
    },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-8 h-8 inline-flex items-center justify-center rounded-md text-[#646B72] hover:bg-[#f6f6f6] hover:text-[#0ac79e] transition-colors"
      >
        <i className="ti ti-dots-vertical text-[18px]" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 min-w-[180px] bg-white rounded-lg border border-[#eef0f3] shadow-lg py-1">
          {actions.map((action, idx) => (
            <div key={action.label}>
              {action.divider && idx > 0 && (
                <hr className="my-1 border-[#eef0f3]" />
              )}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  action.onClick();
                }}
                className={
                  "w-full flex items-center gap-2 px-3 py-2 text-[13px] font-medium transition-colors " +
                  (action.danger
                    ? "text-[#dc3545] hover:bg-[#fff0f0]"
                    : "text-[#212B36] hover:bg-[#f6f6f6]")
                }
              >
                <i className={action.icon + " text-[16px]"} />
                {action.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
