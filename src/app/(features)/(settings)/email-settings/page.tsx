import EmailSettingsComponent from "@/components/settings/systemsettings/emailsettings";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function EmailSettings() {
  return (
    <PermissionGuard featureKey="system_settings">
      <EmailSettingsComponent />
    </PermissionGuard>
  );
}
