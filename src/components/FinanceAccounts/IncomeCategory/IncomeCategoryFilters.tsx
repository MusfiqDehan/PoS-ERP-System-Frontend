"use client";

export default function IncomeCategoryFilters() {
  return (
    <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
      <div className="search-set"></div>
      <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
        <div className="dropdown me-2">
          <a
            href="#"
            className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
            data-bs-toggle="dropdown"
          >
            Category
          </a>
          <ul className="dropdown-menu  dropdown-menu-end p-3">
            <li>
              <a href="#" className="dropdown-item rounded-1">
                Foreign investment
              </a>
            </li>
            <li>
              <a href="#" className="dropdown-item rounded-1">
                Product Export
              </a>
            </li>
          </ul>
        </div>
        <div className="dropdown me-2">
          <a
            href="#"
            className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
            data-bs-toggle="dropdown"
          >
            Status
          </a>
          <ul className="dropdown-menu  dropdown-menu-end p-3">
            <li>
              <a href="#" className="dropdown-item rounded-1">
                Active
              </a>
            </li>
            <li>
              <a href="#" className="dropdown-item rounded-1">
                Inactive
              </a>
            </li>
          </ul>
        </div>
        <div className="dropdown">
          <a
            href="#"
            className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
            data-bs-toggle="dropdown"
          >
            Sort By : Last 7 Days
          </a>
          <ul className="dropdown-menu  dropdown-menu-end p-3">
            <li>
              <a href="#" className="dropdown-item rounded-1">
                Recently Added
              </a>
            </li>
            <li>
              <a href="#" className="dropdown-item rounded-1">
                Ascending
              </a>
            </li>
            <li>
              <a href="#" className="dropdown-item rounded-1">
                Desending
              </a>
            </li>
            <li>
              <a href="#" className="dropdown-item rounded-1">
                Last Month
              </a>
            </li>
            <li>
              <a href="#" className="dropdown-item rounded-1">
                Last 7 Days
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
