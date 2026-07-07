"use client";

import { useEffect, useState } from "react";
import {
  fetchPublicScan,
  PUBLIC_SCAN_FIELD_LABELS,
  type PublicScanDetails,
  type PublicScanResult,
} from "@/lib/scan";
import { PRODUCT_NAME } from "@/lib/branding";

type PublicScanPageProps = {
  code: string;
};

function formatDetailValue(key: keyof PublicScanDetails, value: string | number): string {
  if (key === "price") {
    const text = String(value);
    return text.startsWith("Price:") ? text : `Price: ${text}`;
  }
  if (key === "unit_quantity") {
    return String(value);
  }
  return String(value);
}

function entityLabel(entityType: PublicScanResult["entity_type"]): string {
  if (entityType === "package") return "Package";
  if (entityType === "variant") return "Variant";
  return "Product";
}

export default function PublicScanPage({ code }: PublicScanPageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PublicScanResult | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      const response = await fetchPublicScan(code);
      if (cancelled) return;

      if (!response.ok || !response.body.data) {
        setError(response.body.message ?? "Product not found.");
        setResult(null);
      } else {
        setResult(response.body.data);
      }
      setLoading(false);
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [code]);

  const detailEntries = result
    ? (Object.entries(result.details) as [keyof PublicScanDetails, string | number][])
        .filter(([, value]) => value !== "" && value !== null && value !== undefined)
    : [];

  const title =
    result?.details.product_name ??
    result?.details.package_name ??
    "Product details";

  return (
    <div className="min-h-screen bg-[#f6f8fa] flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-[12px] border border-[#e7e7e7] bg-white shadow-sm overflow-hidden">
        <div className="border-b border-[#f1f1f1] px-5 py-4">
          <p className="m-0 text-[12px] uppercase tracking-wide text-[#889096]">
            {PRODUCT_NAME}
          </p>
          <h1 className="m-0 mt-1 text-[20px] font-bold text-[#212B36]">
            {loading ? "Loading…" : title}
          </h1>
          {result && (
            <p className="m-0 mt-1 text-[13px] text-[#646B72]">
              {entityLabel(result.entity_type)} information
            </p>
          )}
        </div>

        <div className="px-5 py-5">
          {loading && (
            <div className="flex items-center justify-center py-10">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#e7e7e7] border-t-[#0ac79e]" />
            </div>
          )}

          {!loading && error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
              {error}
            </div>
          )}

          {!loading && result && detailEntries.length > 0 && (
            <dl className="m-0 space-y-3">
              {detailEntries.map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-start justify-between gap-4 border-b border-[#f6f6f6] pb-3 last:border-b-0 last:pb-0"
                >
                  <dt className="text-[13px] font-medium text-[#646B72]">
                    {PUBLIC_SCAN_FIELD_LABELS[key]}
                  </dt>
                  <dd className="m-0 text-right text-[14px] font-semibold text-[#212B36]">
                    {formatDetailValue(key, value)}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {!loading && result && detailEntries.length === 0 && (
            <p className="m-0 text-[14px] text-[#646B72]">
              No public details are available for this item.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
