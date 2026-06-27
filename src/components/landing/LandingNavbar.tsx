import ImageWithBasePath from "@/core/common/image-with-base-path";
import Link from "next/link";
import { all_routes } from "@/data/all_routes";
import { PRODUCT_NAME } from "@/lib/branding";
import { AUTH_BRAND_LOGO_SRC } from "@/core/common/auth/authPageConfig";

export default function LandingNavbar() {
  return (
    <header className="landing-page__nav">
      <Link href={all_routes.landing} className="landing-page__brand">
        <ImageWithBasePath
          src={AUTH_BRAND_LOGO_SRC}
          alt={PRODUCT_NAME}
          width={140}
          height={32}
        />
      </Link>
      <ul className="landing-page__nav-links">
        <li>
          <a href="#pricing">Pricing</a>
        </li>
        <li>
          <Link href={all_routes.signin}>Login</Link>
        </li>
      </ul>
      <div className="landing-page__nav-actions">
        <Link href={all_routes.signin} className="landing-page__btn landing-page__btn--ghost">
          Login
        </Link>
        <Link
          href={all_routes.register}
          className="landing-page__btn landing-page__btn--primary"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}
