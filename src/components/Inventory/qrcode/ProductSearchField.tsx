"use client";

const results = ["Amazon Echo Dot", "Armani Belt", "Apple Watch", "Apple Iphone 14 Pro"];

export default function ProductSearchField() {
  return (
    <div className="lg:max-w-[50%] mt-4">
      <label className="block text-[13px] font-medium text-[#212B36] mb-1.5">
        Product <span className="text-[#dc3545]">*</span>
      </label>
      <div className="relative">
        <input
          type="text"
          id="dropdownsearchClickable"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          className="w-full border border-[#e7e7e7] rounded-md pl-3 pr-9 py-2 text-[14px] text-[#212B36] focus:border-[#0ac79e] focus:outline-none focus:ring-1 focus:ring-[#0ac79e] transition-colors"
          placeholder="Search Product by Code"
        />
        <i className="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[13px]" />
        <div
          className="dropdown-menu search-dropdown w-100 rounded-1 mt-2 p-2"
          aria-labelledby="dropdownsearchClickable"
        >
          <ul>
            {results.map((r) => (
              <li
                key={r}
                className="px-2 py-1.5 text-[14px] text-[#212B36] hover:bg-[#f6f6f6] rounded cursor-pointer"
              >
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
