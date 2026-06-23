"use client";

import Link from "next/link";

type RegisterTermsAgreementProps = {
  agreed: boolean;
  onAgreedChange: (checked: boolean) => void;
};

export default function RegisterTermsAgreement({
  agreed,
  onAgreedChange,
}: RegisterTermsAgreementProps) {
  return (
    <div className="auth-register-page__terms">
      <label className="auth-register-page__terms-label">
        <input
          type="checkbox"
          className="auth-split-page__checkbox-input"
          checked={agreed}
          onChange={(event) => onAgreedChange(event.target.checked)}
        />
        <span className="auth-split-page__checkbox-box" aria-hidden="true" />
        <span>
          I agree to the{" "}
          <Link href="#" className="auth-register-page__terms-link">
            Terms &amp; Privacy
          </Link>
        </span>
      </label>
    </div>
  );
}
