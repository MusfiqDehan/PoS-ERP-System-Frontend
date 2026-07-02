"use client";

import { useState, useMemo } from "react";
import { AuthEmailField } from "@/core/common/form/auth";
import ForgotPasswordFormHeader from "./ForgotPasswordFormHeader";
import ForgotPasswordPrimaryActions from "./ForgotPasswordPrimaryActions";
import { isPublicMarketingHost } from "@/lib/host-context";
import {
  requestPlatformPasswordReset,
  requestTenantPasswordReset,
} from "@/lib/password";

export default function ForgotPasswordFormPanel() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const isPlatform = useMemo(() => isPublicMarketingHost(), []);

  const canSubmit = email.trim().length > 0 && !submitting;

  async function handleSubmit() {
    if (!canSubmit) return;
    setApiError(null);
    setSuccess(false);
    setSubmitting(true);

    try {
      const res = isPlatform
        ? await requestPlatformPasswordReset(email.trim())
        : await requestTenantPasswordReset(email.trim());

      if (res.ok && res.body.success) {
        setSuccess(true);
      } else {
        setApiError(res.body.message || "Something went wrong. Please try again.");
      }
    } catch {
      setApiError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="auth-split-page__form-panel">
      <form
        className="auth-split-page__form"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <div className="auth-split-page__form-top">
          <div className="auth-split-page__form-main">
            <ForgotPasswordFormHeader isPlatform={isPlatform} />

            {success ? (
              <div className="mb-[16px] rounded-[6px] bg-[#f1fcf5] px-[14px] py-[10px] text-[14px] leading-normal text-[#089b7c]">
                {isPlatform
                  ? "If your platform admin account exists, reset instructions were sent to your email."
                  : "If an account exists for this email, reset instructions were sent."}
              </div>
            ) : (
              <>
                {apiError && (
                  <div className="mb-[16px] rounded-[6px] bg-[#fff5f5] px-[14px] py-[10px] text-[14px] leading-normal text-[#dc3545]">
                    {apiError}
                  </div>
                )}
                <div className="auth-split-page__credentials">
                  <AuthEmailField
                    label="Email Address"
                    id="forgot-password-email"
                    value={email}
                    onChange={setEmail}
                  />
                </div>
              </>
            )}
          </div>

          {!success && (
            <ForgotPasswordPrimaryActions
              disabled={!canSubmit}
              submitting={submitting}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </form>
    </section>
  );
}
