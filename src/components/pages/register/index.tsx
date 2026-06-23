import { AuthBrandPanel } from "@/core/common/auth";
import RegisterFormPanel from "./RegisterFormPanel";

export default function RegisterPage() {
  return (
    <div className="auth-split-page auth-register-page">
      <div className="auth-split-page__layout">
        <AuthBrandPanel />
        <RegisterFormPanel />
      </div>
    </div>
  );
}
