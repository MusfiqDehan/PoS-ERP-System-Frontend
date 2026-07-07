import PreferenceComponent from "@/components/settings/websitesettings/preference";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function Preference(){
    return(
        <PermissionGuard featureKey="website_settings"><PreferenceComponent /></PermissionGuard>
    )
}