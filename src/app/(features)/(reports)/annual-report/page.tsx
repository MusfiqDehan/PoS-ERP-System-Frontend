import AnnualreportComponent from "@/components/Reports/annualreport";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function AnnualReport() {
  return (
    <PermissionGuard featureKey="annual_report">
      <AnnualreportComponent />
    </PermissionGuard>
  );
}
