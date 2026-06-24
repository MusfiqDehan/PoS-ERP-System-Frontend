"use client";

import ImageWithBasePath from "@/core/common/image-with-base-path";
import Link from "next/link";
import { useState } from "react";
import { lowStockAlertData } from "./lowStockAlertData";

export default function LowStockAlert() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
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
            <span className="text-[#089b7c]">
              {lowStockAlertData.productName} is running Low,
            </span>{" "}
            already below {lowStockAlertData.threshold},{" "}
            <Link
              href={lowStockAlertData.addStockHref}
              className="text-[#089b7c] font-medium underline hover:text-[#067a63]"
            >
              Add Stock.
            </Link>
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center p-0 border-0 bg-transparent cursor-pointer shrink-0 leading-[0]"
          aria-label="Close"
          onClick={() => setVisible(false)}
        >
          <ImageWithBasePath
            src={lowStockAlertData.closeIconSrc}
            alt=""
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
}
