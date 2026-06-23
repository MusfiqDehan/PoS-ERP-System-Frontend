type OtpCountdownTimerProps = {
  formattedTime: string;
};

export default function OtpCountdownTimer({ formattedTime }: OtpCountdownTimerProps) {
  return (
    <div className="auth-otp-page__timer" role="timer" aria-live="polite">
      <svg
        className="auth-otp-page__timer-icon"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.25" />
        <path
          d="M8 4.75V8L10.25 9.125"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{formattedTime}</span>
    </div>
  );
}
