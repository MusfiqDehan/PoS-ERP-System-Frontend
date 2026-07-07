import NotificationComponent from "@/components/settings/generalsettings/notification";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function Notification(){
    return(
        <PermissionGuard featureKey="general_settings"><NotificationComponent /></PermissionGuard>
    )
}