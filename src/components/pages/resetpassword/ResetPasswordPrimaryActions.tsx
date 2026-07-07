import Link from "next/link";
import { all_routes } from "@/data/all_routes";

type Props = {
  disabled?: boolean;
  submitting?: boolean;
};

export default function ResetPasswordPrimaryActions({
  disabled = false,
  submitting = false,
}: Props) {
  const route = all_routes;

  return (
    <div className="auth-split-page__primary-actions">
      <button
        type="submit"
        className="auth-split-page__submit"
        disabled={disabled}
      >
        {submitting ? "Resetting..." : "Change Password"}
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
