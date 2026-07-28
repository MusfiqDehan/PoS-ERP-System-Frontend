"use client";

import {
  usePosSerialScanner,
  type SerialScannerStatus,
} from "@/hooks/pos/usePosSerialScanner";

type Props = {
  onBarcodeScan: (code: string) => void;
};

function statusLabel(status: SerialScannerStatus): string {
  switch (status) {
    case "connected":
      return "Connected (USB serial)";
    case "connecting":
      return "Connecting…";
    case "disconnected":
      return "Not connected";
    case "unsupported":
      return "Serial API not available — use Chrome or Edge";
    case "error":
      return "Connection error";
    default:
      return status;
  }
}

export default function PosScannerPanel({ onBarcodeScan }: Props) {
  const scanner = usePosSerialScanner({ onScan: onBarcodeScan });

  return (
    <div
      className="pos-scanner-panel alert alert-light border py-2 px-3 mb-0 mx-3 mt-2"
      role="region"
      aria-label="Barcode scanner"
    >
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
        <div className="small">
          <strong>Barcode scanner</strong>
          <span
            className={`ms-2 badge ${
              scanner.status === "connected"
                ? "bg-success"
                : scanner.status === "error"
                  ? "bg-danger"
                  : "bg-secondary"
            }`}
          >
            {statusLabel(scanner.status)}
          </span>
          <p className="text-muted mb-0 mt-1">
            The YT-100 has no screen — a beep means it read a barcode. Your
            scanner is in <strong>USB serial (COM)</strong> mode, so use{" "}
            <strong>Connect USB Scanner</strong> below (Chrome/Edge), or print
            the{" "}
            <a
              href="https://img.waimaoniu.net/2470/2470-202407301633010440.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              factory restore PDF
            </a>{" "}
            to switch to keyboard mode.
          </p>
          {scanner.lastReceived && (
            <p className="mb-0 mt-1 text-success">
              Last scan received: <code>{scanner.lastReceived}</code>
            </p>
          )}
          {scanner.errorMessage && (
            <div className="mb-0 mt-2 p-2 rounded bg-danger-subtle text-danger small">
              <strong>Connection error:</strong> {scanner.errorMessage}
            </div>
          )}
        </div>

        <div className="d-flex gap-2 shrink-0">
          {scanner.status === "connected" ? (
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => void scanner.disconnect()}
            >
              Disconnect
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-sm btn-primary"
              disabled={!scanner.isSupported || scanner.status === "connecting"}
              onClick={() => void scanner.connect()}
            >
              Connect USB Scanner
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
