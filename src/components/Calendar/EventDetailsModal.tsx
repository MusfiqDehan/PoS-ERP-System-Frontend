"use client";

export default function EventDetailsModal() {
  return (
    <div className="modal fade" id="event_modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="flex items-center justify-between p-4 border-b border-[#f1f1f1]">
            <h4 className="m-0 text-[18px] font-bold text-[#212B36]">
              <span id="eventTitle" />
            </h4>
            <button
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              className="w-7 h-7 inline-flex items-center justify-center rounded-md text-[#646B72] hover:bg-[#f6f6f6]"
            >
              <i className="ti ti-x" />
            </button>
          </div>
          <div className="p-4 flex flex-col gap-3">
            <p className="flex items-center gap-2 text-[14px] font-medium text-[#212B36] m-0">
              <i className="ti ti-calendar-check text-[#0ac79e]" /> 26 Jul,2024 to 31 Jul,2024
            </p>
            <p className="flex items-center gap-2 text-[14px] font-medium text-[#212B36] m-0">
              <i className="ti ti-clock text-[#0ac79e]" /> 11:00 AM to 12:15 PM
            </p>
            <p className="flex items-center gap-2 text-[14px] font-medium text-[#212B36] m-0">
              <i className="ti ti-map-pin-bolt text-[#0ac79e]" /> Las Vegas, US
            </p>
            <p className="flex items-start gap-2 text-[14px] font-medium text-[#212B36] m-0">
              <i className="ti ti-calendar-check text-[#0ac79e] mt-1" />
              A recurring or repeating event is simply any event that you will occur more than once on your calendar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
