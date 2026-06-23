import { AuthBrandPanel, AUTH_FORGOT_PASSWORD_LOTTIE_SRC } from "@/core/common/auth";
import ForgotPasswordFormPanel from "./ForgotPasswordFormPanel";

export default function ForgotPasswordPage() {
  return (
    <div className="auth-split-page auth-forgot-password-page">
      <div className="auth-split-page__layout">
        <AuthBrandPanel lottieSrc={AUTH_FORGOT_PASSWORD_LOTTIE_SRC} />
        <ForgotPasswordFormPanel />
      </div>
    </div>
  );
}
