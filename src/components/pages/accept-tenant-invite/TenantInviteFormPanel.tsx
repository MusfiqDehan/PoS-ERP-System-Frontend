"use client";

import { useState, type FormEvent } from "react";
import { AuthCardLogo } from "@/core/common/auth";
import { AuthPasswordField } from "@/core/common/form/auth";
import { acceptTenantInvitation, type TenantInvitation } from "@/lib/platform";
import { TENANT_BASE_DOMAIN } from "@/lib/host-context";

type Props = {
  token: string;
  invitation: TenantInvitation;
};

export default function TenantInviteFormPanel({ token, invitation }: Props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;
  const canSubmit = password.length >= 8 && passwordsMatch;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    setSubmitting(true);

    try {
      const res = await acceptTenantInvitation(token, password);
      if (res.ok && res.body.success && res.body.data) {
        setSuccess(true);
        const tenantDomain = res.body.data.tenant_domain;
        setTimeout(() => {
          if (tenantDomain) {
            const scheme = window.location.protocol;
            const port = window.location.port ? `:${window.location.port}` : "";
            window.location.href = `${scheme}//${tenantDomain}${port}/signin`;
          } else {
            window.location.href = "/signin";
          }
        }, 2000);
      } else {
        setError(
          res.body.message ||
            "Failed to set up your company. The invitation may have expired.",
        );
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
                Set up {invitation.company_name}
              </h1>
              <p className="auth-split-page__form-subtitle">
                Your company workspace will be available at{" "}
                <strong>{invitation.subdomain}.{TENANT_BASE_DOMAIN}</strong>.
              </p>
              <p className="auth-split-page__form-subtitle">
                Plan: <strong className="capitalize">{invitation.plan}</strong>
                {" · "}
                Up to {invitation.max_users} users, {invitation.max_branches}{" "}
                branch{invitation.max_branches > 1 ? "es" : ""}
              </p>
              <p
                className="auth-split-page__form-subtitle"
                style={{ fontWeight: 500 }}
              >
                Create your admin password to get started.
              </p>
            </div>

            {error && (
              <div className="mb-[16px] rounded-[6px] bg-[#fff5f5] px-[14px] py-[10px] text-[14px] leading-normal text-[#dc3545]">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-[16px] rounded-[6px] bg-[#f1fcf5] px-[14px] py-[10px] text-[14px] leading-normal text-[#089b7c]">
                Company set up successfully! Redirecting to your workspace...
              </div>
            )}

            <div className="auth-split-page__credentials">
              <AuthPasswordField
                id="tenant-invite-password"
                value={password}
                onChange={setPassword}
                autoComplete="new-password"
              />
              <AuthPasswordField
                label="Confirm Password"
                id="tenant-invite-confirm-password"
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
              {submitting
                ? "Setting up workspace..."
                : "Create Password & Set Up Company"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
