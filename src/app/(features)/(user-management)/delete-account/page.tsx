import { PermissionGuard } from "@/components/auth/PermissionGuard";
import DeleteAccountComponent from "@/components/usermanagement/deleteaccount";

export default function DeleteAccount(){
    return(
        <PermissionGuard featureKey="user_management"><DeleteAccountComponent /></PermissionGuard>
    )
}