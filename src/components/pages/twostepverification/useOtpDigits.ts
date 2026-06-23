"use client";

import { useCallback, useRef, useState } from "react";
import { OTP_LENGTH } from "./twoStepVerificationConfig";

export function useOtpDigits(length = OTP_LENGTH) {
  const [digits, setDigits] = useState<string[]>(() => Array.from({ length }, () => ""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const focusInput = useCallback((index: number) => {
    inputRefs.current[index]?.focus();
  }, []);

  const updateDigit = useCallback(
    (index: number, value: string) => {
      const nextDigit = value.replace(/\D/g, "").slice(-1);
      setDigits((current) => {
        const next = [...current];
        next[index] = nextDigit;
        return next;
      });

      if (nextDigit && index < length - 1) {
        focusInput(index + 1);
      }
    },
    [focusInput, length],
  );

  const handleKeyDown = useCallback(
    (index: number, key: string) => {
      if (key !== "Backspace") {
        return;
      }

      setDigits((current) => {
        if (current[index]) {
          const next = [...current];
          next[index] = "";
          return next;
        }

        if (index > 0) {
          focusInput(index - 1);
          const next = [...current];
          next[index - 1] = "";
          return next;
        }

        return current;
      });
    },
    [focusInput],
  );

  const handlePaste = useCallback(
    (text: string) => {
      const pasted = text.replace(/\D/g, "").slice(0, length).split("");
      if (pasted.length === 0) {
        return;
      }

      setDigits((current) => {
        const next = [...current];
        pasted.forEach((digit, index) => {
          next[index] = digit;
        });
        return next;
      });

      focusInput(Math.min(pasted.length, length - 1));
    },
    [focusInput, length],
  );

  const isComplete = digits.every((digit) => digit.length === 1);
  const value = digits.join("");

  return {
    digits,
    inputRefs,
    isComplete,
    value,
    updateDigit,
    handleKeyDown,
    handlePaste,
  };
}
