import ImageWithBasePath from "@/core/common/image-with-base-path";
import { PRODUCT_NAME } from "@/lib/branding";
import AuthLottiePlayer from "@/components/pages/twostepverification/AuthLottiePlayer";
import { OTP_BRAND_LOGO_SRC } from "./emailVerificationConfig";

export default function EmailVerificationBrandPanel() {
  return (
    <aside className="auth-otp-page__brand-panel">
      <div className="auth-otp-page__brand-logo-wrap">
        <ImageWithBasePath
          src={OTP_BRAND_LOGO_SRC}
          alt={PRODUCT_NAME}
          width={294}
          height={64}
          className="auth-otp-page__brand-logo"
        />
      </div>
      <AuthLottiePlayer />
    </aside>
  );
}
