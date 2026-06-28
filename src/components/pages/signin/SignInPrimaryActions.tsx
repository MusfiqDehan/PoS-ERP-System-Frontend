import Link from "next/link";
import { all_routes } from "@/data/all_routes";

type SignInPrimaryActionsProps = {
  disabled?: boolean;
  loading?: boolean;
};

export default function SignInPrimaryActions({
  disabled = false,
  loading = false,
}: SignInPrimaryActionsProps) {
  const route = all_routes;

  return (
    <div className="auth-split-page__primary-actions">
      <button
        type="submit"
        className="auth-split-page__submit"
        disabled={disabled || loading}
      >
        {loading ? "Signing in…" : "Sign In"}
      </button>
      <p className="auth-split-page__prompt">
        New on our platform?{" "}
        <Link href={route.register} className="auth-split-page__prompt-link">
          Create an account
        </Link>
      </p>
    </div>
  );
}
