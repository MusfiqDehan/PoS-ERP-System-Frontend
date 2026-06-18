import { AuthBrandPanel, AuthSocialSection } from "@/core/common/auth";
import SignInFormPanel from "./SignInFormPanel";

export default function SignInPage() {
  return (
    <div className="auth-split-page">
      <div className="auth-split-page__layout">
        <AuthBrandPanel />
        <SignInFormPanel />
      </div>
    </div>
  );
}
