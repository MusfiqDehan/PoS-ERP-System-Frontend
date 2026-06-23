import Link from "next/link";
import { all_routes } from "@/data/all_routes";

type ForgotPasswordPrimaryActionsProps = {
  disabled?: boolean;
};

export default function ForgotPasswordPrimaryActions({
  disabled = false,
}: ForgotPasswordPrimaryActionsProps) {
  const route = all_routes;

  return (
    <div className="auth-split-page__primary-actions">
      {disabled ? (
        <button type="button" className="auth-split-page__submit" disabled>
          Submit
        </button>
      ) : (
        <Link href={route.resetpassword} className="auth-split-page__submit">
          Submit
        </Link>
      )}

      <p className="auth-split-page__prompt">
        Return to{" "}
        <Link href={route.signin} className="auth-split-page__prompt-link">
          Sign In
        </Link>
      </p>
    </div>
  );
}
