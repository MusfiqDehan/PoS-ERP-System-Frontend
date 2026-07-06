"use client";

import SearchBar from "./SearchBar";

type Props = {
  searchText: string;
  onSearchChange: (value: string) => void;
  onInviteCompany: () => void;
};

export default function PageHeader({
  searchText,
  onSearchChange,
  onInviteCompany,
}: Props) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4 mb-[1.5rem]">
      <SearchBar value={searchText} onChange={onSearchChange} />

      <div className="flex items-center flex-wrap gap-2">
        <button
          type="button"
          onClick={onInviteCompany}
          className="inline-flex items-center gap-1.5 px-4 py-[9px] rounded-[10px] bg-[#0ac79e] text-white text-[13px] font-semibold hover:bg-[#089b7c] transition-colors shadow-sm shadow-[#0ac79e]/20"
        >
          <i className="ti ti-circle-plus text-[16px]" /> Invite Company
        </button>
      </div>
    </div>
  );
}
