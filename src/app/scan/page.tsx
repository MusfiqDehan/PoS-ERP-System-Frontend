import type { Metadata } from "next";
import PublicScanRoutePage from "@/components/Inventory/scan/PublicScanRoutePage";

export const metadata: Metadata = {
  title: "Product Scan",
  description: "View public product or package details from a QR code scan.",
};

export default function ScanPage() {
  return <PublicScanRoutePage />;
}
