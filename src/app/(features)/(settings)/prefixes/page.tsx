import PrefixesComponent from "@/components/settings/websitesettings/prefixes";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function Prefixes() {
  return (
    <PermissionGuard featureKey="website_settings">
      <PrefixesComponent />
    </PermissionGuard>
  );
}
