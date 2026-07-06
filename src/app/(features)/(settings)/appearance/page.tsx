import AppearanceComponent from "@/components/settings/websitesettings/appearance";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function Appearence(){
    return(
        <PermissionGuard featureKey="website_settings"><AppearanceComponent /></PermissionGuard>
    )
}