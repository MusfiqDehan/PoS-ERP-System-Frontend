import type { Metadata } from "next";
import PublicScanPage from "@/components/Inventory/scan/PublicScanPage";

type ScanRoutePageProps = {
  params: Promise<{ code: string }>;
};

export const metadata: Metadata = {
  title: "Product Scan",
  description: "View public product or package details from a QR code scan.",
};

export default async function ScanRoutePage({ params }: ScanRoutePageProps) {
  const { code } = await params;
  return <PublicScanPage code={decodeURIComponent(code)} />;
}
