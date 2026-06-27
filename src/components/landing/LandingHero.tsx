import Link from "next/link";
import { all_routes } from "@/data/all_routes";
import { PRODUCT_DESCRIPTION, PRODUCT_NAME } from "@/lib/branding";

export default function LandingHero() {
  return (
    <section className="landing-page__hero">
      <h1 className="landing-page__hero-title">{PRODUCT_NAME}</h1>
      <p className="landing-page__hero-subtitle">{PRODUCT_DESCRIPTION}</p>
      <div className="landing-page__hero-actions">
        <Link
          href={all_routes.signin}
          className="landing-page__btn landing-page__btn--ghost"
        >
          Login
        </Link>
        <Link
          href={all_routes.register}
          className="landing-page__btn landing-page__btn--primary"
        >
          Register
        </Link>
      </div>
    </section>
  );
}
