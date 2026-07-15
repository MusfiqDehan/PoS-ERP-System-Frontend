"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AuthCardLogo } from "@/core/common/auth";
import { AuthPasswordField } from "@/core/common/form/auth";
import ResetPasswordFormHeader from "./ResetPasswordFormHeader";
import ResetPasswordPrimaryActions from "./ResetPasswordPrimaryActions";
import { isPublicMarketingHost } from "@/lib/host-context";
import {
  confirmPlatformPasswordReset,
  confirmTenantPasswordReset,
} from "@/lib/password";

export default function ResetPasswordFormPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPlatform, setIsPlatform] = useState(false);

  useEffect(() => {
    setIsPlatform(isPublicMarketingHost());
  }, []);

  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  const canSubmit = password.length >= 8 && passwordsMatch && !submitting && token.length > 0;

  async function handleSubmit() {
    if (!canSubmit) return;
    setApiError(null);
    setSubmitting(true);

    try {
      const payload = { token, password };
      const res = isPlatform
        ? await confirmPlatformPasswordReset(payload)
        : await confirmTenantPasswordReset(payload);

      if (res.ok && res.body.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/signin");
        }, 2500);
      } else {
        setApiError(
          res.body.message || "Failed to reset password. The link may have expired.",
        );
      }
    } catch {
      setApiError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!token) {
    return (
      <section className="auth-split-page__form-panel">
        <div className="auth-split-page__form auth-card-page__card">
          <div className="auth-split-page__form-top">
            <div className="auth-split-page__form-main">
              <div className="auth-split-page__form-header auth-card-page__header">
                <AuthCardLogo />
                <h1 className="auth-split-page__form-title auth-split-page__form-title--mixed">
                  Invalid link
                </h1>
                <p className="auth-split-page__form-subtitle">
                  No reset token found. Please request a new password reset link.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="auth-split-page__form-panel">
      <form
        className="auth-split-page__form auth-card-page__card"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <div className="auth-split-page__form-top">
          <div className="auth-split-page__form-main">
            <ResetPasswordFormHeader isPlatform={isPlatform} />

            {success ? (
              <div className="mb-[16px] rounded-[6px] bg-[#f1fcf5] px-[14px] py-[10px] text-[14px] leading-normal text-[#089b7c]">
                Password reset successfully. Redirecting to sign in...
              </div>
            ) : (
              <>
                {apiError && (
                  <div className="mb-[16px] rounded-[6px] bg-[#fff5f5] px-[14px] py-[10px] text-[14px] leading-normal text-[#dc3545]">
                    {apiError}
                  </div>
                )}
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
              </>
            )}
          </div>

          {!success && (
            <ResetPasswordPrimaryActions
              disabled={!canSubmit}
              submitting={submitting}
            />
          )}
        </div>
      </form>
    </section>
  );
}
