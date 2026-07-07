"use client";

import { useEffect, useState } from "react";
import PublicScanPage from "./PublicScanPage";
import { extractPublicScanCode } from "./extractPublicScanCode";

export default function PublicScanRoutePage() {
  const [code, setCode] = useState<string | null>(null);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    setCode(extractPublicScanCode(window.location.pathname));
    setResolved(true);
  }, []);

  if (!resolved) {
    return (
      <div className="min-h-screen bg-[#f6f8fa] flex items-center justify-center p-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#e7e7e7] border-t-[#0ac79e]" />
      </div>
    );
  }

  if (!code) {
    return (
      <div className="min-h-screen bg-[#f6f8fa] flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-[12px] border border-[#e7e7e7] bg-white px-5 py-6 text-center shadow-sm">
          <h1 className="m-0 text-[18px] font-bold text-[#212B36]">
            Invalid scan link
          </h1>
          <p className="m-0 mt-2 text-[14px] text-[#646B72]">
            This QR code link is missing a product code.
          </p>
        </div>
      </div>
    );
  }

  return <PublicScanPage code={code} />;
}
