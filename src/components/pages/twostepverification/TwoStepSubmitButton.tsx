"use client";

import Link from "next/link";
import { all_routes } from "@/data/all_routes";

type TwoStepSubmitButtonProps = {
  disabled?: boolean;
};

export default function TwoStepSubmitButton({ disabled = false }: TwoStepSubmitButtonProps) {
  const route = all_routes;

  if (disabled) {
    return (
      <button type="button" className="auth-otp-page__submit" disabled>
        Submit
      </button>
    );
  }

  return (
    <Link href={route.newdashboard} className="auth-otp-page__submit">
      Submit
    </Link>
  );
}
