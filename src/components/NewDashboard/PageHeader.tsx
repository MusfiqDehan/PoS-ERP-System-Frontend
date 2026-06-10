"use client";

import DashboardDateRange from "./DashboardDateRange";

export default function PageHeader() {
  return (
    <div className="dashboard-page-header">
      <div className="dashboard-page-header__welcome">
        <h1 className="dashboard-page-header__title">Welcome Admin</h1>
        <p className="dashboard-page-header__subtitle">
          You have <span className="dashboard-page-header__highlight">200+</span>{" "}
          Orders, Today
        </p>
      </div>
      <DashboardDateRange />
    </div>
  );
}
