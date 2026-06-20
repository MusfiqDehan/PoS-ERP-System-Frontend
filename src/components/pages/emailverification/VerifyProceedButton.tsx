"use client";

import Link from "next/link";
import { all_routes } from "@/data/all_routes";

type VerifyProceedButtonProps = {
  disabled?: boolean;
};

export default function VerifyProceedButton({ disabled = false }: VerifyProceedButtonProps) {
  const route = all_routes;

  if (disabled) {
    return (
      <button type="button" className="auth-otp-page__submit" disabled>
        Verify &amp; Proceed
      </button>
    );
  }

  return (
    <Link href={route.newdashboard} className="auth-otp-page__submit">
      Verify &amp; Proceed
    </Link>
  );
}
