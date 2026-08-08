"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AuthEmailField, AuthTextField } from "@/core/common/form/auth";
import { collectErrorMessages } from "@/lib/api";
import { fetchPublicPackages, type PublicPackage } from "@/lib/billing";
import { registerTenant } from "@/lib/tenancy";
import RegisterFormHeader from "./RegisterFormHeader";
import RegisterStepActions from "./RegisterStepActions";
import RegisterTermsAgreement from "./RegisterTermsAgreement";

const SUBDOMAIN_PATTERN = /^(?!-)[a-z0-9-]{3,63}(?<!-)$/;
const TENANT_BASE_DOMAIN =
  process.env.NEXT_PUBLIC_TENANT_BASE_DOMAIN || "shop.musfiqdehan.com";

export default function RegisterFormPanel() {
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get("plan")?.trim().toLowerCase() || "free";

  const [step, setStep] = useState<1 | 2>(1);
  const [direction, setDirection] = useState<"forward" | "back">("forward");

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

  const canProceed = useMemo(
    () => email.trim().length > 0,
    [email],
  );

  const canSubmit = useMemo(
    () =>
      companyName.trim().length > 0 &&
      subdomainValid &&
      email.trim().length > 0 &&
      agreedToTerms &&
      plan.length > 0,
    [companyName, subdomainValid, email, agreedToTerms, plan],
  );

  const goToWorkspace = () => {
    if (!canProceed) return;
    setDirection("forward");
    setStep(2);
  };

  const goToAccount = () => {
    setDirection("back");
    setStep(1);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step === 1) {
      goToWorkspace();
      return;
    }
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
      <form
        className="auth-split-page__form auth-card-page__card"
        onSubmit={handleSubmit}
      >
        <div className="auth-split-page__form-top">
          <div className="auth-split-page__form-main">
            <RegisterFormHeader />

            <div className="auth-register-page__progress" aria-hidden="true">
              <span
                className={`auth-register-page__progress-dot${step >= 1 ? " is-active" : ""}${step > 1 ? " is-done" : ""}`}
              />
              <span
                className={`auth-register-page__progress-line${step > 1 ? " is-active" : ""}`}
              />
              <span
                className={`auth-register-page__progress-dot${step >= 2 ? " is-active" : ""}`}
              />
            </div>

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

            <div className="auth-register-page__step-viewport">
              <div
                key={step}
                className={`auth-register-page__step-panel auth-register-page__step-panel--${direction}`}
              >
                {step === 1 ? (
                  <div className="auth-register-page__section">
                    <p className="auth-register-page__section-label">
                      Your Account
                    </p>

                    <AuthTextField
                      label="Full Name"
                      id="register-full-name"
                      value={fullName}
                      onChange={setFullName}
                      autoComplete="name"
                      placeholder="Your full name"
                    />

                    <AuthEmailField
                      label="Email Address"
                      required
                      id="register-email"
                      value={email}
                      onChange={setEmail}
                      placeholder="name@company.com"
                    />

                    <AuthTextField
                      label="Phone"
                      id="register-phone"
                      value={phone}
                      onChange={setPhone}
                      type="tel"
                      autoComplete="tel"
                      placeholder="+880 1712 345678"
                    />
                  </div>
                ) : (
                  <div className="auth-register-page__section">
                    <p className="auth-register-page__section-label">
                      Workspace
                    </p>

                    {packages.length > 0 ? (
                      <div className="auth-form-field">
                        <label
                          className="auth-form-field__label"
                          htmlFor="register-plan"
                        >
                          Plan{" "}
                          <span className="auth-form-field__required">*</span>
                        </label>
                        <select
                          id="register-plan"
                          className="auth-register-page__plan-select"
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
                      placeholder="Your business name"
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
                      <p className="auth-register-page__inline-hint auth-register-page__inline-hint--error">
                        3–63 chars: lowercase letters, numbers, and hyphens only.
                      </p>
                    ) : normalizedSubdomain.length > 0 ? (
                      <p className="auth-register-page__inline-hint">
                        Your workspace URL:{" "}
                        <strong>
                          {normalizedSubdomain}.{TENANT_BASE_DOMAIN}
                        </strong>
                      </p>
                    ) : null}

                    <p className="auth-register-page__inline-hint auth-register-page__inline-hint--top">
                      After signing up, we&apos;ll email you a verification link
                      to confirm your address and set your password.
                    </p>

                    <RegisterTermsAgreement
                      agreed={agreedToTerms}
                      onAgreedChange={setAgreedToTerms}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <RegisterStepActions
            step={step}
            canProceed={canProceed}
            canSubmit={canSubmit}
            loading={loading}
            onNext={goToWorkspace}
            onBack={goToAccount}
          />
        </div>
      </form>
    </section>
  );
}
