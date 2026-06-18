import ImageWithBasePath from "@/core/common/image-with-base-path";
import { PRODUCT_NAME } from "@/lib/branding";
import AuthLottiePlayer from "./AuthLottiePlayer";
import { AUTH_BRAND_LOGO_SRC } from "./authPageConfig";

type AuthBrandPanelProps = {
  lottieSrc?: string;
};

export default function AuthBrandPanel({ lottieSrc }: AuthBrandPanelProps) {
  return (
    <aside className="auth-split-page__brand-panel">
      <div className="auth-split-page__brand-logo-wrap">
        <ImageWithBasePath
          src={AUTH_BRAND_LOGO_SRC}
          alt={PRODUCT_NAME}
          width={294}
          height={64}
          className="auth-split-page__brand-logo"
        />
      </div>
      <AuthLottiePlayer src={lottieSrc} />
    </aside>
  );
}
