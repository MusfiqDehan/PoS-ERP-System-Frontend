"use client";

import { useState } from "react";
import { AuthSocialSection } from "@/core/common/auth";
import {
  AuthEmailField,
  AuthPasswordField,
  AuthTextField,
} from "@/core/common/form/auth";
import RegisterFormHeader from "./RegisterFormHeader";
import RegisterPrimaryActions from "./RegisterPrimaryActions";
import RegisterTermsAgreement from "./RegisterTermsAgreement";

export default function RegisterFormPanel() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const canSubmit =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword &&
    agreedToTerms;

  return (
    <section className="auth-split-page__form-panel">
      <form
        className="auth-split-page__form"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="auth-split-page__form-top">
          <div className="auth-split-page__form-main">
            <RegisterFormHeader />

            <div className="auth-split-page__credentials">
              <AuthTextField
                label="Name"
                required
                id="register-name"
                value={name}
                onChange={setName}
                autoComplete="name"
              />
              <AuthEmailField
                label="Email Address"
                id="register-email"
                value={email}
                onChange={setEmail}
              />
              <AuthPasswordField
                id="register-password"
                value={password}
                onChange={setPassword}
                autoComplete="new-password"
              />
              <div className="auth-split-page__password-group">
                <AuthPasswordField
                  label="Confirm Password"
                  id="register-confirm-password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  autoComplete="new-password"
                />
                <RegisterTermsAgreement
                  agreed={agreedToTerms}
                  onAgreedChange={setAgreedToTerms}
                />
              </div>
            </div>
          </div>

          <RegisterPrimaryActions disabled={!canSubmit} />
        </div>

        <AuthSocialSection />
      </form>
    </section>
  );
}
