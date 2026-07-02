import Link from "next/link";
import { all_routes } from "@/data/all_routes";

type ForgotPasswordPrimaryActionsProps = {
  disabled?: boolean;
  submitting?: boolean;
};

export default function ForgotPasswordPrimaryActions({
  disabled = false,
  submitting = false,
}: ForgotPasswordPrimaryActionsProps) {
  const route = all_routes;

  return (
    <div className="auth-split-page__primary-actions">
      <button
        type="submit"
        className="auth-split-page__submit"
        disabled={disabled}
      >
        {submitting ? "Sending..." : "Submit"}
      </button>

      <p className="auth-split-page__prompt">
        Return to{" "}
        <Link href={route.signin} className="auth-split-page__prompt-link">
          Sign In
        </Link>
      </p>
    </div>
  );
}
