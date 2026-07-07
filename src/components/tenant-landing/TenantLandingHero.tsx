import Link from "next/link";
import { all_routes } from "@/data/all_routes";
import type { PublicTenantLanding } from "@/lib/tenant-landing";

type Props = {
  data: PublicTenantLanding;
};

export default function TenantLandingHero({ data }: Props) {
  const { landing_page: page, hero_image: hero } = data;
  const primary = page.primary_cta || {
    label: "Sign In",
    url: all_routes.signin,
  };
  const secondary = page.secondary_cta;

  return (
    <section className="tenant-landing__hero">
      <div className="tenant-landing__hero-copy">
        <p className="tenant-landing__eyebrow">{data.name}</p>
        <h1 className="tenant-landing__headline">
          {page.headline || `Welcome to ${data.name}`}
        </h1>
        {page.description ? (
          <p className="tenant-landing__description">{page.description}</p>
        ) : null}
        <div className="tenant-landing__actions">
          <Link
            href={primary.url}
            className="tenant-landing__btn tenant-landing__btn--primary"
          >
            {primary.label}
          </Link>
          {secondary ? (
            <Link
              href={secondary.url}
              className="tenant-landing__btn tenant-landing__btn--secondary"
            >
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
      <div className="tenant-landing__hero-media">
        {hero?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hero.url}
            alt={page.headline || data.name}
            className="tenant-landing__hero-image"
          />
        ) : (
          <div className="tenant-landing__hero-placeholder" aria-hidden="true">
            {data.name}
          </div>
        )}
      </div>
    </section>
  );
}
