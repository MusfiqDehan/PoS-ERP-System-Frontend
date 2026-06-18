"use client";

import { useState } from "react";
import { AuthSocialSection } from "@/core/common/auth";
import { AuthEmailField, AuthPasswordField } from "@/core/common/form/auth";
import SignInFormHeader from "./SignInFormHeader";
import SignInFormOptions from "./SignInFormOptions";
import SignInPrimaryActions from "./SignInPrimaryActions";

export default function SignInFormPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  return (
    <section className="auth-split-page__form-panel">
      <form
        className="auth-split-page__form"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="auth-split-page__form-top">
          <div className="auth-split-page__form-main">
            <SignInFormHeader />

            <div className="auth-split-page__credentials">
              <AuthEmailField id="sign-in-email" value={email} onChange={setEmail} />
              <div className="auth-split-page__password-group">
                <AuthPasswordField
                  id="sign-in-password"
                  value={password}
                  onChange={setPassword}
                />
                <SignInFormOptions
                  rememberMe={rememberMe}
                  onRememberMeChange={setRememberMe}
                />
              </div>
            </div>
          </div>

          <SignInPrimaryActions />
        </div>

        <AuthSocialSection />
      </form>
    </section>
  );
}
