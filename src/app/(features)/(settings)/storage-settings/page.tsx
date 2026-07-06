import StorageSettingsComponent from "@/components/settings/othersettings/storagesettings";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function StorageSettings() {
  return (
    <PermissionGuard featureKey="general_settings">
      <StorageSettingsComponent />
    </PermissionGuard>
  );
}
