import { AuthCardLogo } from "@/core/common/auth";

type SignInFormHeaderProps = {
  isPlatform?: boolean;
  tenantSubdomain?: string;
};

export default function SignInFormHeader({
  isPlatform = false,
  tenantSubdomain,
}: SignInFormHeaderProps) {

  return (
    <div className="auth-split-page__form-header auth-card-page__header">
      <AuthCardLogo />
      {isPlatform ? (
        <>
          <span className="auth-split-page__admin-badge">
            <i className="ti ti-shield-lock-filled" />
            Administration
          </span>
          <h1 className="auth-split-page__form-title">Platform Admin</h1>
          <p className="auth-split-page__form-subtitle">
            Sign in to manage tenants, billing, and platform settings.
          </p>
        </>
      ) : tenantSubdomain ? (
        <>
          <span className="auth-split-page__tenant-badge">
            <i className="ti ti-building-store" />
            Workspace
          </span>
          <h1 className="auth-split-page__form-title auth-split-page__form-title--mixed">
            Welcome Back
          </h1>
          <p className="auth-split-page__form-subtitle">
            Sign in to your Sortorium workspace to manage inventory, sales,
            and everyday retail operations.
          </p>
        </>
      ) : (
        <>
          <h1 className="auth-split-page__form-title">Sign In</h1>
          <p className="auth-split-page__form-subtitle">
            Access the Sortorium panel using your email and passcode.
          </p>
        </>
      )}
    </div>
  );
}
