"use client";

import ImageWithBasePath from "@/core/common/image-with-base-path";
import Link from "next/link";
import { useState } from "react";
import { useSalesDashboardData } from "@/hooks/dashboard/useSalesDashboard";
import { all_routes } from "@/data/all_routes";
import { lowStockAlertData } from "./lowStockAlertData";

export default function LowStockAlert() {
  const { lowStock } = useSalesDashboardData();
  const [visible, setVisible] = useState(true);
  const first = lowStock[0];

  if (!visible) {
    return null;
  }

  const productName = first?.product_name ?? lowStockAlertData.productName;
  const threshold = first?.qty_alert ?? lowStockAlertData.threshold;

  if (!first && lowStock.length === 0) {
    return null;
  }

  return (
    <div
      className="w-full p-[12px] bg-[#e7fbf7] rounded-[8px] mb-[1.5rem]"
      role="alert"
    >
      <div className="flex items-center justify-between gap-[12px] w-full">
        <div className="flex items-center gap-[8px] min-w-0 flex-1">
          <ImageWithBasePath
            src={lowStockAlertData.infoIconSrc}
            alt=""
            width={24}
            height={24}
            className="block shrink-0 object-contain"
          />
          <p className="m-0 text-[16px] font-medium leading-[normal] text-[#646B72]">
            Your product{" "}
            <span className="text-[#089b7c]">{productName} is running Low,</span>{" "}
            already below {threshold},{" "}
            <Link
              href={all_routes.lowstock}
              className="text-[#089b7c] font-medium underline hover:text-[#067a63]"
            >
              Add Stock.
            </Link>
          </p>
        </div>
        <button
          type="button"
          className="shrink-0 border-0 bg-transparent p-0 cursor-pointer"
          aria-label="Dismiss low stock alert"
          onClick={() => setVisible(false)}
        >
          <ImageWithBasePath
            src={lowStockAlertData.closeIconSrc}
            alt=""
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
}
