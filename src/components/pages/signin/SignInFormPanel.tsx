"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthSocialSection } from "@/core/common/auth";
import { AuthEmailField, AuthPasswordField } from "@/core/common/form/auth";
import { all_routes } from "@/data/all_routes";
import { saveSession } from "@/lib/auth-session";
import { collectErrorMessages } from "@/lib/api";
import {
  getTenantSubdomainFromHost,
  isPublicMarketingHost,
} from "@/lib/host-context";
import { platformLogin } from "@/lib/platform-auth";
import { tenantLogin } from "@/lib/tenant-auth";
import SignInFormHeader from "./SignInFormHeader";
import SignInFormOptions from "./SignInFormOptions";
import SignInPrimaryActions from "./SignInPrimaryActions";

/** Extract the subdomain from a hostname (e.g. "robin.sortorium.com" → "robin"). */
function extractSubdomain(host: string): string {
  const parts = host.split(".");
  if (parts.length > 2) return parts[0];
  return "";
}

export default function SignInFormPanel() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const tenantSubdomain = getTenantSubdomainFromHost();
  const isTenantHost = !isPublicMarketingHost() && tenantSubdomain.length > 0;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading || !email.trim() || !password) return;

    setErrors([]);
    setLoading(true);

    try {
      if (isTenantHost) {
        const { ok, body } = await tenantLogin(
          email.trim(),
          password,
          tenantSubdomain,
        );
        if (ok && body.success && body.data) {
          saveSession({
            access: body.data.access,
            refresh: body.data.refresh,
            kind: "tenant",
          });
          router.push(all_routes.newdashboard);
          return;
        }
        setErrors(collectErrorMessages(body));
        return;
      }

      const { ok, body } = await platformLogin(email.trim(), password);
      if (ok && body.success && body.data) {
        saveSession({
          access: body.data.access,
          refresh: body.data.refresh,
          kind: "platform",
        });
        router.push(all_routes.vendorDashboard);
        return;
      }
      setErrors(collectErrorMessages(body));
    } finally {
      setLoading(false);
    }
  };

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const canSubmit = useMemo(
    () => email.trim().length > 0 && password.length > 0 && !loading,
    [email, password, loading],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    setErrors([]);
    setLoading(true);

    try {
      const hostname =
        typeof window !== "undefined" ? window.location.hostname : "";
      const subdomain = extractSubdomain(hostname);

      const { ok, body } = await login({
        email: email.trim(),
        password,
        subdomain: subdomain || undefined,
        domain: subdomain ? undefined : hostname || undefined,
      });

      if (ok && body.success) {
        router.push(all_routes.newdashboard);
      } else {
        setErrors(collectErrorMessages(body));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-split-page__form-panel">
      <form className="auth-split-page__form" onSubmit={handleSubmit}>
        <div className="auth-split-page__form-top">
          <div className="auth-split-page__form-main">
            <SignInFormHeader />

            {isTenantHost ? (
              <p className="auth-form-field__hint">
                Signing in to <strong>{tenantSubdomain}</strong> workspace.
              </p>
            ) : (
              <p className="auth-form-field__hint">
                Platform administrator sign-in.
              </p>
            )}

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

            <div className="auth-split-page__credentials">
              <AuthEmailField
                id="sign-in-email"
                value={email}
                onChange={setEmail}
              />
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

          <SignInPrimaryActions loading={loading} />
        </div>

        <AuthSocialSection />
      </form>
    </section>
  );
}
