"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { AUTH_SIGN_IN_LOTTIE_SRC } from "./authPageConfig";

type AuthLottiePlayerProps = {
  src?: string;
};

export default function AuthLottiePlayer({
  src = AUTH_SIGN_IN_LOTTIE_SRC,
}: AuthLottiePlayerProps) {
  return (
    <div className="auth-split-page__lottie" aria-hidden="true">
      <DotLottieReact src={src} loop autoplay />
    </div>
  );
}
