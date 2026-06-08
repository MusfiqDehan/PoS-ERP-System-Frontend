"use client";

export default function StockTabsToolbar() {
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
                    Low Stocks
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
                    Out of Stocks
                  </button>
                </li>
              </ul>
              <div className="notify d-flex bg-white p-1 px-2 border rounded">
                <div className="status-toggle text-secondary d-flex justify-content-between align-items-center">
                  <input
                    type="checkbox"
                    id="user2"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="user2" className="checktoggle me-2">
                    checkbox
                  </label>
                  Notify
                </div>
              </div>
            </div>
  );
}
