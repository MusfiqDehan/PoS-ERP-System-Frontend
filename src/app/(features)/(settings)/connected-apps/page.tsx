import ConnectedAppsComponent from "@/components/settings/generalsettings/connectedapps";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function ConnectedApps() {
  return (
    <PermissionGuard featureKey="general_settings">
      <ConnectedAppsComponent />
    </PermissionGuard>
  );
}
