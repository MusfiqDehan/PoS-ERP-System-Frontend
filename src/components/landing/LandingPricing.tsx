"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { all_routes } from "@/data/all_routes";
import { fetchPublicPackages, type PublicPackage } from "@/lib/billing";

type BillingCycle = "monthly" | "yearly";

function formatPrice(amount: string, cycle: BillingCycle): string {
  const value = Number.parseFloat(amount);
  if (Number.isNaN(value) || value === 0) {
    return "Free";
  }
  return `$${value.toFixed(0)}`;
}

export default function LandingPricing() {
  const [packages, setPackages] = useState<PublicPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cycle, setCycle] = useState<BillingCycle>("monthly");

  useEffect(() => {
    let active = true;
    fetchPublicPackages().then(({ ok, body }) => {
      if (!active) return;
      if (ok && body.success && body.data?.items) {
        setPackages(body.data.items);
      } else {
        setError("Unable to load pricing right now. You can still register.");
      }
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="landing-page__pricing" id="pricing">
      <h2 className="landing-page__section-title">Simple, transparent pricing</h2>
      <p className="landing-page__section-subtitle">
        Choose a plan and launch your workspace in minutes.
      </p>

      <div className="landing-page__billing-toggle">
        <span>Monthly</span>
        <div className="form-check form-switch m-0">
          <input
            className="form-check-input"
            type="checkbox"
            id="landing-billing-cycle"
            checked={cycle === "yearly"}
            onChange={(event) =>
              setCycle(event.target.checked ? "yearly" : "monthly")
            }
          />
        </div>
        <span>Yearly</span>
      </div>

      {loading ? (
        <p className="landing-page__status">Loading plans…</p>
      ) : error && packages.length === 0 ? (
        <p className="landing-page__status">{error}</p>
      ) : (
        <div className="landing-page__pricing-grid">
          {packages.map((pkg, index) => {
            const price =
              cycle === "monthly" ? pkg.price_monthly : pkg.price_yearly;
            const period = cycle === "monthly" ? "per month" : "per year";
            return (
              <article
                key={pkg.slug}
                className={`landing-page__pricing-card${
                  index === 1 ? " landing-page__pricing-card--featured" : ""
                }`}
              >
                <p className="landing-page__pricing-name">{pkg.name}</p>
                <p className="landing-page__pricing-price">
                  {formatPrice(price, cycle)}
                </p>
                <p className="landing-page__pricing-period">{period}</p>
                {pkg.description ? <p>{pkg.description}</p> : null}
                <ul className="landing-page__pricing-features">
                  <li>
                    <span className="landing-page__pricing-check">✓</span>
                    Up to {pkg.max_users} users
                  </li>
                  <li>
                    <span className="landing-page__pricing-check">✓</span>
                    Up to {pkg.max_branches} branches
                  </li>
                  {pkg.features.slice(0, 4).map((feature) => (
                    <li key={feature.key}>
                      <span className="landing-page__pricing-check">✓</span>
                      {feature.name}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`${all_routes.register}?plan=${encodeURIComponent(pkg.slug)}`}
                  className="landing-page__btn landing-page__btn--primary w-100"
                >
                  {pkg.is_trial ? "Start trial" : "Get started"}
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
