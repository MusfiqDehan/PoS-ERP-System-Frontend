"use client";

export default function ProductSearchField() {
  return (
    <div className="row">
      <div className="col-lg-6">
        <div className="search-form  seacrh-barcode-item">
          <div className="searchInput">
            <label className="form-label">
              Product<span className="text-danger ms-1">*</span>
            </label>
            <input
              type="text"
              id="dropdownsearchClickable"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              className="form-control"
              placeholder="Search Product by Code"
            />
            <div className="resultBox"></div>
            <div className="icon">
              <i className="fas fa-search" />
            </div>
            <div
              className="dropdown-menu search-dropdown w-100 h-auto rounded-1 mt-2"
              aria-labelledby="dropdownsearchClickable"
            >
              <ul>
                <li className="fs-14 text-gray-9 mb-2">Amazon Echo Dot</li>
                <li className="fs-14 text-gray-9 mb-2">Armani Belt</li>
                <li className="fs-14 text-gray-9 mb-2">Apple Watch</li>
                <li className="fs-14 text-gray-9">Apple Iphone 14 Pro</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
