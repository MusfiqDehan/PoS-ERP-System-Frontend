"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { OTP_LOTTIE_SRC } from "./twoStepVerificationConfig";

export default function AuthLottiePlayer() {
  return (
    <div className="auth-otp-page__lottie" aria-hidden="true">
      <DotLottieReact src={OTP_LOTTIE_SRC} loop autoplay />
    </div>
  );
}
