"use client";
/* eslint-disable @next/next/no-img-element */

import TextField from "@/core/common/form/TextField";
import { Download } from "react-feather";

type BarcodePreviewSectionProps = {
  barcode: string;
  barcodeSymbology: string;
  imageBase64: string | null;
  effectiveSymbology: string | null;
  loading: boolean;
  error: string | null;
  onBarcodeChange: (value: string) => void;
  onGenerateBarcode: () => void;
  onDownload: () => void;
  disabled?: boolean;
};

export default function BarcodePreviewSection({
  barcode,
  barcodeSymbology,
  imageBase64,
  effectiveSymbology,
  loading,
  error,
  onBarcodeChange,
  onGenerateBarcode,
  onDownload,
  disabled,
}: BarcodePreviewSectionProps) {
  return (
    <div className="sm:col-span-2">
      <TextField
        label="Barcode"
        value={barcode}
        onChange={(e) => onBarcodeChange(e.target.value)}
        inputClassName="list"
        action={{
          label: loading ? "Generating…" : "Generate",
          type: "button",
          onClick: onGenerateBarcode,
        }}
        disabled={disabled || loading}
        placeholder="Enter or generate a unique barcode"
      />

      {(imageBase64 || loading || error) && (
        <div className="mt-4 p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="m-0 text-[12px] font-semibold uppercase tracking-wide text-[#94A3B8]">
                Barcode Preview
              </p>
              {effectiveSymbology && (
                <p className="m-0 mt-1 text-[12px] text-[#64748B]">
                  Symbology: {effectiveSymbology}
                  {effectiveSymbology !== barcodeSymbology ? " (adjusted for code format)" : ""}
                </p>
              )}
            </div>
            {imageBase64 && (
              <button
                type="button"
                onClick={onDownload}
                disabled={disabled}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] font-medium text-[#0F172A] hover:border-[#0ac79e] hover:text-[#0ac79e] transition-colors disabled:opacity-50"
              >
                <Download size={14} />
                Download PNG
              </button>
            )}
          </div>

          {error && <p className="mt-2 mb-0 text-[13px] text-[#c80000]">{error}</p>}

          <div className="mt-3 flex justify-center min-h-[80px] items-center bg-white rounded-lg border border-[#F1F5F9] p-4">
            {loading && !imageBase64 ? (
              <span className="text-[13px] text-[#94A3B8]">Rendering barcode…</span>
            ) : imageBase64 ? (
              <img
                src={`data:image/png;base64,${imageBase64}`}
                alt={`Barcode ${barcode}`}
                className="max-h-[100px] max-w-full"
              />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
