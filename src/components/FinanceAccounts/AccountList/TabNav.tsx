"use client";

export default function TabNav() {
  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
      <ul
        className="nav nav-pills low-stock-tab d-flex me-2 mb-0"
        id="pills-tab"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-home"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            Accounts List
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-profile"
            type="button"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
          >
            Account Type
          </button>
        </li>
      </ul>
    </div>
  );
}
