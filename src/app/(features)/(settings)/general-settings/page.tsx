import GeneralSettingsComponent from "@/components/settings/generalsettings/generalsettings";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function GeneralSettings(){
    return(
        <PermissionGuard featureKey="general_settings"><GeneralSettingsComponent /></PermissionGuard>
    )
}