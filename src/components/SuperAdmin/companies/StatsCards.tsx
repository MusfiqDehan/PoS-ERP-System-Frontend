"use client";

import { useCallback, useEffect, useState } from "react";
import {
  fetchTenantCounts,
  listTenantInvitations,
  type TenantCounts,
} from "@/lib/platform";
import { getAccessToken } from "@/lib/auth-session";

export type StatusFilter = "all" | "active" | "inactive" | "pending_invites";

type Props = {
  activeFilter: StatusFilter;
  onFilterChange: (filter: StatusFilter) => void;
};

export default function StatsCards({ activeFilter, onFilterChange }: Props) {
  const [counts, setCounts] = useState<TenantCounts>({
    total: 0,
    active: 0,
    inactive: 0,
  });
  const [pendingCount, setPendingCount] = useState(0);

  const loadCounts = useCallback(async () => {
    const token = getAccessToken();
    if (!token) return;

    const [countsResult, invResult] = await Promise.all([
      fetchTenantCounts(token),
      listTenantInvitations(token),
    ]);

    if (countsResult.ok && countsResult.body.success && countsResult.body.data) {
      setCounts(countsResult.body.data);
    }
    if (invResult.ok && invResult.body.success && invResult.body.data) {
      const items = invResult.body.data.items || [];
      setPendingCount(items.filter((i) => i.status === "pending").length);
    }
  }, []);

  useEffect(() => {
    loadCounts();
  }, [loadCounts]);

  const cards: {
    key: StatusFilter;
    label: string;
    value: number;
    icon: string;
    accent: string;
  }[] = [
    {
      key: "all",
      label: "Total Companies",
      value: counts.total,
      icon: "ti ti-building",
      accent: "#0ac79e",
    },
    {
      key: "active",
      label: "Active Companies",
      value: counts.active,
      icon: "ti ti-circle-check",
      accent: "#3EB780",
    },
    {
      key: "inactive",
      label: "Inactive Companies",
      value: counts.inactive,
      icon: "ti ti-ban",
      accent: "#FF4031",
    },
    {
      key: "pending_invites",
      label: "Pending Invites",
      value: pendingCount,
      icon: "ti ti-mail",
      accent: "#F59E0B",
    },
  ];

  return (
    <div className="grid grid-cols-1 min-[768px]:grid-cols-2 min-[992px]:grid-cols-4 gap-[20px] mb-[1.25rem]">
      {cards.map((card) => {
        const isActive = activeFilter === card.key;
        return (
          <button
            key={card.key}
            type="button"
            onClick={() => onFilterChange(card.key)}
            className={
              "group relative bg-white rounded-[12px] p-5 border shadow-[0_1px_2px_rgba(16,24,40,0.04),0_1px_3px_rgba(16,24,40,0.06)] hover:shadow-[0_8px_24px_rgba(16,24,40,0.10)] hover:-translate-y-0.5 transition-all duration-200 overflow-hidden text-left w-full" +
              (isActive
                ? " border-[#0ac79e] ring-2 ring-[#0ac79e]/20"
                : " border-[#eef0f3]")
            }
          >
            <span
              className="absolute top-0 left-0 h-full w-[4px]"
              style={{ backgroundColor: card.accent }}
              aria-hidden="true"
            />

            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="m-0 text-[16px] font-medium text-[#667085] truncate">
                  {card.label}
                </p>
                <h4 className="m-0 mt-2 text-[32px] font-bold leading-[1.1] text-[#101828] tracking-tight">
                  {card.value.toLocaleString()}
                </h4>
              </div>

              <span
                className="w-[56px] h-[56px] rounded-[14px] flex items-center justify-center shrink-0 shadow-sm"
                style={{ backgroundColor: card.accent }}
              >
                <i className={card.icon + " text-white text-[26px]"} />
              </span>
            </div>

            <span
              className="absolute bottom-0 left-0 right-0 h-[2px] opacity-40"
              style={{
                background:
                  "linear-gradient(to right, " + card.accent + ", transparent)",
              }}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
}
