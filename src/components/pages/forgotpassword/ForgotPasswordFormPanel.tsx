"use client";

import { useState } from "react";
import { AuthEmailField } from "@/core/common/form/auth";
import ForgotPasswordFormHeader from "./ForgotPasswordFormHeader";
import ForgotPasswordPrimaryActions from "./ForgotPasswordPrimaryActions";

export default function ForgotPasswordFormPanel() {
  const [email, setEmail] = useState("");

  const canSubmit = email.trim().length > 0;

  return (
    <section className="auth-split-page__form-panel">
      <form
        className="auth-split-page__form"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="auth-split-page__form-top">
          <div className="auth-split-page__form-main">
            <ForgotPasswordFormHeader />

            <div className="auth-split-page__credentials">
              <AuthEmailField
                label="Email Address"
                id="forgot-password-email"
                value={email}
                onChange={setEmail}
              />
            </div>
          </div>

          <ForgotPasswordPrimaryActions disabled={!canSubmit} />
        </div>
      </form>
    </section>
  );
}
