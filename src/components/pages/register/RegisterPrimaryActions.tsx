import Link from "next/link";
import { all_routes } from "@/data/all_routes";

type RegisterPrimaryActionsProps = {
  disabled?: boolean;
  loading?: boolean;
};

export default function RegisterPrimaryActions({
  disabled = false,
  loading = false,
}: RegisterPrimaryActionsProps) {
  const route = all_routes;

  return (
    <div className="auth-split-page__primary-actions">
      <button
        type="submit"
        className="auth-split-page__submit"
        disabled={disabled || loading}
      >
        {loading ? "Creating account…" : "Sign Up"}
      </button>

      <p className="auth-split-page__prompt">
        Already have an account?{" "}
        <Link href={route.signin} className="auth-split-page__prompt-link">
          Sign In
        </Link>
      </p>
    </div>
  );
}
