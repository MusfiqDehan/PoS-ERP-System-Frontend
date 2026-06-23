"use client";

type OtpResendPromptProps = {
  canResend: boolean;
  onResend: () => void;
};

export default function OtpResendPrompt({ canResend, onResend }: OtpResendPromptProps) {
  return (
    <p className="auth-otp-page__resend">
      <span>Didn&apos;t get the OTP?</span>{" "}
      <button
        type="button"
        className="auth-otp-page__resend-btn"
        disabled={!canResend}
        onClick={onResend}
      >
        Resend OTP
      </button>
    </p>
  );
}
