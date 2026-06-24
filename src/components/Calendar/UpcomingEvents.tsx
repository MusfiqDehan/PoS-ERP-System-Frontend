"use client";

const events = [
  { title: "Meeting with Team Dev", date: "15 Mar 2025", color: "#6938EF" },
  { title: "Design System With Client", date: "24 Mar 2025", color: "#DD2590" },
  { title: "UI/UX Team Call", date: "28 Mar 2025", color: "#0ac79e" },
];

export default function UpcomingEvents() {
  return (
    <div className="border-b border-[#f1f1f1] pb-2 mb-4">
      <h5 className="mb-3 text-[15px] font-semibold text-[#212B36] flex items-center gap-2">
        Upcoming Event
        <span className="inline-flex items-center justify-center px-2 py-[1px] rounded-full bg-[#E7FBF7] text-[#0ac79e] text-[12px]">
          15
        </span>
      </h5>
      {events.map((e) => (
        <div key={e.title} className="border-l-[3px] pl-3 mb-3" style={{ borderColor: e.color }}>
          <h6 className="font-medium mb-1 text-[14px] text-[#212B36]">{e.title}</h6>
          <p className="m-0 text-[12px] text-[#646B72] flex items-center gap-2">
            <i className="ti ti-calendar-check text-[#3577f1]" /> {e.date}
          </p>
        </div>
      ))}
    </div>
  );
}
