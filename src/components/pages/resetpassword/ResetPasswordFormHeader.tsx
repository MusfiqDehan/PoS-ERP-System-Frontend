import { AuthCardLogo } from "@/core/common/auth";

type Props = {
  isPlatform?: boolean;
};

export default function ResetPasswordFormHeader({ isPlatform = false }: Props) {
  return (
    <div className="auth-split-page__form-header auth-card-page__header">
      <AuthCardLogo />
      <h1 className="auth-split-page__form-title auth-split-page__form-title--mixed">
        {isPlatform ? "Reset platform password?" : "Reset password?"}
      </h1>
      <p className="auth-split-page__form-subtitle">
        {isPlatform
          ? "Enter a new password for your platform admin account."
          : "Enter New Password & Confirm Password to get inside"}
      </p>
    </div>
  );
}
