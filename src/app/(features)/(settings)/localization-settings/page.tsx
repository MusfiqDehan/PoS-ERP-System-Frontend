import LocalizationSettingsComponent from "@/components/settings/websitesettings/localizationsettings";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function LocalizationSettings(){
    return(
        <PermissionGuard featureKey="website_settings"><LocalizationSettingsComponent /></PermissionGuard>
    )
}