import SalesReportComponent from "@/components/Reports/salesreport";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function SaleReport() {
  return (
    <PermissionGuard featureKey="sales_report">
      <SalesReportComponent />
    </PermissionGuard>
  );
}
