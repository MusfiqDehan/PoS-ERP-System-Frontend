import { PermissionGuard } from "@/components/auth/PermissionGuard";
import UsersComponent from "@/components/usermanagement/users";

export default function Users() {
  return (
    <PermissionGuard featureKey="users">
      <UsersComponent />
    </PermissionGuard>
  );
}
