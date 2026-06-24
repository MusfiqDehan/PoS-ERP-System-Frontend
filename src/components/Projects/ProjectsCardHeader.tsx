"use client";
/* eslint-disable @next/next/no-img-element */

const avatars = [
  "assets/img/profiles/avatar-19.jpg",
  "assets/img/profiles/avatar-29.jpg",
  "assets/img/profiles/avatar-16.jpg",
];

export default function ProjectsCardHeader() {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3 p-4 border-b border-[#f1f1f1]">
      <h4 className="m-0 text-[18px] font-semibold text-[#212B36]">Projects</h4>
      <div className="flex items-center flex-wrap gap-4">
        <div className="flex items-center">
          {avatars.map((src, i) => (
            <span
              key={src}
              className={`w-8 h-8 rounded-full overflow-hidden border-2 border-white ${i > 0 ? "-ml-2" : ""}`}
            >
              <img src={src} className="w-full h-full object-cover" alt="img" />
            </span>
          ))}
          <span className="w-8 h-8 -ml-2 rounded-full border-2 border-white bg-[#0ac79e] text-white text-[12px] inline-flex items-center justify-center">
            1+
          </span>
        </div>
        <div className="flex items-center gap-3 text-[14px] text-[#646B72]">
          <span>Total Task : <span className="text-[#212B36] font-medium">55</span></span>
          <span className="border-l border-[#e7e7e7] pl-3">Pending : <span className="text-[#212B36] font-medium">15</span></span>
          <span className="border-l border-[#e7e7e7] pl-3">Completed : <span className="text-[#212B36] font-medium">40</span></span>
        </div>
        <div className="relative">
          <i className="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-[#646B72]" />
          <input
            type="text"
            placeholder="Search Project"
            className="border border-[#e7e7e7] rounded-md pl-9 pr-3 py-2 text-[14px] focus:border-[#0ac79e] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
