import { AuthCardLogo } from "@/core/common/auth";

type Props = {
  isPlatform?: boolean;
};

export default function ForgotPasswordFormHeader({ isPlatform = false }: Props) {
  return (
    <div className="auth-split-page__form-header auth-card-page__header">
      <AuthCardLogo />
      <h1 className="auth-split-page__form-title auth-split-page__form-title--mixed">
        Forgot password?
      </h1>
      <p className="auth-split-page__form-subtitle">
        {isPlatform
          ? "Enter your platform admin email and we will send you instructions to reset your password."
          : "If you forgot your password, we will email you instructions to reset your password."}
      </p>
    </div>
  );
}
