"use client";

import Link from "next/link";

const events = [
  { title: "Team Events", cls: "bg-transparent-success", dot: "text-success" },
  { title: "Work", cls: "bg-transparent-warning", dot: "text-warning" },
  { title: "External", cls: "bg-transparent-danger", dot: "text-danger" },
  { title: "Projects", cls: "bg-transparent-skyblue", dot: "text-skyblue" },
  { title: "Applications", cls: "bg-transparent-purple", dot: "text-purple" },
  { title: "Desgin", cls: "bg-transparent-info", dot: "text-info" },
];

export default function DraggableEvents() {
  return (
    <div className="border-b border-[#f1f1f1] pb-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <h5 className="m-0 text-[15px] font-semibold text-[#212B36]">Event</h5>
        <Link
          href="#"
          className="text-[#0ac79e]"
          data-bs-toggle="modal"
          data-inert={true}
          data-bs-target="#add_event"
        >
          <i className="ti ti-square-rounded-plus-filled text-[16px]" />
        </Link>
      </div>
      <p className="text-[12px] text-[#646B72] mb-2">
        Drag and drop your event or click in the calendar
      </p>
      {/* id + fc-event + data-event kept for FullCalendar external-drag */}
      <div id="external-events" className="flex flex-col gap-1">
        {events.map((e) => (
          <div
            key={e.title}
            className={`fc-event ${e.cls} flex items-center px-2 py-1.5 rounded-md text-[13px] cursor-grab`}
            data-event={`{ "title": "${e.title}" }`}
            data-event-classname={e.cls}
          >
            <i className={`ti ti-square-rounded ${e.dot} me-2`} /> {e.title}
          </div>
        ))}
      </div>
    </div>
  );
}
