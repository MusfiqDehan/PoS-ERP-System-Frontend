"use client";
/* eslint-disable @next/next/no-img-element */

import type { PurchaseOrderReportRecord } from "./types";
import Link from "next/link";

type PurchaseOrderReportRowCellProps = {
  record: PurchaseOrderReportRecord;
};

export function PurchaseOrderReportProductCell({
  record,
}: PurchaseOrderReportRowCellProps) {
  return (
    <>
      <Link href="#" className="avatar avatar-md me-2">
        <img src={record.img} alt="product" />
      </Link>
      <Link href="#">{record.productName}</Link>
    </>
  );
}
