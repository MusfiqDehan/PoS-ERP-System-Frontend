"use client";
import Link from "next/link";
import { useState } from "react";

export default function PageHeader() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleCollapse = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const nextState = !isCollapsed;
    setIsCollapsed(nextState);

    if (nextState) {
      document.body.classList.add("header-collapse");
      return;
    }

    document.body.classList.remove("header-collapse");
  };

  return (
    <div className="sales-dashboard-header">
      <div className="sales-dashboard-header__intro">
        <h2 className="sales-dashboard-header__title">Hi ! Rifatul Islam,</h2>
        <p className="sales-dashboard-header__subtitle">
          Here&apos;s your store overview for today.
        </p>
      </div>

      <div className="sales-dashboard-header__actions">
        <button type="button" className="sales-dashboard-header__date-range">
          <i className="ti ti-calendar" aria-hidden="true" />
          <span>01 June 2026 - 07 June 2026</span>
        </button>

        <Link href="#" className="sales-dashboard-header__icon-btn" aria-label="Refresh">
          <i className="ti ti-refresh" aria-hidden="true" />
        </Link>

        <Link
          href="#"
          id="collapse-header"
          className={`sales-dashboard-header__icon-btn ${isCollapsed ? "active" : ""}`}
          onClick={handleToggleCollapse}
          aria-label="Collapse"
        >
          <i className={`ti ${isCollapsed ? "ti-chevron-up" : "ti-chevron-down"}`} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
