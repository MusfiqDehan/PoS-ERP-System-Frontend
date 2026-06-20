import { MASKED_CONTACT } from "./twoStepVerificationConfig";

export default function TwoStepVerificationFormHeader() {
  return (
    <div className="auth-otp-page__form-header">
      <h1 className="auth-otp-page__form-title">2 Step Verification</h1>
      <p className="auth-otp-page__form-subtitle">
        Please enter the OTP received to confirm your account ownership. A code has been
        send to {MASKED_CONTACT}
      </p>
    </div>
  );
}
