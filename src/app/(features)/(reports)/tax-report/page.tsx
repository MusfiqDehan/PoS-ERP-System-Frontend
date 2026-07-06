import TaxReportComponent from "@/components/Reports/taxreport";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function TaxReport() {
  return (
    <PermissionGuard featureKey="tax_report">
      <TaxReportComponent />
    </PermissionGuard>
  );
}