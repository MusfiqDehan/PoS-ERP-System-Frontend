"use client";

import { DatePicker, TimePicker } from "antd";
import dayjs from "dayjs";
import Link from "next/link";

const inputCls =
  "w-full border border-[#e7e7e7] rounded-md px-3 py-2 text-[14px] text-[#212B36] focus:border-[#0ac79e] focus:outline-none focus:ring-1 focus:ring-[#0ac79e] transition-colors";
const labelCls = "block text-[13px] font-medium text-[#212B36] mb-1.5";

export default function AddEventModal() {
  return (
    <div className="modal fade" id="add_event">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="flex items-center justify-between p-4 border-b border-[#f1f1f1]">
            <h4 className="m-0 text-[18px] font-bold text-[#212B36]">Add New Event</h4>
            <button
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              className="w-7 h-7 inline-flex items-center justify-center rounded-md text-[#646B72] hover:bg-[#f6f6f6]"
            >
              <i className="ti ti-x" />
            </button>
          </div>
          <form>
            <div className="p-4 grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <label className={labelCls}>Event Name <span className="text-[#dc3545]">*</span></label>
                <input type="text" className={inputCls} />
              </div>
              <div className="col-span-12">
                <label className={labelCls}>Event Date <span className="text-[#dc3545]">*</span></label>
                <DatePicker className="w-full" placeholder="dd/mm/yyyy" />
              </div>
              <div className="col-span-6">
                <label className={labelCls}>Start Time <span className="text-[#dc3545]">*</span></label>
                <TimePicker className="w-full" defaultValue={dayjs("00:00:00", "HH:mm:ss")} />
              </div>
              <div className="col-span-6">
                <label className={labelCls}>End Time <span className="text-[#dc3545]">*</span></label>
                <TimePicker className="w-full" defaultValue={dayjs("00:00:00", "HH:mm:ss")} />
              </div>
              <div className="col-span-12">
                <label className={labelCls}>Event Location <span className="text-[#dc3545]">*</span></label>
                <input type="text" className={inputCls} />
              </div>
              <div className="col-span-12">
                <label className={labelCls}>Descriptions <span className="text-[#dc3545]">*</span></label>
                <textarea className={inputCls} rows={3} defaultValue="" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-4 border-t border-[#f1f1f1]">
              <button
                type="button"
                data-bs-dismiss="modal"
                className="px-4 py-2 rounded-[6px] border border-[#e7e7e7] text-[#646B72] text-[14px] font-medium hover:bg-[#f6f6f6] transition-colors"
              >
                Cancel
              </button>
              <Link
                href="#"
                data-bs-dismiss="modal"
                className="px-4 py-2 rounded-[6px] bg-[#0ac79e] text-white text-[14px] font-medium hover:bg-[#089b7c] transition-colors"
              >
                Add Event
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
