import CustomerDueReportComponent from "@/components/Reports/customerduereport";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function CustomerDueReport() {
  return (
    <PermissionGuard featureKey="customer_report">
      <CustomerDueReportComponent />
    </PermissionGuard>
  );
}
