import SystemSettingsComponent from "@/components/settings/websitesettings/systemsettings";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function SystemSettings(){
    return(
        <PermissionGuard featureKey="website_settings"><SystemSettingsComponent /></PermissionGuard>
    )
}