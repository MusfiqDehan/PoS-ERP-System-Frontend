import EmailtemplatesettingsComponent from "@/components/settings/systemsettings/emailtemplatesettings";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function EmailTemplateSettings(){
    return(
        <PermissionGuard featureKey="system_settings"><EmailtemplatesettingsComponent /></PermissionGuard>
    )
}