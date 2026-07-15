"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AuthCardLogo } from "@/core/common/auth";
import { AuthPasswordField } from "@/core/common/form/auth";

type Props = {
  token: string;
  invitation: ValidateInvitationTokenResult;
};

export default function EmployeeInviteFormPanel({ token, invitation }: Props) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  const canSubmit = password.length >= 8 && passwordsMatch;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    setSubmitting(true);

    try {
      const res = await acceptEmployeeInvitation({ token, password });
      if (res.ok && res.body.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/signin");
        }, 2000);
      } else {
        setError(res.body.message || "Failed to set password. The invitation may have expired.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="auth-split-page__form-panel">
      <form className="auth-split-page__form auth-card-page__card" onSubmit={handleSubmit}>
        <div className="auth-split-page__form-top">
          <div className="auth-split-page__form-main">
            <div className="auth-split-page__form-header auth-card-page__header">
              <AuthCardLogo />
              <h1 className="auth-split-page__form-title auth-split-page__form-title--mixed">
                Accept invitation
              </h1>
              <p className="auth-split-page__form-subtitle">
                {invitation.company_name
                  ? `You have been invited to join ${invitation.company_name}`
                  : "You have been invited to join this workspace"}
                {invitation.role_name ? ` as ${invitation.role_name}` : ""}
                {invitation.branch_name ? ` at ${invitation.branch_name}` : ""}.
              </p>
              <p className="auth-split-page__form-subtitle" style={{ fontWeight: 500 }}>
                {invitation.full_name || invitation.email}, set your password to get started.
              </p>
            </div>

            {error && (
              <div className="mb-[16px] rounded-[6px] bg-[#fff5f5] px-[14px] py-[10px] text-[14px] leading-normal text-[#dc3545]">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-[16px] rounded-[6px] bg-[#f1fcf5] px-[14px] py-[10px] text-[14px] leading-normal text-[#089b7c]">
                Password set successfully. Redirecting to sign in...
              </div>
            )}

            <div className="auth-split-page__credentials">
              <AuthPasswordField
                id="invite-password"
                value={password}
                onChange={setPassword}
                autoComplete="new-password"
              />
              <AuthPasswordField
                label="Confirm Password"
                id="invite-confirm-password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                autoComplete="new-password"
              />
            </div>
          </div>

          <div className="auth-split-page__primary-actions">
            <button
              type="submit"
              className="auth-split-page__submit"
              disabled={!canSubmit || submitting}
            >
              {submitting ? "Setting password..." : "Set Password & Sign In"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
