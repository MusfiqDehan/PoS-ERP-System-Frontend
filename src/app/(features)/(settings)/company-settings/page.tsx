import CompanySettingsComponent from "@/components/settings/websitesettings/companysettings";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function CompanySettings(){
    return(
        <PermissionGuard featureKey="website_settings"><CompanySettingsComponent /></PermissionGuard>
    )
}