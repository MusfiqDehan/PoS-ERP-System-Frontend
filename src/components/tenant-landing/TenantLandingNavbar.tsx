"use client";

import Link from "next/link";
import { all_routes } from "@/data/all_routes";
import type { PublicTenantLanding } from "@/lib/tenant-landing";

type Props = {
  data: PublicTenantLanding;
};

export default function TenantLandingNavbar({ data }: Props) {
  const logo = data.company_logo?.url;
  const cta = data.landing_page.primary_cta;

  return (
    <header className="tenant-landing__header">
      <div className="tenant-landing__header-inner">
        <Link href="/" className="tenant-landing__brand">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logo}
              alt={data.name}
              className="tenant-landing__brand-logo"
            />
          ) : null}
          <span className="tenant-landing__brand-name">{data.name}</span>
        </Link>
        <Link
          href={cta?.url || all_routes.signin}
          className="tenant-landing__header-cta"
        >
          {cta?.label || "Sign In"}
        </Link>
      </div>
    </header>
  );
}
