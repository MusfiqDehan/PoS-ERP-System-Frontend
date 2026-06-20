"use client";

import { useState } from "react";
import { AuthPasswordField } from "@/core/common/form/auth";
import ResetPasswordFormHeader from "./ResetPasswordFormHeader";
import ResetPasswordPrimaryActions from "./ResetPasswordPrimaryActions";

export default function ResetPasswordFormPanel() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const canSubmit =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  return (
    <section className="auth-split-page__form-panel">
      <form
        className="auth-split-page__form"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="auth-split-page__form-top">
          <div className="auth-split-page__form-main">
            <ResetPasswordFormHeader />

            <div className="auth-split-page__credentials">
              <AuthPasswordField
                id="reset-password"
                value={password}
                onChange={setPassword}
                autoComplete="new-password"
              />
              <AuthPasswordField
                label="Confirm Password"
                id="reset-confirm-password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                autoComplete="new-password"
              />
            </div>
          </div>

          <ResetPasswordPrimaryActions disabled={!canSubmit} />
        </div>
      </form>
    </section>
  );
}
