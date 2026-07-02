import Link from "next/link";
import { all_routes } from "@/data/all_routes";

type SignInPrimaryActionsProps = {
  loading?: boolean;
  hideRegister?: boolean;
};

export default function SignInPrimaryActions({
  loading = false,
  hideRegister = false,
}: SignInPrimaryActionsProps) {
  const route = all_routes;

  return (
    <div className="auth-split-page__primary-actions">
      <button
        type="submit"
        className="auth-split-page__submit"
        disabled={loading}
      >
        {loading ? "Signing in…" : "Sign In"}
      </button>
      {!hideRegister ? (
        <p className="auth-split-page__prompt">
          New on our platform?{" "}
          <Link href={route.register} className="auth-split-page__prompt-link">
            Create an account
          </Link>
        </p>
      ) : (
        <p className="auth-split-page__prompt auth-split-page__prompt--muted">
          Platform access is invite‑only. Contact your administrator.
        </p>
      )}
    </div>
  );
}
