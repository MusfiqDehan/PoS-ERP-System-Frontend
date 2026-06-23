import Link from "next/link";
import { all_routes } from "@/data/all_routes";

type RegisterPrimaryActionsProps = {
  disabled?: boolean;
};

export default function RegisterPrimaryActions({ disabled = false }: RegisterPrimaryActionsProps) {
  const route = all_routes;

  return (
    <div className="auth-split-page__primary-actions">
      {disabled ? (
        <button type="button" className="auth-split-page__submit" disabled>
          Sign Up
        </button>
      ) : (
        <Link href={route.twostepverification} className="auth-split-page__submit">
          Sign Up
        </Link>
      )}

      <p className="auth-split-page__prompt">
        Already have an account?{" "}
        <Link href={route.signin} className="auth-split-page__prompt-link">
          Sign In
        </Link>
      </p>
    </div>
  );
}
