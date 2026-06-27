"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AuthSocialSection } from "@/core/common/auth";
import { AuthEmailField, AuthTextField } from "@/core/common/form/auth";
import { collectErrorMessages } from "@/lib/api";
import { fetchPublicPackages, type PublicPackage } from "@/lib/billing";
import { registerTenant } from "@/lib/tenancy";
import RegisterFormHeader from "./RegisterFormHeader";
import RegisterPrimaryActions from "./RegisterPrimaryActions";
import RegisterTermsAgreement from "./RegisterTermsAgreement";

const SUBDOMAIN_PATTERN = /^(?!-)[a-z0-9-]{3,63}(?<!-)$/;
const TENANT_BASE_DOMAIN =
  process.env.NEXT_PUBLIC_TENANT_BASE_DOMAIN || "sortorium.com";

export default function RegisterFormPanel() {
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get("plan")?.trim().toLowerCase() || "free";

  const [companyName, setCompanyName] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [plan, setPlan] = useState(initialPlan);
  const [packages, setPackages] = useState<PublicPackage[]>([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setPlan(initialPlan);
  }, [initialPlan]);

  useEffect(() => {
    fetchPublicPackages().then(({ ok, body }) => {
      if (ok && body.success && body.data?.items) {
        setPackages(body.data.items);
      }
    });
  }, []);

  const normalizedSubdomain = subdomain.trim().toLowerCase();
  const subdomainValid = SUBDOMAIN_PATTERN.test(normalizedSubdomain);

  const canSubmit = useMemo(
    () =>
      companyName.trim().length > 0 &&
      subdomainValid &&
      email.trim().length > 0 &&
      agreedToTerms &&
      plan.length > 0,
    [companyName, subdomainValid, email, agreedToTerms, plan],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || loading) return;

    setErrors([]);
    setSuccessMessage("");

    setLoading(true);
    try {
      const { ok, body } = await registerTenant({
        subdomain: normalizedSubdomain,
        company_name: companyName.trim(),
        admin_email: email.trim(),
        admin_full_name: fullName.trim(),
        contact_phone: phone.trim(),
        plan,
      });

      if (ok && body.success) {
        setSuccessMessage(
          body.message ||
            "Registration received. Check your email to verify and set your password.",
        );
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
            <RegisterFormHeader />

            {successMessage ? (
              <div
                className="alert alert-success auth-split-page__status"
                role="status"
              >
                {successMessage}
              </div>
            ) : null}

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
              {packages.length > 0 ? (
                <div className="mb-3">
                  <label className="form-label" htmlFor="register-plan">
                    Plan
                  </label>
                  <select
                    id="register-plan"
                    className="form-select"
                    value={plan}
                    onChange={(event) => setPlan(event.target.value)}
                  >
                    {packages.map((pkg) => (
                      <option key={pkg.slug} value={pkg.slug}>
                        {pkg.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <p className="auth-form-field__hint">
                  Selected plan: <strong>{plan}</strong>
                </p>
              )}

              <AuthTextField
                label="Company Name"
                required
                id="register-company-name"
                value={companyName}
                onChange={setCompanyName}
                autoComplete="organization"
              />

              <AuthTextField
                label="Subdomain"
                required
                id="register-subdomain"
                value={subdomain}
                onChange={setSubdomain}
                autoComplete="off"
                placeholder="your-store"
              />
              {normalizedSubdomain.length > 0 && !subdomainValid ? (
                <p className="auth-form-field__hint text-danger">
                  3–63 chars: lowercase letters, numbers, and hyphens only.
                </p>
              ) : (
                normalizedSubdomain.length > 0 && (
                  <p className="auth-form-field__hint">
                    Your workspace:{" "}
                    <strong>
                      {normalizedSubdomain}.{TENANT_BASE_DOMAIN}
                    </strong>
                  </p>
                )
              )}

              <AuthTextField
                label="Full Name"
                id="register-full-name"
                value={fullName}
                onChange={setFullName}
                autoComplete="name"
              />

              <AuthEmailField
                label="Email Address"
                id="register-email"
                value={email}
                onChange={setEmail}
              />

              <AuthTextField
                label="Phone"
                id="register-phone"
                value={phone}
                onChange={setPhone}
                type="tel"
                autoComplete="tel"
              />

              <p className="auth-form-field__hint">
                After signing up, we&apos;ll email you a verification link to
                confirm your address and set your password.
              </p>

              <RegisterTermsAgreement
                agreed={agreedToTerms}
                onAgreedChange={setAgreedToTerms}
              />
            </div>
          </div>

          <RegisterPrimaryActions disabled={!canSubmit} loading={loading} />
        </div>

        <AuthSocialSection />
      </form>
    </section>
  );
}
