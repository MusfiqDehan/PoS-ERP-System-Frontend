import { MASKED_EMAIL } from "./emailVerificationConfig";

export default function EmailOtpFormHeader() {
  return (
    <div className="auth-otp-page__form-header">
      <h1 className="auth-otp-page__form-title">Email OTP Verification</h1>
      <p className="auth-otp-page__form-subtitle">
        OTP sent to your Email Address ending&nbsp;{MASKED_EMAIL}
      </p>
    </div>
  );
}
