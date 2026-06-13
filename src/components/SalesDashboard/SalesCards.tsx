"use client";

import ImageWithBasePath from "@/core/common/image-with-base-path";
import {
  salesCardsAssets,
  salesStatCards,
  weeklyEarningCard,
} from "./salesCardsData";

export default function SalesCards() {
  return (
    <div className="sales-cards">
      <div className="sales-cards__row">
        <div className="sales-cards__weekly">
          <div className="sales-cards__weekly-content">
            <p className="sales-cards__weekly-title">{weeklyEarningCard.title}</p>
            <p className="sales-cards__weekly-value">{weeklyEarningCard.value}</p>
          </div>
          <ImageWithBasePath
            src={salesCardsAssets.weeklyEarningDeco}
            alt=""
            width={64}
            height={64}
            className="sales-cards__weekly-deco"
          />
          <div className="sales-cards__weekly-footer">
            <div className="sales-cards__weekly-change">
              <ImageWithBasePath
                src={salesCardsAssets.arrowUp}
                alt=""
                width={16}
                height={16}
                className="sales-cards__weekly-change-icon"
              />
              <p className="sales-cards__weekly-change-text">
                {weeklyEarningCard.changeLabel}
              </p>
            </div>
            <ImageWithBasePath
              src={salesCardsAssets.mastercard}
              alt=""
              width={36}
              height={24}
              className="sales-cards__weekly-brand"
            />
          </div>
        </div>

        {salesStatCards.map((card) => (
          <div
            key={card.id}
            className={`sales-cards__stat sales-cards__stat--${card.variant}`}
          >
            <div className="sales-cards__stat-top">
              <div className="sales-cards__stat-copy">
                <p className="sales-cards__stat-title">{card.title}</p>
                <p className="sales-cards__stat-value">{card.value}</p>
              </div>
              <button
                type="button"
                className="sales-cards__stat-refresh"
                aria-label={`Refresh ${card.title}`}
              >
                <ImageWithBasePath
                  src={salesCardsAssets.refresh}
                  alt=""
                  width={20}
                  height={20}
                />
              </button>
            </div>
            <div
              className={`sales-cards__stat-badge${
                card.trendBadge ? " sales-cards__stat-badge--trend" : ""
              }`}
            >
              {card.trendBadge && (
                <ImageWithBasePath
                  src={salesCardsAssets.arrowUp}
                  alt=""
                  width={14}
                  height={14}
                  className="sales-cards__stat-badge-icon"
                />
              )}
              <span>{card.badge}</span>
            </div>
            <div className="sales-cards__stat-deco" aria-hidden="true">
              <ImageWithBasePath
                src={card.decoSrc}
                alt=""
                width={32}
                height={32}
                className="sales-cards__stat-deco-img"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
