"use client";

import { useCallback, useEffect, useState } from "react";
import { OTP_COUNTDOWN_SECONDS } from "./twoStepVerificationConfig";

function formatCountdown(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}s`;
}

export function useOtpCountdown(initialSeconds = OTP_COUNTDOWN_SECONDS) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }

    const timerId = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [secondsLeft]);

  const reset = useCallback(() => {
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  return {
    secondsLeft,
    formattedTime: formatCountdown(secondsLeft),
    canResend: secondsLeft === 0,
    reset,
  };
}
