"use client";

export default function StockTabsToolbar() {
  return (
    <div className="flex flex-wrap justify-between items-center gap-3 mb-3">
      <ul
        className="nav nav-pills inline-flex items-center gap-1 p-1 rounded-md bg-[#f6f7f9] border border-[#f1f1f1]"
        id="pills-tab"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active px-4 py-1.5 rounded text-[13px] font-medium"
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
            className="nav-link px-4 py-1.5 rounded text-[13px] font-medium text-[#646B72]"
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
      <div className="flex items-center gap-2 bg-white border border-[#e7e7e7] rounded px-3 py-1.5 text-[#646B72] text-[14px]">
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" defaultChecked className="sr-only peer" />
          <span className="relative block w-9 h-5 bg-[#e7e7e7] rounded-full transition-colors peer-checked:bg-[#0ac79e] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-4" />
        </label>
        Notify
      </div>
    </div>
  );
}
