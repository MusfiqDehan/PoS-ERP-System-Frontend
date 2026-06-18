import Link from "next/link";
import { all_routes } from "@/data/all_routes";

export default function SignInPrimaryActions() {
  const route = all_routes;

  return (
    <div className="auth-split-page__primary-actions">
      <Link href={route.newdashboard} className="auth-split-page__submit">
        Sign In
      </Link>
      <p className="auth-split-page__prompt">
        New on our platform?{" "}
        <Link href={route.register} className="auth-split-page__prompt-link">
          Create an account
        </Link>
      </p>
    </div>
  );
}
