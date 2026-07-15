import Link from "next/link";

import { headerContent } from "@/data/layout/header";

export default function AuthCardLogo() {
  return (
    <Link href="/" className="auth-card-page__logo-link">
      <img
        src={headerContent.logoSrc}
        alt={headerContent.logoAlt}
        className="auth-card-page__logo"
        width={180}
        height={54}
      />
    </Link>
  );
}
