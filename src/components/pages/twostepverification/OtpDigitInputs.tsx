"use client";

import type { MutableRefObject } from "react";
import { OTP_LENGTH } from "./twoStepVerificationConfig";

type OtpDigitInputsProps = {
  digits: string[];
  inputRefs: MutableRefObject<Array<HTMLInputElement | null>>;
  onDigitChange: (index: number, value: string) => void;
  onDigitKeyDown: (index: number, key: string) => void;
  onPaste: (text: string) => void;
};

export default function OtpDigitInputs({
  digits,
  inputRefs,
  onDigitChange,
  onDigitKeyDown,
  onPaste,
}: OtpDigitInputsProps) {
  return (
    <div className="auth-otp-page__otp-row">
      {Array.from({ length: OTP_LENGTH }, (_, index) => (
        <input
          key={index}
          ref={(element) => {
            inputRefs.current[index] = element;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={digits[index]}
          className="auth-otp-page__otp-input"
          aria-label={`OTP digit ${index + 1}`}
          onChange={(event) => onDigitChange(index, event.target.value)}
          onKeyDown={(event) => onDigitKeyDown(index, event.key)}
          onPaste={(event) => {
            event.preventDefault();
            onPaste(event.clipboardData.getData("text"));
          }}
        />
      ))}
    </div>
  );
}
