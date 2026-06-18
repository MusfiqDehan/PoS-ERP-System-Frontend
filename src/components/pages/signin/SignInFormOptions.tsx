"use client";

import Link from "next/link";
import { all_routes } from "@/data/all_routes";

type SignInFormOptionsProps = {
  rememberMe: boolean;
  onRememberMeChange: (checked: boolean) => void;
};

export default function SignInFormOptions({
  rememberMe,
  onRememberMeChange,
}: SignInFormOptionsProps) {
  const route = all_routes;

  return (
    <div className="auth-split-page__options">
      <label className="auth-split-page__checkbox-label">
        <input
          type="checkbox"
          className="auth-split-page__checkbox-input"
          checked={rememberMe}
          onChange={(event) => onRememberMeChange(event.target.checked)}
        />
        <span className="auth-split-page__checkbox-box" aria-hidden="true" />
        <span>Remember Me</span>
      </label>
      <Link href={route.forgotPassword} className="auth-split-page__text-link">
        Forget Password?
      </Link>
    </div>
  );
}
