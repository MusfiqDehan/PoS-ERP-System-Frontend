"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchBranchSummary, type BranchSummary } from "@/lib/branches";
import { getAccessToken, isPlatformSession } from "@/lib/auth-session";

type Change = { text: string; dir: "up" | "down" };

type KpiCard = {
  label: string;
  value: string;
  accent: string;
  icon: string;
  change?: Change;
  legend?: { color: string; text: string }[];
};

const hardcodedCards: KpiCard[] = [
  {
    label: "Chain Revenue",
    value: "$1,092,550",
    accent: "#4687f4",
    icon: "ti ti-chart-line",
    change: { text: "-11.2% vs Target", dir: "down" },
  },
  {
    label: "Transactions",
    value: "2,338",
    accent: "#7364c2",
    icon: "ti ti-receipt",
    change: { text: "+5.2% vs Yesterday", dir: "up" },
  },
  {
    label: "Avg Basket Size",
    value: "$467",
    accent: "#ffc94d",
    icon: "ti ti-shopping-cart",
    change: { text: "+1.1% vs Yesterday", dir: "up" },
  },
];

export default function KpiCards() {
  const token = getAccessToken();
  const [summary, setSummary] = useState<BranchSummary[] | null>(null);

  const load = useCallback(async function() {
    if (!token || isPlatformSession()) return;
    const { ok, body } = await fetchBranchSummary(token);
    if (ok && body.success && body.data) {
      setSummary(body.data);
    }
  }, [token]);

  useEffect(function() {
    void load();
  }, [load]);

  const totalBranches = summary?.length ?? 0;
  const openCount = summary?.filter(function(b) { return b.status === "active" || b.status === "open"; }).length ?? 0;
  const closedCount = totalBranches - openCount;

  const cards: KpiCard[] = [
    ...hardcodedCards,
    {
      label: "Active Branches",
      value: totalBranches > 0 ? openCount + "/" + totalBranches : "---",
      accent: "#0bdbae",
      icon: "ti ti-building-store",
      legend:
        totalBranches > 0
          ? [
              { color: "#247e46", text: "Open (" + String(openCount).padStart(2, "0") + ")" },
              ...(closedCount > 0
                ? [{ color: "#666", text: "Close (" + String(closedCount).padStart(2, "0") + ")" }]
                : []),
            ]
          : undefined,
    },
  ];

  return (
    <div className="grid grid-cols-1 min-[768px]:grid-cols-2 min-[992px]:grid-cols-4 gap-[20px] mb-[1.25rem]">
      {cards.map(function(card) {
        return (
          <div
            key={card.label}
            className="group relative bg-white rounded-[12px] p-4 border border-[#eef0f3] shadow-[0_1px_2px_rgba(16,24,40,0.04),0_1px_3px_rgba(16,24,40,0.06)] hover:shadow-[0_8px_24px_rgba(16,24,40,0.10)] hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
          >
            {/* accent bar */}
            <span
              className="absolute top-0 left-0 h-full w-[4px]"
              style={{ backgroundColor: card.accent }}
              aria-hidden="true"
            />

            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="m-0 text-[17px] font-medium text-[#667085] truncate">
                  {card.label}
                </p>
                <h4 className="m-0 mt-1 text-[34px] font-bold leading-[1.1] text-[#101828] tracking-tight">
                  {card.value}
                </h4>
              </div>

              {/* icon tile */}
              <span
                className="w-[56px] h-[56px] rounded-[14px] flex items-center justify-center shrink-0 shadow-sm"
                style={{ backgroundColor: card.accent }}
              >
                <i className={card.icon + " text-white text-[28px]"} />
              </span>
            </div>

            {/* change badge or legend */}
            <div className="mt-3 pt-2 border-t border-[#f2f4f7]">
              {card.change && (
                <span
                  className={"inline-flex items-center gap-1 px-2 py-[3px] rounded-full text-[14px] font-semibold " +
                    (card.change.dir === "up" ? "text-[#067647] bg-[#ecfdf3]" : "text-[#b42318] bg-[#fef3f2]")}
                >
                  <i className={"ti ti-trending-" + card.change.dir} />
                  {card.change.text}
                </span>
              )}
              {card.legend && (
                <div className="flex items-center gap-4">
                  {card.legend.map(function(item) {
                    return (
                      <span key={item.text} className="inline-flex items-center gap-1.5">
                        <span
                          className="w-3 h-3 rounded-[2px] inline-block"
                          style={{ background: item.color }}
                        />
                        <span className="text-[14px] font-medium text-[#667085]">{item.text}</span>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            {/* subtle bottom glow */}
            <span
              className="absolute bottom-0 left-0 right-0 h-[2px] opacity-40"
              style={{ background: "linear-gradient(to right, " + card.accent + ", transparent)" }}
              aria-hidden="true"
            />
          </div>
        );
      })}
    </div>
  );
}
