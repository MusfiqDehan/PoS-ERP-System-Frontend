import type { LandingHighlight } from "@/lib/tenant-landing";

type Props = {
  highlights: LandingHighlight[];
};

export default function TenantLandingFeatures({ highlights }: Props) {
  if (!highlights.length) return null;

  return (
    <section className="tenant-landing__features" id="features">
      <div className="tenant-landing__features-inner">
        <h2 className="tenant-landing__section-title">What we offer</h2>
        <p className="tenant-landing__section-subtitle">
          Highlights from our business
        </p>
        <div className="tenant-landing__features-grid">
          {highlights.map(function (item, index) {
            return (
              <article
                key={`${item.title}-${index}`}
                className="tenant-landing__feature-card"
              >
                <span className="tenant-landing__feature-icon" aria-hidden="true">
                  {index + 1}
                </span>
                <h3 className="tenant-landing__feature-title">{item.title}</h3>
                {item.description ? (
                  <p className="tenant-landing__feature-desc">{item.description}</p>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
