import Link from "next/link";
import { all_routes } from "@/data/all_routes";

type ResetPasswordPrimaryActionsProps = {
  disabled?: boolean;
};

export default function ResetPasswordPrimaryActions({
  disabled = false,
}: ResetPasswordPrimaryActionsProps) {
  const route = all_routes;

  return (
    <div className="auth-split-page__primary-actions">
      {disabled ? (
        <button type="button" className="auth-split-page__submit" disabled>
          Change Password
        </button>
      ) : (
        <Link href={route.signin} className="auth-split-page__submit">
          Change Password
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
