"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import { posProductsPanelAssets } from "../posProductsData";
import { POS_OPEN_SCAN_EVENT } from "@/lib/posScanEvents";

type Props = {
  onBarcodeScan?: (code: string) => void;
};

export default function ToolbarScan({ onBarcodeScan }: Props) {
  const [showInput, setShowInput] = useState(false);
  const [barcodeValue, setBarcodeValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(() => {
    const code = barcodeValue.trim();
    if (code && onBarcodeScan) {
      onBarcodeScan(code);
      setBarcodeValue("");
      setShowInput(false);
    }
  }, [barcodeValue, onBarcodeScan]);

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  useEffect(() => {
    const openScan = () => setShowInput(true);
    window.addEventListener(POS_OPEN_SCAN_EVENT, openScan);
    return () => window.removeEventListener(POS_OPEN_SCAN_EVENT, openScan);
  }, []);

  return (
    <div className="pos-products-panel__scan-wrapper" style={{ position: "relative" }}>
      <button
        type="button"
        className="pos-products-panel__action-btn"
        onClick={() => setShowInput(!showInput)}
      >
        <ImageWithBasePath
          src={posProductsPanelAssets.scan}
          alt=""
          width={16}
          height={16}
          className="pos-products-panel__action-icon"
        />
        <span>Scan</span>
      </button>
      {showInput && (
        <div
          className="pos-barcode-input-popover"
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            zIndex: 1050,
            background: "#fff",
            border: "1px solid #e7e7e7",
            borderRadius: 8,
            padding: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            minWidth: 240,
          }}
        >
          <label className="form-label small fw-semibold mb-1">Barcode / SKU</label>
          <div className="input-group input-group-sm">
            <input
              ref={inputRef}
              type="text"
              className="form-control"
              placeholder="Scan or type barcode..."
              value={barcodeValue}
              onChange={(e) => setBarcodeValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
            />
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              <i className="ti ti-search" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
