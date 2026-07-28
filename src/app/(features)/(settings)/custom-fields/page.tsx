import CustomFieldsComponent from "@/components/settings/websitesettings/customfields";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function CustomFields(){
    return(
        <PermissionGuard featureKey="app_settings"><CustomFieldsComponent /></PermissionGuard>
    )
}