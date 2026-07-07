import LanguageSettingsComponent from "@/components/settings/websitesettings/languagesettings";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function LanguageSettings() {
  return (
    <PermissionGuard featureKey="website_settings">
      <LanguageSettingsComponent />
    </PermissionGuard>
  );
}
