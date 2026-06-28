"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { all_routes } from "@/data/all_routes";
import { AuthPasswordField } from "@/core/common/form/auth";
import { collectErrorMessages } from "@/lib/api";
import {
  setupPassword,
  validateToken,
  type ValidatedToken,
} from "@/lib/tenancy";

type Status = "validating" | "invalid" | "ready" | "done";

export default function VerifyEmailPanel() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [status, setStatus] = useState<Status>("validating");
  const [invitation, setInvitation] = useState<ValidatedToken | null>(null);
  const [validationError, setValidationError] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loginUrl, setLoginUrl] = useState("");

  useEffect(() => {
    let active = true;

    if (!token) {
      setStatus("invalid");
      setValidationError(
        "This verification link is missing its token. Please use the link from your email.",
      );
      return;
    }

    setStatus("validating");
    validateToken(token).then(({ ok, body }) => {
      if (!active) return;
      if (ok && body.success && body.data) {
        setInvitation(body.data);
        setStatus("ready");
      } else {
        setStatus("invalid");
        setValidationError(
          collectErrorMessages(body)[0] ||
            "This verification link is invalid or has expired.",
        );
      }
    });

    return () => {
      active = false;
    };
  }, [token]);

  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const canSubmit = useMemo(
    () => password.length >= 8 && passwordsMatch && !submitting,
    [password, passwordsMatch, submitting],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    setErrors([]);
    if (password.length < 8) {
      setErrors(["Password must be at least 8 characters."]);
      return;
    }
    if (!passwordsMatch) {
      setErrors(["Passwords do not match."]);
      return;
    }

    setSubmitting(true);
    try {
      const { ok, body } = await setupPassword({
        token,
        password,
        confirm_password: confirmPassword,
      });
      if (ok && body.success) {
        const data = body.data as Record<string, unknown> | undefined;
        const url =
          (typeof data?.login_url === "string" && data.login_url) ||
          (invitation?.tenant_domain
            ? `http://${invitation.tenant_domain}/login`
            : "");
        if (url) {
          setLoginUrl(url);
        }
        setStatus("done");
      } else {
        setErrors(collectErrorMessages(body));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-split-page__form-panel">
      <div className="auth-split-page__form">
        <div className="auth-split-page__form-top">
          <div className="auth-split-page__form-main">
            <div className="auth-split-page__form-header">
              <h1 className="auth-split-page__form-title auth-split-page__form-title--mixed">
                {status === "done" ? "You're all set" : "Verify your email"}
              </h1>
              <p className="auth-split-page__form-subtitle">
                {status === "validating" &&
                  "Checking your verification link…"}
                {status === "invalid" && "We couldn't verify this link."}
                {status === "ready" &&
                  "Confirm your account by setting a password."}
                {status === "done" &&
                  "Your password is set. You can now sign in to your workspace."}
              </p>
            </div>

            {status === "validating" ? (
              <p className="auth-form-field__hint">Please wait…</p>
            ) : null}

            {status === "invalid" ? (
              <div className="alert alert-danger auth-split-page__status" role="alert">
                {validationError}
              </div>
            ) : null}

            {status === "ready" && invitation ? (
              <>
                <div className="auth-split-page__credentials">
                  <p className="auth-form-field__hint">
                    Setting up <strong>{invitation.company_name}</strong> for{" "}
                    <strong>{invitation.email}</strong> at{" "}
                    <strong>{invitation.tenant_domain}</strong>.
                  </p>

                  {errors.length > 0 ? (
                    <div
                      className="alert alert-danger auth-split-page__status"
                      role="alert"
                    >
                      {errors.length === 1 ? (
                        errors[0]
                      ) : (
                        <ul className="mb-0 ps-3">
                          {errors.map((line, index) => (
                            <li key={index}>{line}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : null}

                  <form onSubmit={handleSubmit}>
                    <AuthPasswordField
                      label="New Password"
                      id="setup-password"
                      value={password}
                      onChange={setPassword}
                      autoComplete="new-password"
                    />
                    <AuthPasswordField
                      label="Confirm Password"
                      id="setup-confirm-password"
                      value={confirmPassword}
                      onChange={setConfirmPassword}
                      autoComplete="new-password"
                    />
                    {confirmPassword.length > 0 && !passwordsMatch ? (
                      <p className="auth-form-field__hint text-danger">
                        Passwords do not match.
                      </p>
                    ) : null}

                    <div className="auth-split-page__primary-actions">
                      <button
                        type="submit"
                        className="auth-split-page__submit"
                        disabled={!canSubmit}
                      >
                        {submitting ? "Setting password…" : "Set Password"}
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : null}

            {status === "done" ? (
              <div className="auth-split-page__primary-actions">
                {loginUrl ? (
                  <a href={loginUrl} className="auth-split-page__submit">
                    Go to Sign In
                  </a>
                ) : (
                  <Link href={all_routes.signin} className="auth-split-page__submit">
                    Go to Sign In
                  </Link>
                )}
              </div>
            ) : null}

            {status === "invalid" ? (
              <p className="auth-split-page__prompt">
                Need a new link?{" "}
                <Link
                  href={all_routes.register}
                  className="auth-split-page__prompt-link"
                >
                  Register again
                </Link>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
