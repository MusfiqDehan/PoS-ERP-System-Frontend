import TaxRatesComponent from "@/components/settings/financialsettings/taxrates";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function TaxRate() {
  return (
    <PermissionGuard featureKey="financial_settings">
      <TaxRatesComponent />
    </PermissionGuard>
  );
}
