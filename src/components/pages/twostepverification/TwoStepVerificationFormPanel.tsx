"use client";

import OtpCountdownTimer from "./OtpCountdownTimer";
import OtpDigitInputs from "./OtpDigitInputs";
import OtpResendPrompt from "./OtpResendPrompt";
import TwoStepSubmitButton from "./TwoStepSubmitButton";
import TwoStepVerificationFormHeader from "./TwoStepVerificationFormHeader";
import { OTP_COUNTDOWN_SECONDS } from "./twoStepVerificationConfig";
import { useOtpCountdown } from "./useOtpCountdown";
import { useOtpDigits } from "./useOtpDigits";

export default function TwoStepVerificationFormPanel() {
  const { digits, inputRefs, isComplete, updateDigit, handleKeyDown, handlePaste } =
    useOtpDigits();
  const { formattedTime, canResend, reset } = useOtpCountdown(OTP_COUNTDOWN_SECONDS);

  return (
    <section className="auth-otp-page__form-panel">
      <div className="auth-otp-page__form-body">
        <div className="auth-otp-page__form-main">
          <TwoStepVerificationFormHeader />

          <div className="auth-otp-page__form-fields">
            <OtpDigitInputs
              digits={digits}
              inputRefs={inputRefs}
              onDigitChange={updateDigit}
              onDigitKeyDown={handleKeyDown}
              onPaste={handlePaste}
            />

            <div className="auth-otp-page__form-meta">
              <OtpCountdownTimer formattedTime={formattedTime} />
              <OtpResendPrompt canResend={canResend} onResend={reset} />
            </div>
          </div>
        </div>

        <TwoStepSubmitButton disabled={!isComplete} />
      </div>
    </section>
  );
}
