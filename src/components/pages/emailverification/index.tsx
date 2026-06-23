import EmailOtpFormPanel from "./EmailOtpFormPanel";
import EmailVerificationBrandPanel from "./EmailVerificationBrandPanel";

export default function EmailVerificationPage() {
  return (
    <div className="auth-otp-page auth-email-verification-page">
      <div className="auth-otp-page__layout">
        <EmailVerificationBrandPanel />
        <EmailOtpFormPanel />
      </div>
    </div>
  );
}
