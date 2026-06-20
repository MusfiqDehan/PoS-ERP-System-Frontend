"use client";

import OtpCountdownTimer from "@/components/pages/twostepverification/OtpCountdownTimer";
import OtpDigitInputs from "@/components/pages/twostepverification/OtpDigitInputs";
import OtpResendPrompt from "@/components/pages/twostepverification/OtpResendPrompt";
import { useOtpCountdown } from "@/components/pages/twostepverification/useOtpCountdown";
import { useOtpDigits } from "@/components/pages/twostepverification/useOtpDigits";
import { OTP_COUNTDOWN_SECONDS } from "./emailVerificationConfig";
import EmailOtpFormHeader from "./EmailOtpFormHeader";
import VerifyProceedButton from "./VerifyProceedButton";

export default function EmailOtpFormPanel() {
  const { digits, inputRefs, isComplete, updateDigit, handleKeyDown, handlePaste } =
    useOtpDigits();
  const { formattedTime, canResend, reset, secondsLeft } = useOtpCountdown(
    OTP_COUNTDOWN_SECONDS,
  );

  return (
    <section className="auth-otp-page__form-panel">
      <div className="auth-otp-page__form-body">
        <div className="auth-otp-page__form-main">
          <EmailOtpFormHeader />

          <div className="auth-otp-page__form-fields">
            <OtpDigitInputs
              digits={digits}
              inputRefs={inputRefs}
              onDigitChange={updateDigit}
              onDigitKeyDown={handleKeyDown}
              onPaste={handlePaste}
            />

            <div className="auth-otp-page__form-meta">
              {secondsLeft > 0 && <OtpCountdownTimer formattedTime={formattedTime} />}
              <OtpResendPrompt canResend={canResend} onResend={reset} />
            </div>
          </div>
        </div>

        <VerifyProceedButton disabled={!isComplete} />
      </div>
    </section>
  );
}
