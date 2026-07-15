import { AuthCardPageLayout } from "@/core/common/auth";
import RegisterFormPanel from "./RegisterFormPanel";

export default function RegisterPage() {
  return (
    <AuthCardPageLayout className="auth-register-page">
      <RegisterFormPanel />
    </AuthCardPageLayout>
  );
}
