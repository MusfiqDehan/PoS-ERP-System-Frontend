"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { all_routes } from "@/data/all_routes";
import { resolveProductImageUrl } from "@/lib/media";
import type { ProductListRecord } from "./types";

type Props = { record: ProductListRecord; onSelectForDelete: (r: ProductListRecord) => void };

export function ProductListProductCell({ record }: { record: ProductListRecord }) {
  const img = record.images?.[0];
  const imageSrc = img ? resolveProductImageUrl(img) : null;
  return (
    <div className="flex items-center gap-2">
      <Link href="#" className="w-10 h-10 rounded-md border border-[#f1f1f1] overflow-hidden flex items-center justify-center shrink-0">
        {imageSrc ? <img alt="" src={imageSrc} className="w-full h-full object-cover" /> : <i className="ti ti-package text-[#646B72] text-[16px]" />}
      </Link>
      <Link href="#" className="text-[14px] font-medium text-[#212B36] hover:text-[#0ac79e]">{record.name}</Link>
    </div>
  );
}

export function ProductListActionsCell({ record, onSelectForDelete }: Props) {
  const route = all_routes;
  return (
    <div className="inline-flex items-center gap-2">
      <Link href={`${route.productdetails}?id=${record.id}`} aria-label={`View ${record.name}`} className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#0ac79e] hover:border-[#0ac79e] transition-colors">
        <i className="ti ti-eye" />
      </Link>
      <Link href={`${route.editproduct}?id=${record.id}`} aria-label={`Edit ${record.name}`} className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#0ac79e] hover:border-[#0ac79e] transition-colors">
        <i className="ti ti-edit" />
      </Link>
      <Link href="#" data-bs-toggle="modal" data-bs-target="#delete-product-modal" onClick={() => onSelectForDelete(record)} className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#c80000] hover:border-[#c80000] transition-colors">
        <i className="ti ti-trash" />
      </Link>
    </div>
  );
}
