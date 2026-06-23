import { AuthBrandPanel, AUTH_RESET_PASSWORD_LOTTIE_SRC } from "@/core/common/auth";
import ResetPasswordFormPanel from "./ResetPasswordFormPanel";

export default function ResetPasswordPage() {
  return (
    <div className="auth-split-page auth-reset-password-page">
      <div className="auth-split-page__layout">
        <AuthBrandPanel lottieSrc={AUTH_RESET_PASSWORD_LOTTIE_SRC} />
        <ResetPasswordFormPanel />
      </div>
    </div>
  );
}
