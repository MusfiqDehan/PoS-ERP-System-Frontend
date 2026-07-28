import InvoiceSettingsComponent from "@/components/settings/appsetting/invoicesettings";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function InvoiceSettings() {
  return (
    <PermissionGuard featureKey="app_settings">
      <InvoiceSettingsComponent />
    </PermissionGuard>
  );
}
