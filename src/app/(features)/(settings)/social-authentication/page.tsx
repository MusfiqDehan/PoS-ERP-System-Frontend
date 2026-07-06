import SocialAuthenticationComponent from "@/components/settings/websitesettings/socialauthentication";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function SocialAuthentication(){
    return(
        <PermissionGuard featureKey="website_settings"><SocialAuthenticationComponent /></PermissionGuard>
    )
}