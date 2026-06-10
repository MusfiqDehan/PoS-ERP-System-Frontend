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
    <div className="low-stock-alert" role="alert">
      <div className="low-stock-alert__inner">
        <div className="low-stock-alert__content">
          <ImageWithBasePath
            src={lowStockAlertData.infoIconSrc}
            alt=""
            width={24}
            height={24}
            className="low-stock-alert__icon"
          />
          <p className="low-stock-alert__text">
            Your product{" "}
            <span className="low-stock-alert__highlight">
              {lowStockAlertData.productName} is running Low,
            </span>{" "}
            already below {lowStockAlertData.threshold},{" "}
            <Link
              href={lowStockAlertData.addStockHref}
              className="low-stock-alert__link"
            >
              Add Stock.
            </Link>
          </p>
        </div>
        <button
          type="button"
          className="low-stock-alert__close"
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
