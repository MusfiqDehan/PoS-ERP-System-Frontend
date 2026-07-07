import SecuritySettingsComponent from "@/components/settings/generalsettings/securitysettings";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function SecuritySettings() {
  return (
    <PermissionGuard featureKey="general_settings">
      <SecuritySettingsComponent />
    </PermissionGuard>
  );
}
