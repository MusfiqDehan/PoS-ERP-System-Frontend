import PurchaseReportComponent from "@/components/Reports/purchasereport";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function PurchaseReport() {
  return (
    <PermissionGuard featureKey="purchase_report">
      <PurchaseReportComponent />
    </PermissionGuard>
  );
}
