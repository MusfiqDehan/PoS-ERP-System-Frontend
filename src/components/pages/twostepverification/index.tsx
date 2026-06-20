import AuthBrandPanel from "./AuthBrandPanel";
import TwoStepVerificationFormPanel from "./TwoStepVerificationFormPanel";

export default function TwoStepVerificationPage() {
  return (
    <div className="auth-otp-page auth-two-step-verification-page">
      <div className="auth-otp-page__layout">
        <AuthBrandPanel />
        <TwoStepVerificationFormPanel />
      </div>
    </div>
  );
}
